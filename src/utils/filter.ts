import type { Product, SortValue } from '@/types'

export interface ProductFilters {
  query?: string
  category?: string
  brands?: string[]
  minPrice?: number
  maxPrice?: number
  inStockOnly?: boolean
}

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const query = filters.query ? normalize(filters.query) : ''

  return products.filter((product) => {
    if (query) {
      const haystack = normalize(`${product.name} ${product.brand} ${product.category} ${product.subcategory}`)
      if (!haystack.includes(query)) return false
    }

    if (filters.category && product.category !== filters.category) return false

    if (filters.brands && filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false
    }

    if (typeof filters.minPrice === 'number' && product.price < filters.minPrice) return false
    if (typeof filters.maxPrice === 'number' && product.price > filters.maxPrice) return false

    if (filters.inStockOnly && product.availability !== 'in_stock') return false

    return true
  })
}

export function sortProducts(products: Product[], sort: SortValue): Product[] {
  const sorted = [...products]

  switch (sort) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'new':
      return sorted.sort((a, b) => Number(b.new) - Number(a.new) || b.rating - a.rating)
    case 'popular':
    default:
      return sorted.sort((a, b) => Number(b.popular) - Number(a.popular) || b.reviewsCount - a.reviewsCount)
  }
}

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}

export function getPriceBounds(products: Product[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 0 }
  const prices = products.map((p) => p.price)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}
