"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"

const images = [
  "/images/sourcing/sa/souring01.jpg",
  "/images/sourcing/sa/souring02.jpg",
  "/images/sourcing/sa/souring03.jpg",
  "/images/sourcing/sa/souring04.jpg",
  "/images/sourcing/sa/souring05.jpg",
  "/images/sourcing/sa/souring06.jpg",
  "/images/sourcing/sa/souring07.jpg",
  "/images/sourcing/sa/souring08.jpg",
  "/images/sourcing/sa/souring09.jpg",
  "/images/sourcing/sa/souring10.jpg",
]

export default function SourcingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const t = useTranslations('FabricSourcing')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-2xl bg-gray-100">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={t('imageAlt')}
            fill
            className="object-cover"
          />
        </div>
      ))}
      
      {/* 指示器 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-brand-brown w-6" : "bg-white/70 hover:bg-white"
            }`}
            aria-label={`切换到图片 ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
