import { Star } from 'lucide-react'
import { cn } from '@/utils/cn'
import { pluralizeReviews } from '@/utils/format'

interface RatingProps {
  value: number
  reviewsCount?: number
  size?: number
  showValue?: boolean
  className?: string
}

export default function Rating({ value, reviewsCount, size = 16, showValue = true, className }: RatingProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, index) => {
          const filled = index + 1 <= Math.round(value)
          return (
            <Star
              key={index}
              size={size}
              className={filled ? 'fill-neutral-900 text-neutral-900' : 'fill-neutral-200 text-neutral-200'}
            />
          )
        })}
      </div>
      {showValue && <span className="text-sm font-medium text-neutral-700">{value.toFixed(1)}</span>}
      {typeof reviewsCount === 'number' && (
        <span className="text-sm text-neutral-400">
          {reviewsCount} {pluralizeReviews(reviewsCount)}
        </span>
      )}
    </div>
  )
}
