import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBar({ value, onChange, placeholder = 'Поиск по каталогу...', className }: SearchBarProps) {
  return (
    <div className={cn('relative', className)}>
      <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-100"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
          aria-label="Очистить поиск"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
