import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { LayoutGrid } from 'lucide-react'
import { categories } from '@/data/categories'
import { cn } from '@/utils/cn'

interface CategoryTabsProps {
  value: string | null
  onChange: (categorySlug: string | null) => void
}

function resolveIcon(name: string): LucideIcon {
  const icons = Icons as unknown as Record<string, LucideIcon>
  return icons[name] ?? LayoutGrid
}

export default function CategoryTabs({ value, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      <button
        onClick={() => onChange(null)}
        className={cn(
          'flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors',
          value === null
            ? 'border-accent-600 bg-accent-600 text-white'
            : 'border-slate-200 bg-white text-slate-600 hover:border-accent-300 hover:text-accent-700',
        )}
      >
        <LayoutGrid size={16} />
        Все категории
      </button>
      {categories.map((category) => {
        const Icon = resolveIcon(category.icon)
        const active = value === category.slug
        return (
          <button
            key={category.id}
            onClick={() => onChange(category.slug)}
            className={cn(
              'flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'border-accent-600 bg-accent-600 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-accent-300 hover:text-accent-700',
            )}
          >
            <Icon size={16} />
            {category.name}
          </button>
        )
      })}
    </div>
  )
}
