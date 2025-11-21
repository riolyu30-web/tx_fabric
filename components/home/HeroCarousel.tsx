"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Banner } from "@/types"

// Hero轮播图组件
interface HeroCarouselProps {
  banners: Banner[] // 轮播图数据
}

export default function HeroCarousel({ banners }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0) // 当前索引
  const [isAutoPlaying, setIsAutoPlaying] = useState(true) // 是否自动播放

  // 上一张
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    )
  }, [banners.length])

  // 下一张
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    )
  }, [banners.length])

  // 跳转到指定索引
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // 自动播放
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      goToNext()
    }, 5000) // 每5秒切换

    return () => clearInterval(interval)
  }, [isAutoPlaying, goToNext])

  if (banners.length === 0) return null

  const currentBanner = banners[currentIndex]

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-100"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 轮播图片 */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>
      ))}

      {/* 内容区域 */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-xl text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            {currentBanner.title}
          </h2>
          {currentBanner.subtitle && (
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              {currentBanner.subtitle}
            </p>
          )}
          {currentBanner.link && currentBanner.buttonText && (
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
              asChild
            >
              <Link href={currentBanner.link}>{currentBanner.buttonText}</Link>
            </Button>
          )}
        </div>
      </div>

      {/* 上一张按钮 */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      {/* 下一张按钮 */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={goToNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* 指示器 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`跳转到第 ${index + 1} 张`}
          />
        ))}
      </div>
    </div>
  )
}

