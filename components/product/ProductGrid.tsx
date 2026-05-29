import { Product } from "@/types"
import ProductCard from "./ProductCard"
import { useTranslations } from "next-intl"

// 商品网格组件
interface ProductGridProps {
  products: Product[] // 商品列表
}

export default function ProductGrid({ products }: ProductGridProps) {
  const t = useTranslations("ProductsPage")
  
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">{t("noProducts")}</p>
        <p className="text-gray-400 text-sm mt-2">{t("noProductsDesc")}</p>
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

