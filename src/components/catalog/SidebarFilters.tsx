import type { ReactNode } from 'react'
import { categories } from '@/data/categories'
import { brands } from '@/data/brands'
import { cn } from '@/utils/cn'
import Button from '@/components/common/Button'

interface SidebarFiltersProps {
  category: string | null
  onCategoryChange: (slug: string | null) => void
  selectedBrands: string[]
  onBrandsChange: (brands: string[]) => void
  minPrice: number | undefined
  maxPrice: number | undefined
  onPriceChange: (min: number | undefined, max: number | undefined) => void
  inStockOnly: boolean
  onInStockChange: (value: boolean) => void
  priceBounds: { min: number; max: number }
  onReset: () => void
}

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-b border-neutral-100 py-5 first:pt-0 last:border-b-0">
      <h3 className="mb-3 text-sm font-semibold text-neutral-900">{title}</h3>
      {children}
    </div>
  )
}

export default function SidebarFilters({
  category,
  onCategoryChange,
  selectedBrands,
  onBrandsChange,
  minPrice,
  maxPrice,
  onPriceChange,
  inStockOnly,
  onInStockChange,
  priceBounds,
  onReset,
}: SidebarFiltersProps) {
  const toggleBrand = (name: string) => {
    onBrandsChange(
      selectedBrands.includes(name) ? selectedBrands.filter((b) => b !== name) : [...selectedBrands, name],
    )
  }

  return (
    <aside className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-semibold text-neutral-900">Фильтры</h2>
        <button onClick={onReset} className="text-xs font-medium text-accent-600 hover:underline">
          Сбросить
        </button>
      </div>

      <FilterSection title="Категория">
        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-600">
            <input
              type="radio"
              name="category"
              checked={category === null}
              onChange={() => onCategoryChange(null)}
              className="h-3.5 w-3.5 accent-accent-600"
            />
            Все категории
          </label>
          {categories.map((item) => (
            <label key={item.id} className="flex cursor-pointer items-center gap-2 text-sm text-neutral-600">
              <input
                type="radio"
                name="category"
                checked={category === item.slug}
                onChange={() => onCategoryChange(item.slug)}
                className="h-3.5 w-3.5 accent-accent-600"
              />
              {item.name}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Бренд">
        <div className="flex flex-col gap-2">
          {brands.map((brand) => (
            <label key={brand.id} className="flex cursor-pointer items-center gap-2 text-sm text-neutral-600">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => toggleBrand(brand.name)}
                className={cn('h-3.5 w-3.5 rounded accent-accent-600')}
              />
              {brand.name}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Цена, ₸">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder={String(priceBounds.min)}
            value={minPrice ?? ''}
            onChange={(event) => onPriceChange(event.target.value ? Number(event.target.value) : undefined, maxPrice)}
            className="w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 text-sm focus:border-accent-400 focus:outline-none"
          />
          <span className="text-neutral-300">—</span>
          <input
            type="number"
            placeholder={String(priceBounds.max)}
            value={maxPrice ?? ''}
            onChange={(event) => onPriceChange(minPrice, event.target.value ? Number(event.target.value) : undefined)}
            className="w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 text-sm focus:border-accent-400 focus:outline-none"
          />
        </div>
      </FilterSection>

      <FilterSection title="Наличие">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-600">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => onInStockChange(event.target.checked)}
            className="h-3.5 w-3.5 rounded accent-accent-600"
          />
          Только в наличии
        </label>
      </FilterSection>

      <Button variant="outline" fullWidth onClick={onReset} className="mt-2">
        Сбросить все фильтры
      </Button>
    </aside>
  )
}
