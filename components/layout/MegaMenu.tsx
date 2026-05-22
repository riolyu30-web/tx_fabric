import Link from "next/link"
import zhCategories from "@/data/locales/zh/categories.json"
import enCategories from "@/data/locales/en/categories.json"
import { useLocale } from "next-intl"

// 大型下拉菜单组件
export default function MegaMenu() {
  const locale = useLocale()
  const categories = locale === 'en' ? enCategories : zhCategories
  // 使用 data/categories.json 中的分类
  const fabricTypes = categories.map(c => ({
    name: c.name,
    slug: c.slug,
    description: c.description
  }))

  // 面料成分分类
  const fabricContents = [
    { name: "棉", slug: "棉" },
    { name: "亚麻", slug: "亚麻" },
    { name: "天丝", slug: "天丝" },
    { name: "涤纶", slug: "涤纶" },
    { name: "人棉", slug: "人棉" },
    { name: "锦纶", slug: "锦纶" },
    { name: "醋酸", slug: "醋酸" },
  ]

  // 精选分类
  const featured = [
    { name: "新品上架", slug: "tags=New" },
    { name: "促销商品", slug: "tags=Sale" },
    { name: "有机面料", slug: "tags=Organic" },
    { name: "独家款式", slug: "tags=Exclusive" },
    { name: "新手友好", slug: "tags=Beginner Friendly" },
  ]

  return (
    <div className="absolute left-0 top-full w-screen bg-white shadow-lg border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* 按面料类型 */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-4">按面料类型</h3>
            <ul className="space-y-3">
              {fabricTypes.map((type) => (
                <li key={type.slug}>
                  <Link
                    href={`/products?category=${type.slug}`}
                    className="block group"
                  >
                    <div className="text-sm font-medium text-gray-700 group-hover:text-brand-brown transition-colors">
                      {type.name}
                    </div>
                    <div className="text-xs text-gray-500">{type.description}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 按面料成分 */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-4">按面料成分</h3>
            <ul className="space-y-3">
              {fabricContents.map((content) => (
                <li key={content.slug}>
                  <Link
                    href={`/products?content=${content.slug}`}
                    className="text-sm text-gray-700 hover:text-brand-brown transition-colors"
                  >
                    {content.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 精选 */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-4">精选</h3>
            <ul className="space-y-3">
              {featured.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/products?${item.slug}`}
                    className="text-sm text-gray-700 hover:text-brand-brown transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 热门推荐（图片区域） */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-4">本月推荐</h3>
            <Link
              href="/products?tags=New"
              className="block group rounded-lg overflow-hidden"
            >
              <div className="aspect-square bg-gray-200 mb-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-brown/20 to-transparent group-hover:from-brand-brown/30 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white font-semibold">秋冬新品</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900 group-hover:text-brand-brown transition-colors">
                探索新品系列
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

