import HeroCarousel from "@/components/home/HeroCarousel"
import CategoryGrid from "@/components/home/CategoryGrid"
import FeaturedSection from "@/components/home/FeaturedSection"
import BrandIntro from "@/components/home/BrandIntro"
import banners from "@/data/banners.json"
import categories from "@/data/categories.json"
import products from "@/data/products.json"
import { Product, Banner, Category } from "@/types"

// 首页
export default function Home() {
  // 类型断言
  const typedBanners = banners as Banner[]
  const typedCategories = categories as Category[]
  const typedProducts = products as Product[]

  // 获取精选商品（featured = true）
  const featuredProducts = typedProducts.filter(p => p.featured).slice(0, 8)
  
  // 获取新品（按创建时间排序）
  const newProducts = typedProducts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8)
  
  // 获取促销商品
  const saleProducts = typedProducts.filter(p => p.salePrice).slice(0, 8)

  return (
    <div className="min-h-screen">
      {/* Hero轮播图 */}
      <HeroCarousel banners={typedBanners} />

      {/* 分类网格 */}
      <CategoryGrid categories={typedCategories} />

      {/* 精选商品 */}
      {featuredProducts.length > 0 && (
        <FeaturedSection
          title="精选推荐"
          products={featuredProducts}
          viewAllLink="/products?featured=true"
        />
      )}

      {/* 新品上架 */}
      {newProducts.length > 0 && (
        <FeaturedSection
          title="新品上架"
          products={newProducts}
          viewAllLink="/products?tags=New"
        />
      )}

      {/* 品牌介绍 */}
      <BrandIntro />

      {/* 促销商品 */}
      {saleProducts.length > 0 && (
        <div className="bg-gray-50">
          <FeaturedSection
            title="限时优惠"
            products={saleProducts}
            viewAllLink="/products?tags=Sale"
          />
        </div>
      )}
    </div>
  );
}

