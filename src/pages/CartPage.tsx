import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { useUIStore } from '@/store/useUIStore'
import { products } from '@/data/products'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import Price from '@/components/common/Price'
import QuantityStepper from '@/components/common/QuantityStepper'
import Button from '@/components/common/Button'
import EmptyState from '@/components/common/EmptyState'
import { formatPrice } from '@/utils/format'
import { getCartWhatsAppLink } from '@/utils/whatsapp'
import { onImageError } from '@/utils/imageFallback'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clear = useCartStore((state) => state.clear)
  const showToast = useUIStore((state) => state.showToast)

  const lines = items
    .map((item) => ({ item, product: products.find((product) => product.id === item.productId) }))
    .filter((line): line is { item: typeof line.item; product: NonNullable<typeof line.product> } => Boolean(line.product))

  const total = lines.reduce((sum, line) => sum + line.product.price * line.item.quantity, 0)

  const whatsAppLink = getCartWhatsAppLink(
    lines.map((line) => ({
      name: line.product.name,
      quantity: line.item.quantity,
      unit: line.product.unit,
      price: line.product.price,
    })),
    total,
  )

  const handleClear = () => {
    clear()
    showToast('Корзина очищена', 'info')
  }

  return (
    <div className="container-page py-8">
      <Breadcrumbs items={[{ label: 'Корзина' }]} />
      <h1 className="mt-4 mb-6 text-2xl font-bold text-neutral-900">Корзина</h1>

      {lines.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Корзина пуста"
          description="Добавьте товары из каталога, чтобы оформить заказ"
          action={
            <Link to="/catalog">
              <Button>Перейти в каталог</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-4">
            {lines.map(({ item, product }) => (
              <div key={product.id} className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4">
                <Link to={`/product/${product.slug}`} className="shrink-0">
                  <img src={product.images[0]} alt={product.name} onError={onImageError} className="h-24 w-24 rounded-xl object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to={`/product/${product.slug}`} className="font-medium text-neutral-900 hover:text-accent-600">
                        {product.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-neutral-400">{product.brand}</p>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
                      aria-label="Удалить товар"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Price price={product.price} unit={product.unit} size="sm" />
                    <QuantityStepper value={item.quantity} onChange={(quantity) => setQuantity(product.id, quantity)} />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={handleClear}
              className="self-start text-sm font-medium text-neutral-400 hover:text-neutral-900"
            >
              Очистить корзину
            </button>
          </div>

          <div className="h-fit rounded-2xl border border-neutral-200 bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-neutral-900">Итого</h2>
            <div className="flex flex-col gap-2 border-b border-neutral-100 pb-4 text-sm">
              <div className="flex justify-between text-neutral-500">
                <span>Товаров</span>
                <span>{lines.reduce((sum, line) => sum + line.item.quantity, 0)} шт.</span>
              </div>
              <div className="flex justify-between font-medium text-neutral-900">
                <span>Сумма</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-neutral-500">К оплате</span>
              <span className="text-xl font-bold text-neutral-900">{formatPrice(total)}</span>
            </div>
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="mt-5 block">
              <Button fullWidth size="lg">
                Оформить через WhatsApp
              </Button>
            </a>
            <Link to="/catalog" className="mt-3 block text-center text-sm font-medium text-accent-600 hover:underline">
              Продолжить покупки
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
