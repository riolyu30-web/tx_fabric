// 面料成分接口
export interface FabricContent {
  name: string // 成分名称：Cotton/Tencel/Polyester等
  percentage: number // 百分比：0-100
}

// 商品接口
export interface Product {
  id: string // 商品唯一标识
  productNo: string // 产品编号（如：801#）
  name: string // 商品名称（品名名称）
  fullname: string // 产品全名
  slug: string // URL友好的标识
  description: string // 商品描述
  whitePrice: number // 白色价格（元/米）
  colorPrice: number // 彩色价格（元/米）
  samplePrice: number // 版布价格
  fullPrice: number // 足米价格
  salePrice?: number // 促销价格
  images: string[] // 图片URL数组
  category: string // 分类ID：tencel/embroidery/cotton
  type: string // 面料类型
  content: FabricContent[] // 面料成分数组
  tags: string[] // 标签：New/Sale/Deadstock/Exclusive
  inStock: boolean // 库存状态  没货前端不展示
  width: number // 面料宽度（厘米）
  weight: number // 克重（g/m²）
  metersPerKg?: number // 每公斤出米数
  empty: number // 空差
  keywords: string[] // 关键词
  colors: number // 颜色数量
  updatedAt: string // 更新时间
  featured: boolean // 是否为精选商品
}

// 分类接口
export interface Category {
  id: string // 分类唯一标识
  name: string // 分类名称
  slug: string // URL友好的标识
  parentId?: string // 父分类ID（用于二级分类）
  image?: string // 分类图片URL
  description?: string // 分类描述
  order: number // 排序顺序
}

// Banner横幅接口
export interface Banner {
  id: string // Banner唯一标识
  title: string // 标题
  subtitle?: string // 副标题
  image: string // 图片URL
  link?: string // 链接地址
  buttonText?: string // 按钮文字
  order: number // 显示顺序
}

// 购物车商品接口
export interface CartItem {
  product: Product // 商品信息
  quantity: number // 数量（米数）
  addedAt: string // 添加时间
}

// 筛选选项接口
export interface FilterOptions {
  categories?: string[] // 分类筛选
  fabricTypes?: string[] // 面料类型筛选
  contents?: string[] // 成分筛选
  priceRange?: {
    min: number // 最小价格
    max: number // 最大价格
  }
  tags?: string[] // 标签筛选
  inStock?: boolean // 仅显示有货
  searchQuery?: string // 搜索关键词
}

// 排序选项类型
export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name'

// 面料类型枚举
export const FabricTypes = {
  WOVEN: 'Woven', // 机织布
  KNIT: 'Knit', // 针织布
  PRINT: 'Print', // 印花布
  DENIM: 'Denim', // 牛仔布
  CORDUROY: 'Corduroy', // 灯芯绒
  COATING: 'Coating', // 外套面料
  LINING: 'Lining', // 里布
  SWEATER_KNIT: 'Sweater Knit', // 毛衣针织
} as const

// 面料成分枚举
export const FabricContents = {
  TENCEL: '天丝', // 天丝
  POLYESTER: '涤纶', // 涤纶
  SPANDEX: '氨纶', // 氨纶
  POLYESTER_FIBER: '聚酯纤维', // 聚酯纤维
  RAYON: '人棉', // 人棉
  COTTON: '棉', // 棉
  LINEN: '亚麻', // 亚麻
  NYLON: '锦纶', // 锦纶
  RAMIE: '苎麻', // 苎麻
  ACETATE: '醋酸', // 醋酸
} as const

// 商品标签枚举
export const ProductTags = {
  NEW: 'New', // 新品
  SALE: 'Sale', // 促销
  DEADSTOCK: 'Deadstock', // 死库存
  EXCLUSIVE: 'Exclusive', // 独家
  ORGANIC: 'Organic', // 有机
  BEGINNER_FRIENDLY: 'Beginner Friendly', // 新手友好
} as const

