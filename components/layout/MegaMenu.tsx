import Link from "next/link"
import categories from "@/data/categories.json"

// 大型下拉菜单组件
export default function MegaMenu() {
  // 面料类型分类
  const fabricTypes = [
    { name: "机织布", slug: "woven", description: "经典机织面料" },
    { name: "针织布", slug: "knit", description: "弹性舒适" },
    { name: "印花布", slug: "print", description: "精美图案" },
    { name: "牛仔布", slug: "denim", description: "耐用经典" },
    { name: "灯芯绒", slug: "corduroy", description: "复古温暖" },
    { name: "外套面料", slug: "coating", description: "厚实保暖" },
  ]

  // 面料成分分类
  const fabricContents = [
    { name: "棉", slug: "Cotton" },
    { name: "亚麻", slug: "Linen" },
    { name: "丝绸", slug: "Silk" },
    { name: "羊毛", slug: "Wool" },
    { name: "天丝", slug: "Tencel" },
    { name: "Modal", slug: "Modal" },
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

