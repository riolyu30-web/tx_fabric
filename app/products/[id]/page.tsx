"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductImageGallery from "@/components/product/ProductImageGallery"
import ProductGrid from "@/components/product/ProductGrid"
import { useCartStore } from "@/lib/store/cart"
import { formatPrice } from "@/lib/utils"
import { calculateProductDisplayPrices } from "@/lib/config/pricing"
import products from "@/data/products.json"
import { Product } from "@/types"

// 商品详情页面
export default function ProductDetailPage() {
  const params = useParams()
  const productSlug = params.id as string
  
  const [quantity, setQuantity] = useState(1) // 购买数量（米数）
  const [addedToCart, setAddedToCart] = useState(false) // 是否已加入购物车

  const addItem = useCartStore((state) => state.addItem) // 购物车添加函数

  // 类型断言
  const typedProducts = products as Product[]

  // 查找当前商品
  const product = typedProducts.find((p) => p.slug === productSlug)

  // 如果商品不存在，显示404
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">商品未找到</h1>
        <p className="text-gray-600">抱歉，您查找的商品不存在。</p>
      </div>
    )
  }

  // 计算显示价格（成本价转换为足米价并加上利润率）
  const displayPrices = calculateProductDisplayPrices(product)

  // 推荐商品（同分类）
  const recommendedProducts = typedProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  // 加入购物车
  const handleAddToCart = () => {
    addItem(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000) // 2秒后恢复按钮状态
  }

  // 计算总价（使用显示价格）
  const currentPrice = product.salePrice || displayPrices.whitePrice || displayPrices.basePrice
  const totalPrice = currentPrice * quantity

  return (
    <div className="min-h-screen">
      {/* 商品详情区域 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* 左侧：商品图片 */}
          <div>
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* 右侧：商品信息 */}
          <div className="space-y-6">
            {/* 标题和标签 */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={
                      tag === "Sale"
                        ? "destructive"
                        : tag === "New"
                        ? "success"
                        : "secondary"
                    }
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* 价格（显示计算后的足米价） */}
            <div className="border-y py-6">
              <div className="space-y-3">
                {/* 白色/彩色价格 */}
                {displayPrices.whitePrice ? (
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-gray-600 text-sm">白色：</span>
                      <span className="text-3xl font-bold">
                        ¥{displayPrices.whitePrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500">/米</span>
                    </div>
                    {displayPrices.colorPrice && (
                      <div className="flex items-baseline gap-3">
                        <span className="text-gray-600 text-sm">彩色：</span>
                        <span className="text-3xl font-bold">
                          ¥{displayPrices.colorPrice.toFixed(2)}
                        </span>
                        <span className="text-lg text-gray-500">/米</span>
                      </div>
                    )}
                    {displayPrices.samplePrice && (
                      <div className="flex items-baseline gap-3">
                        <span className="text-gray-600 text-sm">版布价：</span>
                        <span className="text-xl font-medium text-brand-brown">
                          ¥{displayPrices.samplePrice.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-baseline gap-3 mb-2">
                    {product.salePrice ? (
                      <>
                        <span className="text-4xl font-bold text-red-600">
                          {formatPrice(product.salePrice)}
                        </span>
                        <span className="text-2xl text-gray-500 line-through">
                          {formatPrice(displayPrices.basePrice)}
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold">
                        {formatPrice(displayPrices.basePrice)}
                      </span>
                    )}
                    <span className="text-lg text-gray-500">/米</span>
                  </div>
                )}
                {product.salePrice && !displayPrices.whitePrice && (
                  <p className="text-sm text-red-600">
                    节省{" "}
                    {formatPrice(displayPrices.basePrice - product.salePrice)}
                  </p>
                )}
              </div>
            </div>

            {/* 商品规格信息 */}
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">产品编号：</span>
                <span className="font-medium">{product.productNo}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">面料类型：</span>
                <span className="font-medium">{product.fabricType}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">成分：</span>
                <span className="font-medium">
                  {product.content.map(c => `${c.name} ${c.percentage}%`).join("、")}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">幅宽：</span>
                <span className="font-medium">{product.width} cm</span>
              </div>
              {product.weight && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">克重：</span>
                  <span className="font-medium">{product.weight} g/m²</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">库存状态：</span>
                <span
                  className={`font-medium ${
                    product.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.inStock ? "有货" : "暂时缺货"}
                </span>
              </div>
            </div>

            {/* 数量选择 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  购买数量（米）
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 0.5))}
                    disabled={!product.inStock}
                  >
                    -
                  </Button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(0.5, parseFloat(e.target.value) || 0.5))
                    }
                    step="0.5"
                    min="0.5"
                    className="w-24 text-center border rounded-md px-3 py-2"
                    disabled={!product.inStock}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 0.5)}
                    disabled={!product.inStock}
                  >
                    +
                  </Button>
                  <span className="text-sm text-gray-600">
                    最少 0.5 米，以 0.5 米为单位
                  </span>
                </div>
              </div>

              {/* 小计 */}
              <div className="flex items-baseline gap-2 text-xl">
                <span className="text-gray-600">小计：</span>
                <span className="font-bold">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* 加入购物车按钮 */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!product.inStock || addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    已加入购物车
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    加入购物车
                  </>
                )}
              </Button>
              <p className="text-sm text-gray-500 text-center">
                {product.inStock
                  ? "全场满 $150 包邮"
                  : "商品暂时缺货，请选择其他商品"}
              </p>
            </div>

            {/* 额外信息 */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <p>✓ 满 $150 免费配送</p>
              <p>✓ 30 天无理由退换货</p>
              <p>✓ 100% 品质保证</p>
              <p>✓ 安全支付保护</p>
            </div>
          </div>
        </div>
      </div>

      {/* 推荐商品 */}
      {recommendedProducts.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">您可能还喜欢</h2>
            <ProductGrid products={recommendedProducts} />
          </div>
        </div>
      )}
    </div>
  )
}

