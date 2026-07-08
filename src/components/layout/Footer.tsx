import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Wrench } from 'lucide-react'
import { COMPANY, WHATSAPP_PHONE } from '@/constants'
import { categories } from '@/data/categories'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-600 text-white">
              <Wrench size={18} />
            </span>
            {COMPANY.name}
          </div>
          <p className="mt-3 text-sm text-slate-500">{COMPANY.tagline}</p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Категории</h4>
          <ul className="flex flex-col gap-2 text-sm text-slate-500">
            {categories.slice(0, 6).map((category) => (
              <li key={category.id}>
                <Link to={`/catalog?category=${category.slug}`} className="hover:text-accent-600">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Навигация</h4>
          <ul className="flex flex-col gap-2 text-sm text-slate-500">
            <li>
              <Link to="/catalog" className="hover:text-accent-600">
                Каталог товаров
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-accent-600">
                Корзина
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-accent-600">
                Избранное
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-accent-600">
                Админ-панель
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Контакты</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-500">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
              {COMPANY.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-slate-400" />+{WHATSAPP_PHONE}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-slate-400" />
              {COMPANY.email}
            </li>
            <li className="text-xs text-slate-400">{COMPANY.workHours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {COMPANY.name}. Демонстрационный прототип интернет-каталога.
      </div>
    </footer>
  )
}
