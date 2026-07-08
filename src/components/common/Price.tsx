import { formatPrice } from '@/utils/format'
import { cn } from '@/utils/cn'

interface PriceProps {
  price: number
  oldPrice?: number | null
  unit?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
}

export default function Price({ price, oldPrice, unit, size = 'md', className }: PriceProps) {
  return (
    <div className={cn('flex flex-wrap items-baseline gap-2', className)}>
      <span className={cn('font-bold text-neutral-900', sizeClasses[size])}>
        {formatPrice(price)}
        {unit ? <span className="ml-1 text-sm font-normal text-neutral-400">/ {unit}</span> : null}
      </span>
      {oldPrice ? <span className="text-sm text-neutral-400 line-through">{formatPrice(oldPrice)}</span> : null}
    </div>
  )
}
