"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCartStore } from "@/lib/store/cart"
import { formatPrice } from "@/lib/utils"
import { calculateProductDisplayPrices } from "@/lib/config/pricing"

// 购物车页面
export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore() // 购物车状态和方法

  const totalPrice = getTotalPrice() // 总价
  const shippingCost = totalPrice >= 150 ? 0 : 15 // 运费
  const finalTotal = totalPrice + shippingCost // 最终总价

  // 空购物车
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">购物车是空的</h1>
          <p className="text-gray-600 mb-8">
            还没有添加任何商品，去看看我们的精选面料吧！
          </p>
          <Button size="lg" asChild>
            <Link href="/products">开始选购</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">购物车</h1>
        <Button variant="outline" onClick={clearCart}>
          清空购物车
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 左侧：商品列表 */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            // 计算显示价格
            const displayPrices = calculateProductDisplayPrices(item.product)
            const price = item.product.salePrice || displayPrices.whitePrice || displayPrices.basePrice
            const itemTotal = price * item.quantity

            return (
              <Card key={item.product.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* 商品图片 */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="relative w-32 h-32 flex-shrink-0 rounded overflow-hidden"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </Link>

                    {/* 商品信息 */}
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="block hover:text-brand-brown transition-colors mb-2"
                      >
                        <h3 className="font-semibold text-lg">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-3">
                        {item.product.content.map(c => `${c.name}${c.percentage}%`).join(" · ")} | 宽度{" "}
                        {item.product.width}cm
                      </p>

                      {/* 价格（显示计算后的足米价） */}
                      <div className="flex items-baseline gap-2 mb-4">
                        {item.product.salePrice ? (
                          <>
                            <span className="text-xl font-bold text-red-600">
                              {formatPrice(item.product.salePrice)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(displayPrices.basePrice)}
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-bold">
                            {formatPrice(price)}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">/米</span>
                      </div>

                      {/* 数量调整和小计 */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">数量：</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                Math.max(0.5, item.quantity - 0.5)
                              )
                            }
                          >
                            -
                          </Button>
                          <span className="w-16 text-center font-medium">
                            {item.quantity} 米
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 0.5)
                            }
                          >
                            +
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-600 mb-1">小计</p>
                          <p className="text-xl font-bold">
                            {formatPrice(itemTotal)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 删除按钮 */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 右侧：订单摘要 */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold mb-4">订单摘要</h2>

              {/* 商品总价 */}
              <div className="flex justify-between text-base">
                <span className="text-gray-600">商品总价：</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>

              {/* 运费 */}
              <div className="flex justify-between text-base">
                <span className="text-gray-600">运费：</span>
                <span className="font-medium">
                  {shippingCost === 0 ? (
                    <span className="text-green-600">免费</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>

              {/* 分隔线 */}
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>总计：</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* 配送提示 */}
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                {totalPrice >= 150 ? (
                  <p className="text-green-600">
                    ✓ 您的订单符合免费配送条件
                  </p>
                ) : (
                  <p className="text-gray-600">
                    再购买 {formatPrice(150 - totalPrice)} 即可享受免费配送
                  </p>
                )}
              </div>

              {/* 结算按钮 */}
              <Button className="w-full" size="lg">
                去结算
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/products">继续购物</Link>
              </Button>

              {/* 额外信息 */}
              <div className="border-t pt-4 space-y-2 text-xs text-gray-600">
                <p>✓ 100% 安全支付</p>
                <p>✓ 30 天无理由退换货</p>
                <p>✓ 品质保证</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

