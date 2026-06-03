"use client"

import { Suspense, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import ProductGrid from "@/components/product/ProductGrid"
import ProductFilter from "@/components/product/ProductFilter"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import zhProducts from "@/data/locales/zh/products.json"
import enProducts from "@/data/locales/en/products.json"
import { Product, SortOption } from "@/types"
import { useLocale, useTranslations } from "next-intl"

// 商品列表内容组件
function ProductsContent() {
  const locale = useLocale()
  const t = useTranslations("ProductsPage")
  const products = locale === 'zh' ? zhProducts : enProducts
  const searchParams = useSearchParams()
  const [showMobileFilter, setShowMobileFilter] = useState(false) // 移动端筛选器显示状态
  
  // 从URL参数初始化筛选状态
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "") // 搜索关键词
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",").filter(Boolean) || []
  )
  const [selectedTypes, setSelectedTypes] = useState<string[]>( // 面料类型状态
    searchParams.get("type")?.split(",").filter(Boolean) || [] // 从URL参数初始化面料类型
  )
  const [selectedContents, setSelectedContents] = useState<string[]>(
    searchParams.get("content")?.split(",").filter(Boolean) || []
  )
  const [sortBy, setSortBy] = useState<SortOption>("newest") // 排序方式

  // 类型断言
  const typedProducts = products as Product[]

  // 提取所有唯一成分用于筛选
  const availableContents = useMemo(() => {
    const contents = new Set<string>()
    typedProducts.forEach(p => {
      p.content?.forEach(c => {
        if (c.name) contents.add(c.name)
      })
    })
    return Array.from(contents).sort()
  }, [typedProducts])

  // 筛选和排序商品
  const filteredAndSortedProducts = useMemo(() => {
    // 首先过滤掉缺货产品
    let filtered = typedProducts.filter((p) => p.inStock)

    // 关键词搜索
    if (searchQuery) { // 如果有搜索关键词
      const query = searchQuery.toLowerCase() // 转换为小写
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) || // 匹配名称
          (p.fullname && p.fullname.toLowerCase().includes(query)) || // 匹配全名
          p.productNo.toLowerCase().includes(query) || // 匹配编号
          (p.keywords && p.keywords.some((k) => k.toLowerCase().includes(query))) // 匹配关键词
      )
    }

    // 按分类筛选
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category))
    }

    // 按面料类型筛选
    if (selectedTypes.length > 0) { // 如果有选中的类型
      filtered = filtered.filter((p) => selectedTypes.includes(p.type)) // 按类型过滤
    }

    // 按成分筛选
    if (selectedContents.length > 0) { // 如果有选中的成分
      filtered = filtered.filter((p) => // 过滤商品列表
        p.content?.some((c) => selectedContents.includes(c.name)) // 直接精准匹配名称
      )
    }

    // 排序
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() // 使用 updatedAt
        )
        break
      case "price-asc": // 价格升序
        filtered.sort((a, b) => { // 排序
          const priceA = a.salePrice || a.fullPrice // A的价格
          const priceB = b.salePrice || b.fullPrice // B的价格
          return priceA - priceB // 返回升序
        })
        break
      case "price-desc": // 价格降序
        filtered.sort((a, b) => { // 排序
          const priceA = a.salePrice || a.fullPrice // A的价格
          const priceB = b.salePrice || b.fullPrice // B的价格
          return priceB - priceA // 返回降序
        })
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name, "zh-CN"))
        break
    }

    return filtered
  }, [
    typedProducts,
    searchQuery,
    selectedCategories,
    selectedTypes,
    selectedContents,
    sortBy,
  ])

  // 筛选变更处理
  const handleFilterChange = (filters: {
    categories?: string[]
    types?: string[]
    contents?: string[]
  }) => {
    if (filters.categories !== undefined)
      setSelectedCategories(filters.categories)
    if (filters.types !== undefined) setSelectedTypes(filters.types)
    if (filters.contents !== undefined) setSelectedContents(filters.contents)

    // 更新URL参数以支持分享和刷新
    const params = new URLSearchParams(searchParams.toString())
    
    if (filters.categories?.length) {
      params.set("category", filters.categories.join(","))
    } else if (filters.categories !== undefined) {
      params.delete("category")
    }

    if (filters.types?.length) {
      params.set("type", filters.types.join(","))
    } else if (filters.types !== undefined) {
      params.delete("type")
    }

    if (filters.contents?.length) {
      params.set("content", filters.contents.join(","))
    } else if (filters.contents !== undefined) {
      params.delete("content")
    }

    window.history.pushState(null, '', `?${params.toString()}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题和排序 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-gray-600">
            {t("foundCount", { count: filteredAndSortedProducts.length })}
          </p>
        </div>

        {/* 排序选择 */}
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-brown"
          >
            <option value="newest">{t("sort.newest")}</option>
            <option value="price-asc">{t("sort.priceAsc")}</option>
            <option value="price-desc">{t("sort.priceDesc")}</option>
            <option value="name">{t("sort.name")}</option>
          </select>

          {/* 移动端筛选按钮 */}
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setShowMobileFilter(true)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {t("filter")}
          </Button>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* 左侧筛选器（桌面端） */}
        <div className="hidden lg:block">
          <ProductFilter
            selectedCategories={selectedCategories}
            selectedTypes={selectedTypes}
            selectedContents={selectedContents}
            availableContents={availableContents}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* 右侧商品网格 */}
        <div className="lg:col-span-3">
          <ProductGrid products={filteredAndSortedProducts} />
        </div>
      </div>

      {/* 移动端筛选器抽屉 */}
      {showMobileFilter && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowMobileFilter(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 overflow-y-auto lg:hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">{t("filter")}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileFilter(false)}
                >
                  {t("close")}
                </Button>
              </div>
              <ProductFilter
                selectedCategories={selectedCategories}
                selectedTypes={selectedTypes}
                selectedContents={selectedContents}
                availableContents={availableContents}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// 商品列表页面
export default function ProductsPage() {
  const t = useTranslations("ProductsPage")
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center">{t("loading")}</div>}>
      <ProductsContent />
    </Suspense>
  )
}