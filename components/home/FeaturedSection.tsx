import Link from "next/link"
import Image from "next/image"
import { Product } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice, getPrimaryImage } from "@/lib/utils"
// 导入计算价格工具函数
import { calculateProductDisplayPrices } from "@/lib/config/pricing"
import { useLocale } from "next-intl"

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
  const locale = useLocale()
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
          {products.map((product) => {
            // 计算商品显示价格
            const displayPrices = calculateProductDisplayPrices(product)
            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-shadow">
                  {/* 商品图片 */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={getPrimaryImage(product.images)}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* 标签 */}
                    {product.tags?.length > 0 && (
                      <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
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
                      {product.fullname || product.name}
                    </h3>
                    {/* 价格（显示计算后的足米价或白/彩色价） */}
                    <div className="flex items-baseline gap-2 mb-2">
                      {product.salePrice ? (
                        <>
                          <span className="text-lg font-bold text-red-600">
                            {formatPrice(product.salePrice, locale)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(displayPrices.basePrice, locale)}
                          </span>
                        </>
                      ) : displayPrices.whitePrice ? (
                        <>
                          <span className="text-lg font-bold">
                            {formatPrice(displayPrices.whitePrice, locale)}
                          </span>
                          {displayPrices.colorPrice && displayPrices.colorPrice !== displayPrices.whitePrice && (
                            <span className="text-sm text-gray-600">
                              / {formatPrice(displayPrices.colorPrice, locale)}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-lg font-bold">
                          {formatPrice(displayPrices.basePrice, locale)}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">/米</span>
                    </div>
                    {/* 面料信息 */}
                    <div className="text-xs text-gray-500 space-y-1 mt-1">
                      <p>{product.content?.map(c => `${c.name}${c.percentage}%`).join(" · ")}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

