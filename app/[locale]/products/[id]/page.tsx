"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductImageGallery from "@/components/product/ProductImageGallery"
import ProductGrid from "@/components/product/ProductGrid"
import { useCartStore } from "@/lib/store/cart"
import { formatPrice, getDetailImages } from "@/lib/utils"
import { calculateProductDisplayPrices } from "@/lib/config/pricing"
import zhProducts from "@/data/locales/zh/products.json"
import enProducts from "@/data/locales/en/products.json"
import { Product } from "@/types"
import { useLocale, useTranslations } from "next-intl"

// Product detail page
export default function ProductDetailPage() {
  const locale = useLocale()
  const t = useTranslations('ProductDetailPage')
  const products = locale === 'zh' ? zhProducts : enProducts
  const params = useParams()
  const productSlug = params.id as string
  
  const [quantity, setQuantity] = useState(1) // Purchase quantity (meters)
  const [addedToCart, setAddedToCart] = useState(false) // Whether added to cart

  const addItem = useCartStore((state) => state.addItem) // 购物车添加函数

  // Type assertion
  const typedProducts = products as Product[]

  // Find current product
  const product = typedProducts.find((p) => p.slug === productSlug)

  // If product not found, display 404
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">{t('productNotFound')}</h1>
        <p className="text-gray-600">{t('productNotFoundMessage')}</p>
      </div>
    )
  }

  // Calculate display prices (cost price converted to full meter price plus profit margin)
  const displayPrices = calculateProductDisplayPrices(product)

  // 推荐商品（同分类，且有库存）
  const recommendedProducts = typedProducts
    .filter((p) => p.category === product.category && p.id !== product.id && p.inStock)
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
      {/* Product Detail Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Product Images */}
          <div>
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Right: Product Information */}
          <div className="space-y-6">
            {/* Title and Tags */}
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

            {/* Price (display calculated full meter price) */}
            <div className="border-y py-6">
              <div className="space-y-3">
                {/* White/Color Price */}
                {displayPrices.whitePrice ? (
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-gray-600 text-sm">{t('whiteColor')}:</span>
                      <span className="text-3xl font-bold">
                        {formatPrice(displayPrices.whitePrice, locale)}
                      </span>
                      <span className="text-lg text-gray-500">{t('perMeter')}</span>
                    </div>
                    {displayPrices.colorPrice && (
                      <div className="flex items-baseline gap-3">
                        <span className="text-gray-600 text-sm">{t('color')}:</span>
                        <span className="text-3xl font-bold">
                          {formatPrice(displayPrices.colorPrice, locale)}
                        </span>
                        <span className="text-lg text-gray-500">{t('perMeter')}</span>
                      </div>
                    )}
                    {displayPrices.samplePrice && (
                      <div className="flex items-baseline gap-3">
                        <span className="text-gray-600 text-sm">{t('samplePrice')}:</span>
                        <span className="text-xl font-medium text-brand-brown">
                          {formatPrice(displayPrices.samplePrice, locale)}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-baseline gap-3 mb-2">
                    {product.salePrice ? (
                      <>
                        <span className="text-4xl font-bold text-red-600">
                          {formatPrice(product.salePrice, locale)}
                        </span>
                        <span className="text-2xl text-gray-500 line-through">
                          {formatPrice(displayPrices.basePrice, locale)}
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold">
                        {formatPrice(displayPrices.basePrice, locale)}
                      </span>
                    )}
                    <span className="text-lg text-gray-500">/米</span>
                  </div>
                )}
                {product.salePrice && !displayPrices.whitePrice && (
                  <p className="text-sm text-red-600">
                    {t('save')} {" "}
                    {formatPrice(displayPrices.basePrice - product.salePrice, locale)}
                  </p>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">{t('productNumber')}:</span>
                <span className="font-medium">{product.productNo}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">{t('fabricType')}:</span>
                <span className="font-medium">{product.type}</span> {/* 使用新字段 type */}
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">{t('composition')}:</span>
                <span className="font-medium">
                  {product.content.map(c => `${c.name} ${c.percentage}%`).join("、")}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">{t('width')}:</span>
                <span className="font-medium">{product.width} cm</span>
              </div>
              {product.weight && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{t('weight')}:</span>
                  <span className="font-medium">{product.weight} g/m²</span>
                </div>
              )}
              {product.metersPerKg && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{t('metersPerKg')}:</span>
                  <span className="font-medium">{product.metersPerKg} m/kg</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">{t('stockStatus')}:</span>
                <span
                  className={`font-medium ${
                    product.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.inStock ? t('inStock') : t('outOfStock')}
                </span>
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('purchaseQuantity')}{t('meters')}
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
                    {t('minQuantity')}
                  </span>
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex items-baseline gap-2 text-xl">
                <span className="text-gray-600">{t('subtotal')}:</span>
                <span className="font-bold">{formatPrice(totalPrice, locale)}</span>
              </div>
            </div>

            {/* Add to Cart Button */}
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
                    {t('addedToCart')}
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {t('addToCart')}
                  </>
                )}
              </Button>
              <p className="text-sm text-gray-500 text-center">
                {product.inStock
                  ? t('freeShipping')
                  : t('productOutOfStock')}
              </p>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <p>✓ {t('returnPolicy')}</p>
              <p>✓ {t('qualityGuarantee')}</p>
              <p>✓ {t('securePayment')}</p>
              <p>✓ {t('freeShippingThreshold')}</p>
            </div>

            {/* Detail Images */}
            {getDetailImages(product.images).length > 0 && (
              <div className="pt-8 border-t">
                <h3 className="text-lg font-bold mb-4">{t('productDetails')}</h3>
                <div className="space-y-4">
                  {getDetailImages(product.images).map((img, idx) => (
                    <div key={idx} className="relative w-full rounded-lg overflow-hidden border">
                      {/* 使用 img 标签以支持自适应高度 */}
                      <img 
                        src={img} 
                        alt={`${product.name} ${t('detailImage')} ${idx + 1}`} 
                        className="w-full h-auto object-cover" 
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">{t('youMightAlsoLike')}</h2>
            <ProductGrid products={recommendedProducts} />
          </div>
        </div>
      )}
    </div>
  )
}