import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { onImageError } from '@/utils/imageFallback'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`${name} — фото ${activeIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onError={onImageError}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'aspect-square w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors',
                index === activeIndex ? 'border-accent-600' : 'border-transparent hover:border-neutral-300',
              )}
            >
              <img src={image} alt={`${name} — миниатюра ${index + 1}`} onError={onImageError} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
