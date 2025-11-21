"use client"

import { useState, Fragment } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronDown, ChevronRight } from "lucide-react"
import products from "@/data/products.json"
import categories from "@/data/categories.json"
import { Product, Category } from "@/types"
import { calculateProductDisplayPrices } from "@/lib/config/pricing"

// 最新报价页面
export default function QuotationPage() {
  const [searchQuery, setSearchQuery] = useState("") // 搜索关键词
  const [selectedCategory, setSelectedCategory] = useState<string>("all") // 选中的分类
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set()) // 折叠的分类

  // 类型断言
  const typedProducts = products as Product[]
  const typedCategories = categories as Category[]

  // 筛选产品
  const filteredProducts = typedProducts.filter((product) => {
    // 分类筛选
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false
    }

    // 搜索筛选（按编号、名称、成分）
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesProductNo = product.productNo.toLowerCase().includes(query)
      const matchesName = product.name.toLowerCase().includes(query)
      const matchesContent = product.content.some(c => 
        c.name.toLowerCase().includes(query)
      )
      return matchesProductNo || matchesName || matchesContent
    }

    return true
  })

  // 按分类分组产品
  const groupedProducts = filteredProducts.reduce((groups, product) => {
    const category = product.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(product)
    return groups
  }, {} as Record<string, Product[]>)

  // 获取分类名称
  const getCategoryName = (categoryId: string) => {
    const category = typedCategories.find(c => c.id === categoryId)
    return category?.name || categoryId
  }

  // 切换分类折叠状态
  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId) // 如果已折叠，则展开
      } else {
        newSet.add(categoryId) // 如果已展开，则折叠
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">最新报价</h1>
          <p className="text-gray-600">实时更新的产品价格信息</p>
        </div>

        {/* 筛选工具栏 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* 搜索框 */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="搜索编号、品名或成分..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* 分类筛选 */}
              <div className="flex gap-2 flex-wrap">
                <Badge
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setSelectedCategory("all")}
                >
                  全部
                </Badge>
                {typedCategories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 报价表格 */}
        <Card>
          <CardHeader>
            <CardTitle>产品报价列表</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">编号</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">品名名称</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">幅宽</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">克重</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">成份</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">白色价格</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">彩色价格</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">版布价</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                        没有找到匹配的产品
                      </td>
                    </tr>
                  ) : (
                    // 按分类渲染产品
                    Object.entries(groupedProducts).map(([categoryId, categoryProducts]) => {
                      const isCollapsed = collapsedCategories.has(categoryId)
                      
                      return (
                        <Fragment key={`category-${categoryId}`}>
                          {/* 分类标题行（通栏，可点击折叠/展开） */}
                          <tr 
                            className="bg-brand-brown/5 hover:bg-brand-brown/10 cursor-pointer transition-colors"
                            onClick={() => toggleCategory(categoryId)}
                          >
                            <td colSpan={8} className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {/* 展开/折叠图标 */}
                                {isCollapsed ? (
                                  <ChevronRight className="h-4 w-4 text-brand-brown" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-brand-brown" />
                                )}
                                <span className="text-sm font-semibold text-brand-brown">
                                  {getCategoryName(categoryId)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  （共 {categoryProducts.length} 个产品）
                                </span>
                              </div>
                            </td>
                          </tr>
                          
                          {/* 该分类下的所有产品（根据折叠状态显示/隐藏） */}
                          {!isCollapsed && categoryProducts.map((product) => {
                          // 计算显示价格
                          const displayPrices = calculateProductDisplayPrices(product)
                          
                          return (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                              {/* 编号 */}
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {product.productNo}
                              </td>
                              
                              {/* 品名名称 */}
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {product.name}
                              </td>
                              
                              {/* 幅宽 */}
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {product.width}cm
                              </td>
                              
                              {/* 克重 */}
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {product.weight ? `${product.weight}g/m²` : "-"}
                              </td>
                              
                              {/* 成份 */}
                              <td className="px-4 py-3 text-sm text-gray-700">
                                <div className="max-w-xs">
                                  {product.content.map(c => `${c.name}${c.percentage}%`).join("、")}
                                </div>
                              </td>
                              
                              {/* 白色价格 */}
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {displayPrices.whitePrice ? (
                                  <span className="text-green-600">
                                    ¥{displayPrices.whitePrice.toFixed(2)}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              
                              {/* 彩色价格 */}
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {displayPrices.colorPrice ? (
                                  <span className="text-blue-600">
                                    ¥{displayPrices.colorPrice.toFixed(2)}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              
                              {/* 版布价 */}
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {displayPrices.samplePrice ? (
                                  <span className="text-orange-600">
                                    ¥{displayPrices.samplePrice.toFixed(2)}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </Fragment>
                    )})
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <div className="mt-6 text-sm text-gray-600 text-center">
          共 {filteredProducts.length} 个产品
        </div>
      </div>
    </div>
  )
}

