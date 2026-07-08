import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'
import type { Product } from '@/types'
import { useCartStore } from '@/store/useCartStore'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import { useUIStore } from '@/store/useUIStore'
import Badge from '@/components/common/Badge'
import Price from '@/components/common/Price'
import Rating from '@/components/common/Rating'
import Availability from '@/components/common/Availability'
import LazyImage from '@/components/common/LazyImage'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const isFavorite = useFavoritesStore((state) => state.ids.includes(product.id))
  const toggleFavorite = useFavoritesStore((state) => state.toggle)
  const showToast = useUIStore((state) => state.showToast)

  const handleAddToCart = () => {
    addItem(product.id)
    showToast(`«${product.name}» добавлен в корзину`)
  }

  const handleToggleFavorite = (event: MouseEvent) => {
    event.preventDefault()
    toggleFavorite(product.id)
    showToast(isFavorite ? 'Удалено из избранного' : 'Добавлено в избранное', 'info')
  }

  const outOfStock = product.availability === 'out_of_stock'

  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-colors duration-200 hover:border-neutral-900"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
    >
      <button
        onClick={handleToggleFavorite}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-400 ring-1 ring-black/5 backdrop-blur transition-colors hover:text-neutral-900"
        aria-label="В избранное"
      >
        <Heart size={17} className={isFavorite ? 'fill-neutral-900 text-neutral-900' : ''} />
      </button>

      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <LazyImage src={product.images[0]} alt={product.name} className="h-full w-full" />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.new && <Badge variant="accent">Новинка</Badge>}
            {product.discount > 0 && <Badge variant="danger">−{product.discount}%</Badge>}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">{product.subcategory}</span>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-neutral-900">{product.name}</h3>
          <Rating value={product.rating} reviewsCount={product.reviewsCount} size={13} />
          <Availability status={product.availability} />
          <Price price={product.price} oldPrice={product.oldPrice} size="sm" className="mt-1" />
        </div>
      </Link>

      <div className="flex gap-2 p-4 pt-0">
        <Link
          to={`/product/${product.slug}`}
          className="flex flex-1 items-center justify-center rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
        >
          Подробнее
        </Link>
        <button
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-40"
        >
          <ShoppingCart size={15} />В корзину
        </button>
      </div>
    </motion.div>
  )
}
