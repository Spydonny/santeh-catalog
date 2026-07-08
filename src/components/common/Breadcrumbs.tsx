import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Хлебные крошки" className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-sm text-slate-500">
      <Link to="/" className="flex items-center gap-1 hover:text-accent-600">
        <Home size={14} />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={index} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="text-slate-300" />
            {item.href && !isLast ? (
              <Link to={item.href} className="hover:text-accent-600">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium text-slate-700' : ''}>{item.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
