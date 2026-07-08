import { Plus } from 'lucide-react'
import SearchBar from '@/components/catalog/SearchBar'
import Button from '@/components/common/Button'

interface AdminToolbarProps {
  query: string
  onQueryChange: (value: string) => void
  onAdd: () => void
  total: number
}

export default function AdminToolbar({ query, onQueryChange, onAdd, total }: AdminToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Управление товарами</h1>
        <p className="text-sm text-slate-500">Всего товаров: {total}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <SearchBar value={query} onChange={onQueryChange} placeholder="Поиск товара..." className="sm:w-64" />
        <Button icon={<Plus size={16} />} onClick={onAdd}>
          Добавить товар
        </Button>
      </div>
    </div>
  )
}
