export type Availability = 'in_stock' | 'on_order' | 'out_of_stock'

export interface Specification {
  title: string
  value: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: string
  subcategory: string
  brand: string
  price: number
  oldPrice: number | null
  unit: string
  description: string
  specifications: Specification[]
  images: string[]
  availability: Availability
  rating: number
  reviewsCount: number
  popular: boolean
  new: boolean
  discount: number
}

export interface Category {
  id: string
  slug: string
  name: string
  icon: string
  popular: boolean
  description: string
}

export interface Brand {
  id: string
  name: string
}

export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  date: string
  text: string
}

export interface CartItem {
  productId: string
  quantity: number
}

export type SortValue = 'popular' | 'new' | 'price_asc' | 'price_desc'

export interface SortOption {
  value: SortValue
  label: string
}

export type ToastVariant = 'success' | 'info' | 'error'

export interface ToastMessage {
  id: string
  text: string
  variant: ToastVariant
}
