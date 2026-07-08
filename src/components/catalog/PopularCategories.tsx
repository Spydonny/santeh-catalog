import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { LayoutGrid } from 'lucide-react'
import { categories } from '@/data/categories'
import { getProductsByCategory } from '@/data/products'

function resolveIcon(name: string): LucideIcon {
  const icons = Icons as unknown as Record<string, LucideIcon>
  return icons[name] ?? LayoutGrid
}

export default function PopularCategories() {
  const popular = categories.filter((category) => category.popular)

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {popular.map((category) => {
        const Icon = resolveIcon(category.icon)
        const count = getProductsByCategory(category.slug).length
        return (
          <Link
            key={category.id}
            to={`/catalog?category=${category.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-card-hover"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent-600 group-hover:text-white">
              <Icon size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">{category.name}</h3>
              <p className="mt-0.5 text-xs text-neutral-400">{count} товаров</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
