import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import SearchBar from '@/components/catalog/SearchBar'
import CategoryTabs from '@/components/catalog/CategoryTabs'
import SortSelect from '@/components/catalog/SortSelect'
import SidebarFilters from '@/components/catalog/SidebarFilters'
import ProductGrid from '@/components/catalog/ProductGrid'
import Pagination from '@/components/common/Pagination'
import Modal from '@/components/common/Modal'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import { useProducts } from '@/hooks/useProducts'
import { useDebounce } from '@/hooks/useDebounce'
import { products } from '@/data/products'
import { getPriceBounds } from '@/utils/filter'
import { getCategoryBySlug } from '@/data/categories'
import type { SortValue } from '@/types'

const priceBounds = getPriceBounds(products)

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const query = searchParams.get('q') ?? ''
  const category = searchParams.get('category')
  const brandsParam = searchParams.get('brands')
  const selectedBrands = useMemo(() => (brandsParam ? brandsParam.split(',').filter(Boolean) : []), [brandsParam])
  const minPrice = searchParams.get('min') ? Number(searchParams.get('min')) : undefined
  const maxPrice = searchParams.get('max') ? Number(searchParams.get('max')) : undefined
  const inStockOnly = searchParams.get('inStock') === '1'
  const sort = (searchParams.get('sort') as SortValue) || 'popular'
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const debouncedQuery = useDebounce(query, 200)

  const updateParams = (updates: Record<string, string | null>, resetPage = true) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        next.delete(key)
      } else {
        next.set(key, value)
      }
    })
    if (resetPage) next.delete('page')
    setSearchParams(next)
  }

  const { items, total, totalPages, loading } = useProducts({
    query: debouncedQuery,
    category: category ?? undefined,
    brands: selectedBrands,
    minPrice,
    maxPrice,
    inStockOnly,
    sort,
    page,
  })

  const handleReset = () => setSearchParams({})

  const activeCategory = category ? getCategoryBySlug(category) : undefined

  const filtersProps = {
    category,
    onCategoryChange: (slug: string | null) => updateParams({ category: slug }),
    selectedBrands,
    onBrandsChange: (brandsList: string[]) => updateParams({ brands: brandsList.length ? brandsList.join(',') : null }),
    minPrice,
    maxPrice,
    onPriceChange: (min: number | undefined, max: number | undefined) =>
      updateParams({ min: min ? String(min) : null, max: max ? String(max) : null }),
    inStockOnly,
    onInStockChange: (value: boolean) => updateParams({ inStock: value ? '1' : null }),
    priceBounds,
    onReset: handleReset,
  }

  return (
    <div className="container-page py-8">
      <Breadcrumbs items={[{ label: 'Каталог' }]} />

      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">{activeCategory ? activeCategory.name : 'Каталог товаров'}</h1>
        <p className="mt-1 text-sm text-neutral-500">
          {activeCategory ? activeCategory.description : 'Полный список трубопроводной арматуры и фитингов'}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3">
        <div className="flex gap-3">
          <SearchBar value={query} onChange={(value) => updateParams({ q: value || null })} className="flex-1" />
          <button
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-600 hover:border-accent-400 hover:text-accent-700 lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Фильтры
          </button>
          <div className="hidden sm:block">
            <SortSelect value={sort} onChange={(value) => updateParams({ sort: value }, false)} />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 sm:hidden">
          <SortSelect value={sort} onChange={(value) => updateParams({ sort: value }, false)} />
        </div>
        <CategoryTabs value={category} onChange={(slug) => updateParams({ category: slug })} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <div className="hidden lg:block">
          <SidebarFilters {...filtersProps} />
        </div>

        <div>
          <div className="mb-4 text-sm text-neutral-500">Найдено товаров: {total}</div>
          <ProductGrid products={items} loading={loading} onResetFilters={handleReset} />
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination page={page} totalPages={totalPages} onChange={(nextPage) => updateParams({ page: String(nextPage) }, false)} />
            </div>
          )}
        </div>
      </div>

      <Modal open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Фильтры">
        <SidebarFilters {...filtersProps} />
      </Modal>
    </div>
  )
}
