"use client"

import { useState } from "react"
import Image from "next/image"

// 商品图片画廊组件
interface ProductImageGalleryProps {
  images: string[] // 图片URL数组
  productName: string // 商品名称
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0) // 当前选中图片索引

  return (
    <div className="space-y-4">
      {/* 主图 */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={images[selectedImage]}
          alt={`${productName} - 图片 ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 缩略图 */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                index === selectedImage
                  ? "border-brand-brown"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - 缩略图 ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

