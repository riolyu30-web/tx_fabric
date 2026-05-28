"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ImageSequencePlayerProps {
  images: string[]
  interval?: number
  title?: string
}

export default function ImageSequencePlayer({ images, interval = 1000, title }: ImageSequencePlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images, interval])

  if (!images || images.length === 0) {
    return <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg text-gray-400">暂无图片</div>
  }

  return (
    <div className="flex flex-col gap-4">
      {title && <h3 className="text-xl font-semibold text-center text-gray-800">{title}</h3>}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Factory view ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            priority={true}
            unoptimized={true}
          />
        ))}
      </div>
    </div>
  )
}
