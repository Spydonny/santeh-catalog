import { ArrowUpDown } from 'lucide-react'
import { SORT_OPTIONS } from '@/constants'
import type { SortValue } from '@/types'

interface SortSelectProps {
  value: SortValue
  onChange: (value: SortValue) => void
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative inline-flex items-center">
      <ArrowUpDown size={15} className="pointer-events-none absolute left-3 text-neutral-400" />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortValue)}
        className="appearance-none rounded-xl border border-neutral-200 bg-white py-2.5 pl-9 pr-8 text-sm font-medium text-neutral-700 focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-100"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
