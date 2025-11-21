import Link from "next/link"
import Image from "next/image"
import { Product } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { calculateProductDisplayPrices } from "@/lib/config/pricing"

// 商品卡片组件
interface ProductCardProps {
  product: Product // 商品数据
}

export default function ProductCard({ product }: ProductCardProps) {
  // 计算显示价格（成本价转换为足米价并加上利润率）
  const displayPrices = calculateProductDisplayPrices(product)
  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
        {/* 商品图片（双图hover切换） */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {/* 第一张图片 */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:opacity-0 transition-opacity duration-300"
          />
          {/* 第二张图片（hover显示） */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={product.name}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
          
          {/* 标签 */}
          {product.tags.length > 0 && (
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

          {/* 库存状态 */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">暂时缺货</span>
            </div>
          )}
        </div>

        {/* 商品信息 */}
        <CardContent className="p-4">
          <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-brand-brown transition-colors">
            {product.name}
          </h3>
          
          {/* 价格（显示计算后的足米价） */}
          <div className="flex items-baseline gap-2 mb-2">
            {product.salePrice ? (
              <>
                <span className="text-lg font-bold text-red-600">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(displayPrices.basePrice)}
                </span>
              </>
            ) : displayPrices.whitePrice ? (
              <>
                <span className="text-lg font-bold">
                  ¥{displayPrices.whitePrice.toFixed(2)}
                </span>
                {displayPrices.colorPrice && displayPrices.colorPrice !== displayPrices.whitePrice && (
                  <span className="text-sm text-gray-600">
                    / ¥{displayPrices.colorPrice.toFixed(2)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-lg font-bold">
                {formatPrice(displayPrices.basePrice)}
              </span>
            )}
            <span className="text-xs text-gray-500">/米</span>
          </div>

          {/* 面料信息 */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>{product.content.map(c => `${c.name}${c.percentage}%`).join(" · ")}</p>
            <p>{product.fabricType} | 宽度 {product.width}cm</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

