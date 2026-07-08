// Проверенные стоковые фото (Unsplash) по темам трубопроводной арматуры и фитингов.
// Используются как изображения товаров вместо SVG-заглушек. При обрыве загрузки
// LazyImage/onImageError показывает нейтральную SVG-заглушку.

const PHOTO_IDS = [
  '1538474705339-e87de81450e8',
  '1607472586893-edb57bdc0e39',
  '1639600993675-2281b2c939f0',
  '1642797735471-3e90055c5ff9',
  '1696154994502-93dd97495a4f',
  '1707409464203-df2f21c32b9c',
  '1589870446935-ce8bc41685b8',
  '1760571327612-8ab776dcd462',
  '1776254473649-272d945cebf4',
  '1767274714714-dda4c25c6376',
  '1759750951607-703dd5c997ec',
  '1774290490354-3c2fb95f8bf2',
  '1759668987649-a2057d0a9f35',
  '1776254648037-cd698c2d8bbd',
  '1766769673659-d797245b1ba4',
  '1698031610493-c19fa20dfeab',
  '1596394723537-ee8cb659ce24',
  '1759148414485-5f624fe9d1ea',
  '1780034766224-04cfda73fa09',
  '1661571094656-1887a27885db',
  '1776254485148-879b2e4f4e58',
  '1559569283-327b99858782',
  '1760139546356-0a90390364d3',
  '1780034766356-a0ac12bdc819',
  '1761758674188-2b8e4c89c5e2',
]

function photoUrl(id: string): string {
  return `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`
}

function hashSeed(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

// Детерминированно выбирает `count` разных фото для товара — стабильно между рендерами.
export function getStockImages(seedKey: string, count = 3): string[] {
  const base = hashSeed(seedKey)
  const total = PHOTO_IDS.length
  const images: string[] = []
  for (let i = 0; i < count; i++) {
    const index = (base + i * 7) % total
    images.push(photoUrl(PHOTO_IDS[index]))
  }
  return images
}
