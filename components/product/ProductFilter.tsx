"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import categories from "@/data/categories.json"
import { FabricTypes, FabricContents, ProductTags } from "@/types"

// 商品筛选器组件
interface ProductFilterProps {
  selectedCategories: string[] // 已选分类
  selectedTypes: string[] // 已选面料类型
  selectedContents: string[] // 已选成分
  selectedTags: string[] // 已选标签
  onFilterChange: (filters: {
    categories?: string[]
    types?: string[]
    contents?: string[]
    tags?: string[]
  }) => void // 筛选变更回调
}

export default function ProductFilter({
  selectedCategories,
  selectedTypes,
  selectedContents,
  selectedTags,
  onFilterChange,
}: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState(true) // 筛选器展开状态

  // 切换分类筛选
  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]
    onFilterChange({ categories: newCategories })
  }

  // 切换面料类型筛选
  const toggleType = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type]
    onFilterChange({ types: newTypes })
  }

  // 切换成分筛选
  const toggleContent = (content: string) => {
    const newContents = selectedContents.includes(content)
      ? selectedContents.filter((c) => c !== content)
      : [...selectedContents, content]
    onFilterChange({ contents: newContents })
  }

  // 切换标签筛选
  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    onFilterChange({ tags: newTags })
  }

  // 清除所有筛选
  const clearAll = () => {
    onFilterChange({
      categories: [],
      types: [],
      contents: [],
      tags: [],
    })
  }

  // 计算已选筛选项数量
  const totalSelected =
    selectedCategories.length +
    selectedTypes.length +
    selectedContents.length +
    selectedTags.length

  return (
    <div className="bg-white rounded-lg border p-6 sticky top-20">
      {/* 筛选器头部 */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">筛选</h3>
        {totalSelected > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            清除全部
          </Button>
        )}
      </div>

      {/* 分类筛选 */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">按分类</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.slug)}
                onChange={() => toggleCategory(category.slug)}
                className="w-4 h-4 rounded border-gray-300 text-brand-brown focus:ring-brand-brown"
              />
              <span className="text-sm">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 面料类型筛选 */}
      <div className="mb-6 border-t pt-6">
        <h4 className="font-medium mb-3">按面料类型</h4>
        <div className="flex flex-wrap gap-2">
          {Object.values(FabricTypes).map((type) => (
            <Badge
              key={type}
              variant={selectedTypes.includes(type) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleType(type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {/* 成分筛选 */}
      <div className="mb-6 border-t pt-6">
        <h4 className="font-medium mb-3">按成分</h4>
        <div className="flex flex-wrap gap-2">
          {Object.values(FabricContents).map((content) => (
            <Badge
              key={content}
              variant={selectedContents.includes(content) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleContent(content)}
            >
              {content}
            </Badge>
          ))}
        </div>
      </div>

      {/* 标签筛选 */}
      <div className="border-t pt-6">
        <h4 className="font-medium mb-3">特殊标签</h4>
        <div className="space-y-2">
          {Object.values(ProductTags).map((tag) => (
            <label
              key={tag}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="w-4 h-4 rounded border-gray-300 text-brand-brown focus:ring-brand-brown"
              />
              <span className="text-sm">{tag}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

