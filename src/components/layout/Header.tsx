import { Link, NavLink } from 'react-router-dom'
import { Heart, Menu, ShoppingCart, Wrench } from 'lucide-react'
import { COMPANY } from '@/constants'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import { useCartStore, selectCartTotalCount } from '@/store/useCartStore'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/admin', label: 'Админ-панель' },
]

export default function Header() {
  const favoritesCount = useFavoritesStore((state) => state.ids.length)
  const cartCount = useCartStore(selectCartTotalCount)
  const openCartDrawer = useUIStore((state) => state.openCartDrawer)
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2 font-bold text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-600 text-white">
            <Wrench size={18} />
          </span>
          <span className="hidden sm:inline">{COMPANY.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-accent-50 text-accent-700' : 'text-slate-600 hover:bg-slate-100',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            to="/favorites"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-accent-600"
            aria-label="Избранное"
          >
            <Heart size={19} />
            {favoritesCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent-600 px-1 text-[10px] font-bold text-white">
                {favoritesCount}
              </span>
            )}
          </Link>

          <button
            onClick={openCartDrawer}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-accent-600"
            aria-label="Корзина"
          >
            <ShoppingCart size={19} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent-600 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 md:hidden"
            aria-label="Меню"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
