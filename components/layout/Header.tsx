"use client"

import Link from "next/link"
import Image from "next/image" // 引入 Next.js 的图片组件
import { useState } from "react"
import { Menu, Search, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MegaMenu from "./MegaMenu"
import MobileNav from "./MobileNav"
import { useCartStore } from "@/lib/store/cart"
import { useTranslations } from "next-intl"

// 顶部导航栏组件
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // 移动端菜单状态
  const [searchOpen, setSearchOpen] = useState(false) // 搜索框状态
  const [megaMenuOpen, setMegaMenuOpen] = useState(false) // 大型菜单状态
  
  const { items } = useCartStore() // 获取购物车商品数量
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  const tNav = useTranslations('Common.nav');
  const tHeader = useTranslations('Common.header');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* 顶部公告栏 */}
      <div className="bg-brand-brown text-white text-center py-2 text-sm">
        <p>{tHeader('announcement')}</p>
      </div>

      {/* 主导航区域 */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 左侧：移动端菜单按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">{tHeader('openMenu')}</span>
          </Button>

          {/* 中间：Logo */}
          {/* 创建一个跳转到首页的链接容器 */}
          <Link href="/" className="flex items-center space-x-2">
            {/* 使用 Next.js Image 组件加载公用目录下的 logo 图片 */}
            <Image src="/images/logo.png" alt={tHeader('brandName')} width={160} height={40} className="h-10 w-auto" priority />
          {/* 闭合 Link 标签 */}
          </Link>

          {/* 桌面端导航菜单 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/new-products" className="text-sm font-medium hover:text-brand-brown transition-colors">
              {tNav('newProducts')}
            </Link>
            <Link href="/quotation" className="text-sm font-medium hover:text-brand-brown transition-colors">
              {tNav('quotation')}
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <Link href="/products" className="text-sm font-medium hover:text-brand-brown transition-colors">
                {tNav('products')}
              </Link>
              {megaMenuOpen && <MegaMenu />}
            </div>
            <Link href="/fabric-sourcing" className="text-sm font-medium hover:text-brand-brown transition-colors">
              {tNav('sourcing')}
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-brand-brown transition-colors">
              {tNav('about')}
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-brand-brown transition-colors">
              {tNav('contact')}
            </Link>
            <Link href="/cart" className="text-sm font-medium hover:text-brand-brown transition-colors relative">
              <div className="flex items-center gap-1">
                <ShoppingCart className="h-4 w-4" />
                {tNav('cart')}
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-brand-brown text-white text-xs flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </Link>
          </nav>

          {/* 右侧：搜索 */}
          <div className="flex items-center space-x-2">
            {/* 搜索按钮 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              <span className="sr-only">{tHeader('search')}</span>
            </Button>
          </div>
        </div>

        {/* 搜索框展开区域 */}
        {searchOpen && (
          <div className="py-4 border-t">
            <form action="/products" method="get" className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="search"
                  name="q"
                  placeholder={tHeader('searchPlaceholder')}
                  className="w-full pr-10"
                  autoFocus
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* 移动端导航抽屉 */}
      <MobileNav open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}

