import HeroCarousel from "@/components/home/HeroCarousel"
import CategoryGrid from "@/components/home/CategoryGrid"
import FeaturedSection from "@/components/home/FeaturedSection"
import BrandIntro from "@/components/home/BrandIntro"
import { Product, Banner, Category } from "@/types"
import { getTranslations, getLocale } from 'next-intl/server'

// 首页
export default async function Home() {
  const t = await getTranslations('Common'); // 获取通用翻译
  const locale = await getLocale(); // 获取当前语言环境
  
  // 动态导入当前语言对应的 banner 数据
  const bannersModule = await import(`@/data/locales/${locale}/banners.json`);
  const banners = bannersModule.default;
  
  // 动态导入当前语言对应的 categories 数据
  const categoriesModule = await import(`@/data/locales/${locale}/categories.json`);
  const categories = categoriesModule.default;

  // 动态导入当前语言对应的 products 数据
  const productsModule = await import(`@/data/locales/${locale}/products.json`);
  const products = productsModule.default;
  
  // 类型断言
  const typedBanners = banners as Banner[] // 断言为 Banner 类型数组
  const typedCategories = categories as Category[] // 断言为 Category 类型数组
  const typedProducts = products as Product[] // 断言为 Product 类型数组

  // 获取精选商品（featured = true，并且有货）
  const featuredProducts = typedProducts.filter(p => p.featured && p.inStock).slice(0, 8)
  
  // 获取新品（按创建时间排序，并且有货）
  const newProducts = typedProducts
    .filter(p => p.inStock)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 8)
  
  // 获取促销商品（并且有货）
  const saleProducts = typedProducts.filter(p => p.salePrice && p.inStock).slice(0, 8)

  return (
    <div className="min-h-screen">
      {/* 翻译测试展示区域 */}
      <div className="bg-brand-brown text-white text-center py-2 text-sm font-medium">
        多语言测试: {t('title')} - {t('description')}
      </div>

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