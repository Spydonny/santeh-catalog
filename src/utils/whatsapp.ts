import { WHATSAPP_PHONE } from '@/constants'
import type { Product } from '@/types'
import { formatPrice } from './format'

function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`
}

export function getProductWhatsAppLink(product: Product): string {
  const text = [
    'Здравствуйте! Хочу заказать:',
    product.name,
    `Цена: ${formatPrice(product.price)}`,
  ].join('\n')

  return buildWhatsAppUrl(text)
}

export interface WhatsAppCartLine {
  name: string
  quantity: number
  unit: string
  price: number
}

export function getCartWhatsAppLink(lines: WhatsAppCartLine[], total: number): string {
  const itemsText = lines
    .map((line) => `— ${line.name} × ${line.quantity} ${line.unit} — ${formatPrice(line.price * line.quantity)}`)
    .join('\n')

  const text = [
    'Здравствуйте! Хочу оформить заказ:',
    itemsText,
    '',
    `Итого: ${formatPrice(total)}`,
  ].join('\n')

  return buildWhatsAppUrl(text)
}
