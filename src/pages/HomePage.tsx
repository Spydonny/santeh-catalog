import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Truck, Wrench } from 'lucide-react'
import SearchBar from '@/components/catalog/SearchBar'
import PopularCategories from '@/components/catalog/PopularCategories'
import CategoryTabs from '@/components/catalog/CategoryTabs'
import SortSelect from '@/components/catalog/SortSelect'
import ProductGrid from '@/components/catalog/ProductGrid'
import { useProducts } from '@/hooks/useProducts'
import type { SortValue } from '@/types'

export default function HomePage() {
  const navigate = useNavigate()
  const [heroQuery, setHeroQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [sort, setSort] = useState<SortValue>('popular')

  const { items, loading } = useProducts({ category: category ?? undefined, sort, page: 1, pageSize: 8 })

  const handleHeroSearch = (event: FormEvent) => {
    event.preventDefault()
    navigate(heroQuery ? `/catalog?q=${encodeURIComponent(heroQuery)}` : '/catalog')
  }

  return (
    <div className="flex flex-col">
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container-page flex flex-col items-start gap-6 py-16 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
            <Wrench size={13} />
            Оптовые поставки трубопроводной арматуры
          </span>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Трубы, фитинги и запорная арматура — для профессионалов и частных клиентов
          </h1>
          <p className="max-w-xl text-slate-300">
            Более 40 позиций в наличии: отводы, тройники, краны шаровые, задвижки, фланцы и другие товары
            для инженерных систем.
          </p>
          <form onSubmit={handleHeroSearch} className="w-full max-w-xl">
            <SearchBar value={heroQuery} onChange={setHeroQuery} placeholder="Например: кран шаровой DN25" />
          </form>
          <div className="flex flex-wrap gap-6 pt-2 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <Truck size={16} /> Доставка по всей стране
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} /> Сертифицированная продукция
            </span>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Популярные категории</h2>
          <Link to="/catalog" className="flex items-center gap-1 text-sm font-medium text-accent-600 hover:underline">
            Весь каталог <ArrowRight size={15} />
          </Link>
        </div>
        <PopularCategories />
      </section>

      <section className="container-page pb-16">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-slate-900">Товары каталога</h2>
          <SortSelect value={sort} onChange={setSort} />
        </div>
        <div className="mb-5">
          <CategoryTabs value={category} onChange={setCategory} />
        </div>
        <ProductGrid products={items} loading={loading} skeletonCount={8} onResetFilters={() => setCategory(null)} />
        <div className="mt-8 flex justify-center">
          <Link
            to="/catalog"
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:border-accent-400 hover:text-accent-700"
          >
            Смотреть весь каталог
          </Link>
        </div>
      </section>
    </div>
  )
}
