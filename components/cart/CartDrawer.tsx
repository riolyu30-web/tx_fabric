"use client"

import { X, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCartStore } from "@/lib/store/cart"
import { formatPrice } from "@/lib/utils"

// 购物车侧边栏抽屉组件
interface CartDrawerProps {
  open: boolean // 是否打开
  onClose: () => void // 关闭回调
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore() // 购物车状态和方法

  const totalPrice = getTotalPrice() // 总价

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        {/* 头部 */}
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              购物车 ({items.length})
            </SheetTitle>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-sm"
              >
                清空
              </Button>
            )}
          </div>
        </SheetHeader>

        {/* 购物车内容 */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            // 空购物车
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">购物车是空的</p>
              <p className="text-sm text-gray-400 mb-4">
                添加一些面料开始您的创作吧
              </p>
              <Button onClick={onClose} asChild>
                <Link href="/products">开始选购</Link>
              </Button>
            </div>
          ) : (
            // 购物车商品列表
            <div className="space-y-4">
              {items.map((item) => {
                const price = item.product.salePrice || item.product.price
                const itemTotal = price * item.quantity

                return (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 border rounded-lg"
                  >
                    {/* 商品图片 */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={onClose}
                      className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* 商品信息 */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={onClose}
                        className="block hover:text-brand-brown transition-colors"
                      >
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {item.product.name}
                        </h4>
                      </Link>
                      <p className="text-xs text-gray-500 mb-2">
                        {item.product.content.map(c => `${c.name}${c.percentage}%`).join(" · ")}
                      </p>

                      {/* 价格和数量 */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold">
                          {formatPrice(itemTotal)}
                        </div>
                        
                        {/* 数量调整 */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                Math.max(0.5, item.quantity - 0.5)
                              )
                            }
                          >
                            -
                          </Button>
                          <span className="text-sm w-12 text-center">
                            {item.quantity}m
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 0.5)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* 删除按钮 */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* 底部结算区域 */}
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            {/* 总价 */}
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium">总计：</span>
              <span className="font-bold text-2xl">{formatPrice(totalPrice)}</span>
            </div>

            {/* 配送提示 */}
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
              {totalPrice >= 150 ? (
                <p className="text-green-600">✓ 您的订单符合免费配送条件</p>
              ) : (
                <p>
                  再购买 {formatPrice(150 - totalPrice)} 即可享受免费配送
                </p>
              )}
            </div>

            {/* 结算按钮 */}
            <div className="space-y-2">
              <Button className="w-full" size="lg">
                去结算
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={onClose}
                asChild
              >
                <Link href="/products">继续购物</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

