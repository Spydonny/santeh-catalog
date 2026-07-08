import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, XCircle } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import type { ToastMessage, ToastVariant } from '@/types'

const ICONS: Record<ToastVariant, typeof CheckCircle2> = {
  success: CheckCircle2,
  info: Info,
  error: XCircle,
}

const COLORS: Record<ToastVariant, string> = {
  success: 'bg-neutral-900',
  info: 'bg-neutral-900',
  error: 'bg-neutral-900',
}

function ToastItem({ toast }: { toast: ToastMessage }) {
  const dismissToast = useUIStore((state) => state.dismissToast)

  useEffect(() => {
    const timer = setTimeout(() => dismissToast(toast.id), 3200)
    return () => clearTimeout(timer)
  }, [toast.id, dismissToast])

  const Icon = ICONS[toast.variant]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${COLORS[toast.variant]}`}
    >
      <Icon size={18} />
      {toast.text}
    </motion.div>
  )
}

export default function ToastContainer() {
  const toasts = useUIStore((state) => state.toasts)

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col gap-2 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
