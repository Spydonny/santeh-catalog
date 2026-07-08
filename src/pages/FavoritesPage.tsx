import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import { products } from '@/data/products'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import ProductGrid from '@/components/catalog/ProductGrid'
import EmptyState from '@/components/common/EmptyState'
import Button from '@/components/common/Button'

export default function FavoritesPage() {
  const ids = useFavoritesStore((state) => state.ids)
  const favoriteProducts = products.filter((product) => ids.includes(product.id))

  return (
    <div className="container-page py-8">
      <Breadcrumbs items={[{ label: 'Избранное' }]} />
      <h1 className="mt-4 mb-6 text-2xl font-bold text-neutral-900">Избранное</h1>

      {favoriteProducts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="В избранном пока пусто"
          description="Отмечайте понравившиеся товары значком сердца, чтобы вернуться к ним позже"
          action={
            <Link to="/catalog">
              <Button>Перейти в каталог</Button>
            </Link>
          }
        />
      ) : (
        <ProductGrid products={favoriteProducts} />
      )}
    </div>
  )
}
