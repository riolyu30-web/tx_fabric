import HeroCarousel from "@/components/home/HeroCarousel"
import CategoryGrid from "@/components/home/CategoryGrid"
import FeaturedSection from "@/components/home/FeaturedSection"
import BrandIntro from "@/components/home/BrandIntro"
import ImageSequencePlayer from "@/components/home/ImageSequencePlayer"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Product, Banner, Category } from "@/types"
import { getTranslations, getLocale } from 'next-intl/server'
import fs from 'fs'
import path from 'path'

// 补充缺失的图标组件
function WhatsAppIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  )
}

function WeChatIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.477 2 2 5.932 2 10.785c0 2.825 1.583 5.342 4.024 6.966-.233.864-.842 2.456-.867 2.525-.034.095.05.18.136.136.084-.044 2.82-1.488 3.528-1.895A11.08 11.08 0 0 0 12 19.57c5.523 0 10-3.932 10-8.785C22 5.932 17.523 2 12 2zm-3.5 6.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm7 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" />
    </svg>
  )
}

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

  // 读取工厂图片
  const getFactoryImages = (dirName: string) => {
    try {
      const dirPath = path.join(process.cwd(), 'public', 'videos', dirName);
      if (!fs.existsSync(dirPath)) return [];
      const files = fs.readdirSync(dirPath);
      return files
        .filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg'))
        .sort() // 按序号小到大排序
        .map(f => `/videos/${dirName}/${f}`);
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const video1Images = getFactoryImages('video1');
  const video2Images = getFactoryImages('video2');
  const video3Images = getFactoryImages('video3');

  const th = await getTranslations('HomePage'); // 获取 HomePage 命名空间的翻译

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

      {/* 我的工厂 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{th('factoryTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ImageSequencePlayer images={video1Images} interval={1000} title={th('factoryProduction')} />
            <ImageSequencePlayer images={video2Images} interval={1000} title={th('factoryInspection')} />
            <ImageSequencePlayer images={video3Images} interval={1000} title={th('factoryLogistics')} />
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{th('contactTitle')}</h2>
          <div className="max-w-2xl mx-auto grid grid-cols-1 gap-6">
            <Card className="border-2 border-brand-brown/20 hover:border-brand-brown transition-colors">
              <CardContent className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <WhatsAppIcon className="h-8 w-8 text-brand-brown" />
                    <h3 className="text-xl font-bold">WhatsApp</h3>
                  </div>
                  <p className="text-sm text-gray-500">{th('workTime')}</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-3xl font-extrabold text-brand-brown tracking-wide drop-shadow-sm">+86 185-2058-3992</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-brand-brown/20 hover:border-brand-brown transition-colors">
              <CardContent className="p-8 flex flex-col items-center gap-6">
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <WeChatIcon className="h-8 w-8 text-brand-brown" />
                      <h3 className="text-xl font-bold">{th('wechatConsult')}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{th('wechatDesc')}</p>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-3xl font-extrabold text-brand-brown tracking-wide drop-shadow-sm">ababa288</p>
                  </div>
                </div>
                <div className="relative w-96 h-96 border border-gray-200 p-2 rounded-lg bg-white shadow-sm mt-4">
                  <Image
                    src="/images/wx_1.jpg"
                    alt="客服微信二维码"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}