"use client"

import Link from "next/link"
import { X, ChevronRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useCartStore } from "@/lib/store/cart"
import categories from "@/data/categories.json"

// 移动端导航抽屉组件
interface MobileNavProps {
  open: boolean // 是否打开
  onClose: () => void // 关闭回调
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null) // 展开的分类
  const { items } = useCartStore() // 获取购物车商品数量
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !open) return null

  // 主导航项
  const mainNav = [
    { name: "首页", href: "/" },
    { name: "新品上线", href: "/new-products" },
    { name: "最新报价", href: "/quotation" },
    { name: "代客找版", href: "/fabric-sourcing" },
    { name: "关于我们", href: "/about" },
  ]

  // 使用 data/categories.json 中的分类
  const fabricTypes = categories.map(c => ({
    name: c.name,
    href: `/products?category=${c.slug}`
  }))

  // 面料成分
  const fabricContents = [
    { name: "棉", href: "/products?content=棉" },
    { name: "亚麻", href: "/products?content=亚麻" },
    { name: "天丝", href: "/products?content=天丝" },
    { name: "涤纶", href: "/products?content=涤纶" },
    { name: "人棉", href: "/products?content=人棉" },
    { name: "锦纶", href: "/products?content=锦纶" },
    { name: "醋酸", href: "/products?content=醋酸" },
  ]

  return createPortal(
    <div className="fixed inset-0 z-[100] flex">
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* 侧边栏 */}
      <div className="relative z-10 w-80 bg-white shadow-xl flex flex-col h-full animate-in slide-in-from-left duration-300">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <h2 className="text-lg font-semibold">菜单</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* 导航内容 */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {/* 主导航 */}
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* 购物车链接 */}
            <Link
              href="/cart"
              onClick={onClose}
              className="block px-4 py-3 rounded-md hover:bg-gray-100 transition-colors relative"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                购物车
                {cartItemsCount > 0 && (
                  <span className="ml-auto h-6 w-6 rounded-full bg-brand-brown text-white text-xs flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </Link>

            {/* 面料类型折叠菜单 */}
            <div className="border-t pt-4 mt-4">
              <button
                onClick={() => setExpandedSection(expandedSection === 'types' ? null : 'types')}
                className="flex items-center justify-between w-full px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">按面料类型</span>
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    expandedSection === 'types' ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {expandedSection === 'types' && (
                <div className="mt-2 space-y-1 pl-4">
                  {fabricTypes.map((type) => (
                    <Link
                      key={type.href}
                      href={type.href}
                      onClick={onClose}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-brand-brown transition-colors"
                    >
                      {type.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 面料成分折叠菜单 */}
            <div>
              <button
                onClick={() => setExpandedSection(expandedSection === 'contents' ? null : 'contents')}
                className="flex items-center justify-between w-full px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">按面料成分</span>
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    expandedSection === 'contents' ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {expandedSection === 'contents' && (
                <div className="mt-2 space-y-1 pl-4">
                  {fabricContents.map((content) => (
                    <Link
                      key={content.href}
                      href={content.href}
                      onClick={onClose}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-brand-brown transition-colors"
                    >
                      {content.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>,
    document.body
  )
}
