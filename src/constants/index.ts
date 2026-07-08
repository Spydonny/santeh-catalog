import type { SortOption } from '@/types'

export const COMPANY = {
  name: 'СантехМаркет',
  tagline: 'Трубопроводная арматура и фитинги для профессионалов',
  address: 'г. Алматы, ул. Промышленная, 12',
  workHours: 'Пн–Пт: 9:00–18:00, Сб: 10:00–15:00',
  email: 'info@santehmarket.demo',
}

// TODO: вставить реальный номер клиента
export const WHATSAPP_PHONE = '77000000000'

export const PAGE_SIZE = 12

export const SORT_OPTIONS: SortOption[] = [
  { value: 'popular', label: 'Популярные' },
  { value: 'new', label: 'Новинки' },
  { value: 'price_asc', label: 'Сначала дешёвые' },
  { value: 'price_desc', label: 'Сначала дорогие' },
]

export const AVAILABILITY_LABELS: Record<string, string> = {
  in_stock: 'В наличии',
  on_order: 'Под заказ',
  out_of_stock: 'Нет в наличии',
}

export const CART_STORAGE_KEY = 'santeh-cart-storage'
export const FAVORITES_STORAGE_KEY = 'santeh-favorites-storage'
