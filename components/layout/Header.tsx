"use client"

import Link from "next/link"
import Image from "next/image" // 引入 Next.js 的图片组件
import { useState } from "react"
import { Menu, Search, ShoppingCart, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MobileNav from "./MobileNav"
import { useCartStore } from "@/lib/store/cart"
// 导入 next-intl 的 useLocale 和 useTranslations 钩子
import { useLocale, useTranslations } from "next-intl"
// 导入 i18n 路由中的 usePathname 和 useRouter 钩子
import { usePathname, useRouter } from "@/i18n/routing"

// 顶部导航栏组件
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // 移动端菜单状态
  const [searchOpen, setSearchOpen] = useState(false) // 搜索框状态
  
  const { items } = useCartStore() // 获取购物车商品数量
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  const locale = useLocale() // 获取当前语言
  const router = useRouter() // 获取路由对象
  const pathname = usePathname() // 获取当前路径
  
  const tNav = useTranslations('Common.nav');
  const tHeader = useTranslations('Common.header');

  // 处理语言切换事件
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 获取用户选择的下一个语言代码
    const nextLocale = e.target.value
    // 使用 router.replace 切换语言并保持当前路径
    router.replace(pathname, { locale: nextLocale })
  }

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
            <Link href="/products" className="text-sm font-medium hover:text-brand-brown transition-colors">
              {tNav('products')}
            </Link>
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

          {/* 右侧：功能区 */}
          <div className="flex items-center space-x-2">
            {/* 语言切换器容器 */}
            <div className="flex items-center mr-2">
              {/* 地球图标 */}
              <Globe className="h-4 w-4 mr-1 text-gray-600" />
              {/* 下拉选择框 */}
              <select
                // 绑定当前语言值
                value={locale}
                // 绑定 onChange 事件
                onChange={handleLanguageChange}
                // 设置样式，去除默认边框和背景
                className="bg-transparent text-sm font-medium outline-none cursor-pointer hover:text-brand-brown transition-colors border-none focus:ring-0"
              >
                {/* 中文选项 */}
                <option value="zh">中文</option>
                {/* 英文选项 */}
                <option value="en">English</option>
              {/* 结束下拉选择框 */}
              </select>
            {/* 结束语言切换器容器 */}
            </div>

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

