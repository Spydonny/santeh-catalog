import { motion } from 'framer-motion'
import type { Product } from '@/types'
import ProductCard from './ProductCard'
import { SkeletonProductCard } from '@/components/common/Skeleton'
import EmptyState from '@/components/common/EmptyState'
import Button from '@/components/common/Button'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  skeletonCount?: number
  onResetFilters?: () => void
}

export default function ProductGrid({ products, loading, skeletonCount = 8, onResetFilters }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: skeletonCount }, (_, index) => (
          <SkeletonProductCard key={index} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="Ничего не найдено"
        description="Попробуйте изменить параметры поиска или сбросить фильтры"
        action={
          onResetFilters && (
            <Button variant="outline" onClick={onResetFilters}>
              Сбросить фильтры
            </Button>
          )
        }
      />
    )
  }

  return (
    <motion.div
      className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}
