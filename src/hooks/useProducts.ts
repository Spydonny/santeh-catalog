import { useEffect, useMemo, useState } from 'react'
import { products } from '@/data/products'
import { PAGE_SIZE } from '@/constants'
import { filterProducts, paginate, sortProducts, type ProductFilters } from '@/utils/filter'
import type { Product, SortValue } from '@/types'

interface UseProductsOptions extends ProductFilters {
  sort?: SortValue
  page?: number
  pageSize?: number
  simulateLoading?: boolean
}

interface UseProductsResult {
  items: Product[]
  total: number
  totalPages: number
  loading: boolean
}

export function useProducts(options: UseProductsOptions): UseProductsResult {
  const {
    query,
    category,
    brands,
    minPrice,
    maxPrice,
    inStockOnly,
    sort = 'popular',
    page = 1,
    pageSize = PAGE_SIZE,
    simulateLoading = true,
  } = options

  const [loading, setLoading] = useState(simulateLoading)
  const dependencyKey = JSON.stringify({ query, category, brands, minPrice, maxPrice, inStockOnly, sort, page })

  useEffect(() => {
    if (!simulateLoading) return
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencyKey, simulateLoading])

  const filtered = useMemo(
    () => filterProducts(products, { query, category, brands, minPrice, maxPrice, inStockOnly }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, category, JSON.stringify(brands), minPrice, maxPrice, inStockOnly],
  )

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort])
  const total = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const items = useMemo(() => paginate(sorted, page, pageSize), [sorted, page, pageSize])

  return { items, total, totalPages, loading }
}
