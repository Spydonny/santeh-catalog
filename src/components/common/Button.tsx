import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  icon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-neutral-900 text-white hover:bg-neutral-700 active:bg-black',
  secondary: 'bg-white text-neutral-900 border border-neutral-900 hover:bg-neutral-900 hover:text-white',
  outline: 'border border-neutral-200 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 bg-white',
  ghost: 'text-neutral-600 hover:bg-neutral-100',
  danger: 'bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-900',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5 gap-1.5 rounded-lg',
  md: 'text-sm px-4 py-2.5 gap-2 rounded-lg',
  lg: 'text-base px-6 py-3 gap-2 rounded-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  icon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
