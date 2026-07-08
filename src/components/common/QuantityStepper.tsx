import { Minus, Plus } from 'lucide-react'

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export default function QuantityStepper({ value, onChange, min = 1, max = 999 }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center rounded-xl border border-neutral-200 bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-9 w-9 items-center justify-center text-neutral-500 hover:text-accent-600 disabled:opacity-30"
        aria-label="Уменьшить количество"
      >
        <Minus size={15} />
      </button>
      <span className="w-9 text-center text-sm font-semibold text-neutral-900">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-9 w-9 items-center justify-center text-neutral-500 hover:text-accent-600 disabled:opacity-30"
        aria-label="Увеличить количество"
      >
        <Plus size={15} />
      </button>
    </div>
  )
}
