import { useState } from 'react'
import { cn } from '@/utils/cn'
import { onImageError } from '@/utils/imageFallback'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
}

export default function LazyImage({ src, alt, className }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-neutral-100', className)}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-neutral-200" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={(event) => {
          onImageError(event)
          setLoaded(true)
        }}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
}
