import type { Availability as AvailabilityType } from '@/types'
import { AVAILABILITY_LABELS } from '@/constants'
import { cn } from '@/utils/cn'

interface AvailabilityProps {
  status: AvailabilityType
  className?: string
}

const dotClasses: Record<AvailabilityType, string> = {
  in_stock: 'bg-neutral-900',
  on_order: 'border border-neutral-400 bg-transparent',
  out_of_stock: 'bg-neutral-300',
}

const textClasses: Record<AvailabilityType, string> = {
  in_stock: 'text-neutral-600',
  on_order: 'text-neutral-500',
  out_of_stock: 'text-neutral-400',
}

export default function Availability({ status, className }: AvailabilityProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium', textClasses[status], className)}>
      <span className={cn('h-2 w-2 rounded-full', dotClasses[status])} />
      {AVAILABILITY_LABELS[status]}
    </span>
  )
}
