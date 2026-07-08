import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Heart, MessageCircle, ShoppingCart, Zap } from 'lucide-react'
import { getProductBySlug, getRelatedProducts } from '@/data/products'
import { getCategoryBySlug } from '@/data/categories'
import { getReviewsByProductId } from '@/data/reviews'
import { useCartStore } from '@/store/useCartStore'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import { useUIStore } from '@/store/useUIStore'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import ProductGallery from '@/components/catalog/ProductGallery'
import Rating from '@/components/common/Rating'
import Price from '@/components/common/Price'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'
import Availability from '@/components/common/Availability'
import ProductGrid from '@/components/catalog/ProductGrid'
import { formatDate } from '@/utils/format'
import { getProductWhatsAppLink } from '@/utils/whatsapp'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const product = slug ? getProductBySlug(slug) : undefined

  const addItem = useCartStore((state) => state.addItem)
  const isFavorite = useFavoritesStore((state) => (product ? state.ids.includes(product.id) : false))
  const toggleFavorite = useFavoritesStore((state) => state.toggle)
  const showToast = useUIStore((state) => state.showToast)

  if (!product) {
    return <Navigate to="/404" replace />
  }

  const category = getCategoryBySlug(product.category)
  const reviews = getReviewsByProductId(product.id)
  const related = getRelatedProducts(product)
  const outOfStock = product.availability === 'out_of_stock'

  const handleAddToCart = () => {
    addItem(product.id)
    showToast(`«${product.name}» добавлен в корзину`)
  }

  const handleBuyNow = () => {
    addItem(product.id)
    navigate('/cart')
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product.id)
    showToast(isFavorite ? 'Удалено из избранного' : 'Добавлено в избранное', 'info')
  }

  return (
    <div className="container-page py-8">
      <Breadcrumbs
        items={[
          { label: 'Каталог', href: '/catalog' },
          ...(category ? [{ label: category.name, href: `/catalog?category=${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-5 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div className="flex flex-col gap-4">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">{product.subcategory}</span>
            <h1 className="mt-1 text-2xl font-bold text-neutral-900">{product.name}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Rating value={product.rating} reviewsCount={product.reviewsCount} />
            <span className="text-neutral-300">•</span>
            <span className="text-sm text-neutral-500">Бренд: {product.brand}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {product.new && <Badge variant="accent">Новинка</Badge>}
            {product.discount > 0 && <Badge variant="danger">Скидка {product.discount}%</Badge>}
            <Availability status={product.availability} className="text-[13px]" />
          </div>

          <Price price={product.price} oldPrice={product.oldPrice} unit={product.unit} size="lg" />

          <p className="leading-relaxed text-neutral-600">{product.description}</p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button variant="primary" size="lg" icon={<ShoppingCart size={18} />} onClick={handleAddToCart} disabled={outOfStock}>
              В корзину
            </Button>
            <Button variant="secondary" size="lg" icon={<Zap size={18} />} onClick={handleBuyNow} disabled={outOfStock}>
              Купить сейчас
            </Button>
            <a href={getProductWhatsAppLink(product)} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" fullWidth icon={<MessageCircle size={18} />}>
                Купить через WhatsApp
              </Button>
            </a>
            <Button
              variant="ghost"
              size="lg"
              icon={<Heart size={18} className={isFavorite ? 'fill-neutral-900 text-neutral-900' : ''} />}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? 'В избранном' : 'В избранное'}
            </Button>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <h2 className="mb-3 text-base font-semibold text-neutral-900">Характеристики</h2>
            <dl className="flex flex-col divide-y divide-neutral-100 text-sm">
              {product.specifications.map((spec) => (
                <div key={spec.title} className="flex justify-between gap-4 py-2">
                  <dt className="text-neutral-500">{spec.title}</dt>
                  <dd className="text-right font-medium text-neutral-900">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="mb-5 text-xl font-bold text-neutral-900">
          Отзывы {reviews.length > 0 && <span className="text-neutral-400">({reviews.length})</span>}
        </h2>
        {reviews.length === 0 ? (
          <p className="text-sm text-neutral-500">По этому товару пока нет отзывов.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-neutral-200 bg-white p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-neutral-900">{review.author}</span>
                  <span className="text-xs text-neutral-400">{formatDate(review.date)}</span>
                </div>
                <Rating value={review.rating} showValue={false} size={14} />
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section className="mt-14">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-900">Похожие товары</h2>
            {category && (
              <Link
                to={`/catalog?category=${category.slug}`}
                className="text-sm font-medium text-accent-600 hover:underline"
              >
                Вся категория
              </Link>
            )}
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}
