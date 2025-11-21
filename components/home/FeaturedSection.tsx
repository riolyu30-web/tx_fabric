import Link from "next/link"
import Image from "next/image"
import { Product } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"

// 精选商品区域组件
interface FeaturedSectionProps {
  title: string // 标题
  products: Product[] // 商品列表
  viewAllLink?: string // 查看全部链接
}

export default function FeaturedSection({
  title,
  products,
  viewAllLink,
}: FeaturedSectionProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* 标题和查看全部 */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{title}</h2>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="text-brand-brown hover:underline font-medium"
            >
              查看全部 →
            </Link>
          )}
        </div>

        {/* 商品网格 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-shadow">
                {/* 商品图片 */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* 标签 */}
                  {product.tags.length > 0 && (
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {product.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant={
                            tag === "Sale"
                              ? "destructive"
                              : tag === "New"
                              ? "success"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* 商品信息 */}
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-brand-brown transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    {product.salePrice ? (
                      <>
                        <span className="text-lg font-bold text-red-600">
                          {formatPrice(product.salePrice)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold">
                        {formatPrice(product.price)}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">/米</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.content.join(" · ")}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

