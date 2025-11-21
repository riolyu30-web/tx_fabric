import Link from "next/link"
import { Category } from "@/types"

// 分类网格组件
interface CategoryGridProps {
  categories: Category[] // 分类列表
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  // 分类图标映射（使用渐变背景色）
  const categoryColors: Record<string, string> = {
    woven: "from-blue-400 to-blue-600",
    knit: "from-purple-400 to-purple-600",
    print: "from-pink-400 to-pink-600",
    denim: "from-indigo-400 to-indigo-600",
    corduroy: "from-amber-400 to-amber-600",
    coating: "from-gray-400 to-gray-600",
    lining: "from-teal-400 to-teal-600",
    "sweater-knit": "from-rose-400 to-rose-600",
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">按类型选购</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                {/* 渐变背景 */}
                <div
                  className={`h-40 bg-gradient-to-br ${
                    categoryColors[category.slug] || "from-gray-400 to-gray-600"
                  } flex items-center justify-center relative overflow-hidden`}
                >
                  {/* 装饰图案 */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                  </div>
                  
                  {/* 分类名称 */}
                  <span className="relative text-white text-2xl font-bold z-10">
                    {category.name}
                  </span>
                </div>
                
                {/* 分类描述 */}
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-600 group-hover:text-brand-brown transition-colors">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

