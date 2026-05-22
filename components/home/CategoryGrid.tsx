import Link from "next/link"
import Image from "next/image"
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
        <h2 className="text-3xl font-bold mb-8">按类型选购</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow aspect-[16/9]">
                {/* 图片 */}
                <Image
                  src={category.image || "/placeholder.png"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* 覆盖层 */}
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-colors flex items-center justify-center p-4">
                  <h3 className="text-white text-2xl font-bold text-center">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

