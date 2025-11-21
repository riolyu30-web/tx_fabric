"use client"

import { Suspense, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import ProductGrid from "@/components/product/ProductGrid"
import ProductFilter from "@/components/product/ProductFilter"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import products from "@/data/products.json"
import { Product, SortOption } from "@/types"

// 商品列表内容组件
function ProductsContent() {
  const searchParams = useSearchParams()
  const [showMobileFilter, setShowMobileFilter] = useState(false) // 移动端筛选器显示状态
  
  // 从URL参数初始化筛选状态
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",").filter(Boolean) || []
  )
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.get("fabricType")?.split(",").filter(Boolean) || []
  )
  const [selectedContents, setSelectedContents] = useState<string[]>(
    searchParams.get("content")?.split(",").filter(Boolean) || []
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || []
  )
  const [sortBy, setSortBy] = useState<SortOption>("newest") // 排序方式

  // 类型断言
  const typedProducts = products as Product[]

  // 筛选和排序商品
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...typedProducts]

    // 按分类筛选
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category))
    }

    // 按面料类型筛选
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((p) => selectedTypes.includes(p.fabricType))
    }

    // 按成分筛选
    if (selectedContents.length > 0) {
      filtered = filtered.filter((p) =>
        p.content.some((c) => selectedContents.includes(c.name))
      )
    }

    // 按标签筛选
    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) =>
        p.tags.some((t) => selectedTags.includes(t))
      )
    }

    // 排序
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      case "price-asc":
        filtered.sort((a, b) => {
          const priceA = a.salePrice || a.price
          const priceB = b.salePrice || b.price
          return priceA - priceB
        })
        break
      case "price-desc":
        filtered.sort((a, b) => {
          const priceA = a.salePrice || a.price
          const priceB = b.salePrice || b.price
          return priceB - priceA
        })
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name, "zh-CN"))
        break
    }

    return filtered
  }, [
    typedProducts,
    selectedCategories,
    selectedTypes,
    selectedContents,
    selectedTags,
    sortBy,
  ])

  // 筛选变更处理
  const handleFilterChange = (filters: {
    categories?: string[]
    types?: string[]
    contents?: string[]
    tags?: string[]
  }) => {
    if (filters.categories !== undefined)
      setSelectedCategories(filters.categories)
    if (filters.types !== undefined) setSelectedTypes(filters.types)
    if (filters.contents !== undefined) setSelectedContents(filters.contents)
    if (filters.tags !== undefined) setSelectedTags(filters.tags)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题和排序 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">全部商品</h1>
          <p className="text-gray-600">
            找到 {filteredAndSortedProducts.length} 件商品
          </p>
        </div>

        {/* 排序选择 */}
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-brown"
          >
            <option value="newest">最新上架</option>
            <option value="price-asc">价格从低到高</option>
            <option value="price-desc">价格从高到低</option>
            <option value="name">按名称排序</option>
          </select>

          {/* 移动端筛选按钮 */}
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setShowMobileFilter(true)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            筛选
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
            selectedTags={selectedTags}
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
                <h3 className="text-lg font-semibold">筛选</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileFilter(false)}
                >
                  关闭
                </Button>
              </div>
              <ProductFilter
                selectedCategories={selectedCategories}
                selectedTypes={selectedTypes}
                selectedContents={selectedContents}
                selectedTags={selectedTags}
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
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center">加载中...</div>}>
      <ProductsContent />
    </Suspense>
  )
}

