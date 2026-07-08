import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export type BadgeVariant = 'accent' | 'success' | 'warning' | 'danger' | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  accent: 'bg-neutral-900 text-white',
  success: 'bg-neutral-100 text-neutral-700',
  warning: 'bg-neutral-100 text-neutral-700',
  danger: 'bg-white text-neutral-900 border border-neutral-900',
  neutral: 'bg-neutral-100 text-neutral-600',
}

export default function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
