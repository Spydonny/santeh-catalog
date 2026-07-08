import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { COMPANY, WHATSAPP_PHONE } from '@/constants'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/favorites', label: 'Избранное' },
  { to: '/cart', label: 'Корзина' },
  { to: '/admin', label: 'Админ-панель' },
]

export default function MobileMenu() {
  const open = useUIStore((state) => state.mobileMenuOpen)
  const closeMobileMenu = useUIStore((state) => state.closeMobileMenu)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            className="absolute inset-0 bg-slate-900/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          />
          <motion.div
            className="absolute right-0 top-0 flex h-full w-72 flex-col bg-white p-5 shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-bold text-slate-900">{COMPANY.name}</span>
              <button
                onClick={closeMobileMenu}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
                aria-label="Закрыть меню"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors',
                      isActive ? 'bg-accent-50 text-accent-700' : 'text-slate-600 hover:bg-slate-100',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto border-t border-slate-100 pt-4 text-xs text-slate-400">
              <p>{COMPANY.address}</p>
              <p className="mt-1">{COMPANY.workHours}</p>
              <p className="mt-1">WhatsApp: +{WHATSAPP_PHONE}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
