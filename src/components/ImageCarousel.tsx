'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface CarouselImage {
  src: string
  alt: string
}

export function ImageCarousel({ images = [] }: { images?: CarouselImage[] }) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const count = images.length

  useEffect(() => {
    if (count === 0) return
    setIndex((current) => {
      if (current >= count) return count - 1
      if (current < 0) return 0
      return current
    })
  }, [count])

  function goTo(i: number) {
    if (count === 0) return
    setIndex(((i % count) + count) % count)
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const threshold = 50

    if (deltaX > threshold) {
      goTo(index - 1)
    } else if (deltaX < -threshold) {
      goTo(index + 1)
    }

    touchStartX.current = null
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="my-8">
      <div
        className="relative aspect-video overflow-hidden rounded-xl bg-muted"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, i) => (
          <div
            key={image.src}
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: i === index ? 1 : 0,
              pointerEvents: i === index ? 'auto' : 'none',
            }}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover" />
          </div>
        ))}

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => goTo(index - 1)}
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-lg leading-none text-foreground shadow-md backdrop-blur-sm hover:bg-background"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => goTo(index + 1)}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-lg leading-none text-foreground shadow-md backdrop-blur-sm hover:bg-background"
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? 'bg-accent' : 'bg-border'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}