import { Pencil, Trash2 } from 'lucide-react'
import type { Product } from '@/types'
import { AVAILABILITY_LABELS } from '@/constants'
import { formatPrice } from '@/utils/format'
import { cn } from '@/utils/cn'
import EmptyState from '@/components/common/EmptyState'

interface AdminTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export default function AdminTable({ products, onEdit, onDelete }: AdminTableProps) {
  if (products.length === 0) {
    return <EmptyState title="Товары не найдены" description="Измените поисковый запрос" />
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Фото</th>
            <th className="px-4 py-3 font-medium">Название</th>
            <th className="px-4 py-3 font-medium">Категория</th>
            <th className="px-4 py-3 font-medium">Цена</th>
            <th className="px-4 py-3 font-medium">Наличие</th>
            <th className="px-4 py-3 font-medium text-right">Действия</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <img src={product.images[0]} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
              </td>
              <td className="max-w-xs px-4 py-3 font-medium text-slate-900">{product.name}</td>
              <td className="px-4 py-3 text-slate-500">{product.category}</td>
              <td className="px-4 py-3 font-semibold text-slate-900">{formatPrice(product.price)}</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    'inline-flex rounded-md px-2 py-0.5 text-xs font-medium',
                    product.availability === 'in_stock' && 'bg-emerald-100 text-emerald-700',
                    product.availability === 'on_order' && 'bg-amber-100 text-amber-700',
                    product.availability === 'out_of_stock' && 'bg-red-100 text-red-600',
                  )}
                >
                  {AVAILABILITY_LABELS[product.availability]}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => onEdit(product)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-accent-50 hover:text-accent-600"
                    aria-label="Редактировать"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-500"
                    aria-label="Удалить"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
