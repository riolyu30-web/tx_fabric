import { Product } from "@/types"
import ProductCard from "./ProductCard"

// 商品网格组件
interface ProductGridProps {
  products: Product[] // 商品列表
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">暂无符合条件的商品</p>
        <p className="text-gray-400 text-sm mt-2">请尝试调整筛选条件</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

