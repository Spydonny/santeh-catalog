import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, Trash2, X } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { useCartStore } from '@/store/useCartStore'
import { products } from '@/data/products'
import Price from '@/components/common/Price'
import QuantityStepper from '@/components/common/QuantityStepper'
import Button from '@/components/common/Button'
import EmptyState from '@/components/common/EmptyState'
import { formatPrice } from '@/utils/format'
import { getCartWhatsAppLink } from '@/utils/whatsapp'

function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

export default function CartDrawer() {
  const open = useUIStore((state) => state.cartDrawerOpen)
  const closeCartDrawer = useUIStore((state) => state.closeCartDrawer)
  const items = useCartStore((state) => state.items)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  const lines = items
    .map((item) => ({ item, product: getProductById(item.productId) }))
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

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-slate-900/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
          />
          <motion.div
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.22 }}
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <ShoppingBag size={20} />
                Корзина
              </h2>
              <button
                onClick={closeCartDrawer}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
                aria-label="Закрыть корзину"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {lines.length === 0 ? (
                <EmptyState
                  icon={ShoppingBag}
                  title="Корзина пуста"
                  description="Добавьте товары из каталога, чтобы оформить заказ"
                />
              ) : (
                <ul className="flex flex-col gap-4">
                  {lines.map(({ item, product }) => (
                    <li key={product.id} className="flex gap-3">
                      <Link to={`/product/${product.slug}`} onClick={closeCartDrawer} className="shrink-0">
                        <img src={product.images[0]} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col gap-1.5">
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={closeCartDrawer}
                          className="line-clamp-2 text-sm font-medium text-slate-900 hover:text-accent-600"
                        >
                          {product.name}
                        </Link>
                        <Price price={product.price} size="sm" />
                        <div className="flex items-center justify-between">
                          <QuantityStepper
                            value={item.quantity}
                            onChange={(quantity) => setQuantity(product.id, quantity)}
                          />
                          <button
                            onClick={() => removeItem(product.id)}
                            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                            aria-label="Удалить товар"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-slate-100 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-slate-500">Итого</span>
                  <span className="text-xl font-bold text-slate-900">{formatPrice(total)}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" fullWidth>
                      Оформить через WhatsApp
                    </Button>
                  </a>
                  <Link to="/cart" onClick={closeCartDrawer}>
                    <Button variant="outline" fullWidth>
                      Перейти в корзину
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
