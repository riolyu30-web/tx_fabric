"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

// 新品数据类型
interface NewProduct {
  title: string
  description: string
  updateTime: string
  photo: string[]
}

// 新品上线页面客户端组件
export default function NewProductsClient() {
  const [newProducts, setNewProducts] = useState<NewProduct[]>([])
  const [loading, setLoading] = useState(true)

  // 加载新品数据
  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await fetch("/api/new-products")
        if (response.ok) {
          const data = await response.json()
          setNewProducts(data)
        }
      } catch (error) {
        console.error("加载新品数据失败:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNewProducts()
  }, [])

  // 加载状态
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">新品上线</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          探索我们最新推出的面料系列，为您带来更多优质选择
        </p>
      </div>

      {/* 新品列表 */}
      {newProducts.length > 0 ? (
        <div className="space-y-16">
          {newProducts.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                {/* 图片区域 */}
                <div className="relative h-96 md:h-full">
                  {product.photo.length > 0 ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={product.photo[0]}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                      {product.photo.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                          +{product.photo.length - 1} 更多图片
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                      <Package className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* 内容区域 */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4" />
                    <span>更新时间: {product.updateTime}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                  
                  <div className="flex gap-4">
                    <Button asChild className="bg-brand-brown hover:bg-brand-brown/90">
                      <Link href="/products">
                        查看详情
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/quotation">获取报价</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* 图片预览区域 */}
              {product.photo.length > 1 && (
                <div className="px-8 pb-8">
                  <div className="grid grid-cols-4 gap-4">
                    {product.photo.slice(1, 5).map((photo, photoIndex) => (
                      <div key={photoIndex} className="relative h-24 rounded-md overflow-hidden">
                        <Image
                          src={photo}
                          alt={`${product.title} - 图片 ${photoIndex + 2}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">暂无新品</h3>
          <p className="text-gray-600 mb-6">目前没有新品上架，请稍后再来查看</p>
          <Button asChild className="bg-brand-brown hover:bg-brand-brown/90">
            <Link href="/products">浏览所有产品</Link>
          </Button>
        </div>
      )}

      {/* 底部行动区域 */}
      <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">需要更多帮助？</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          我们的专业团队随时为您提供面料咨询和定制服务
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-brand-brown hover:bg-brand-brown/90">
            <Link href="/fabric-sourcing">代客找版</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">联系我们</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}