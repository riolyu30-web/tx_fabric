// 导入 Next.js 的 MetadataRoute 类型定义
import { MetadataRoute } from 'next';
// 导入中文环境的产品数据作为数据源，产品 ID 多语言通用
import products from '@/data/locales/zh/products.json';
// 导入国际化路由配置，获取支持的语言列表
import { routing } from '@/i18n/routing';

// 定义网站的基础 URL，优先使用环境变量，否则使用默认域名
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.miyafab.com';

// 导出一个默认函数，Next.js 会自动将其识别为 sitemap 生成器
export default function sitemap(): MetadataRoute.Sitemap {
  // 从路由配置中解构出支持的语言列表 (locales) 和默认语言 (defaultLocale)
  const { locales, defaultLocale } = routing;

  // 定义一个内部函数，用于根据路径和语言生成对应的完整 URL
  const getUrl = (path: string, locale: string) => {
    // 如果当前语言是默认语言，因为配置了 'as-needed'，不需要语言前缀
    if (locale === defaultLocale) {
      // 直接返回基础 URL 拼接页面路径
      return `${baseUrl}${path}`;
    }
    // 如果是其他语言（如英文），则返回带语言前缀的完整 URL
    return `${baseUrl}/${locale}${path}`;
  };

  // 定义一个辅助函数，用于生成页面在所有支持语言下的备用链接 (alternates)
  const getAlternates = (path: string) => {
    // 初始化一个字典对象，用于存储语言代码到对应 URL 的映射
    const languages: Record<string, string> = {};
    // 遍历所有支持的语言
    locales.forEach((locale) => {
      // 将每种语言的完整 URL 记录到字典中
      languages[locale] = getUrl(path, locale);
    });
    // 返回符合 Next.js sitemap 规范的 alternates 对象
    return { languages };
  };

  // 定义需要被搜索引擎抓取的所有静态页面路由路径
  const staticPaths = [
    // 首页路径
    '',
    // 关于我们页面
    '/about',
    // 产品列表页面
    '/products',
    // 新品展示页面
    '/new-products',
    // 找版服务页面
    '/fabric-sourcing',
    // 报价单页面
    '/quotation',
    // 联系我们页面
    '/contact',
  ];

  // 初始化一个空数组，用于存放最终所有的 sitemap 节点配置
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 第一层循环：遍历所有支持的语言（如 zh, en），为每种语言生成独立的 URL 节点
  locales.forEach((locale) => {
    // 第二层循环：遍历所有的静态页面路径
    staticPaths.forEach((route) => {
      // 将生成的静态页面 sitemap 节点推入数组
      sitemapEntries.push({
        // 设置该节点在当前语言下的访问 URL (作为 <loc> 标签)
        url: getUrl(route, locale),
        // 设置最后修改时间为当前时间
        lastModified: new Date(),
        // 设置该页面的更改频率为每天，并断言为特定的字面量类型
        changeFrequency: 'daily' as const,
        // 权重配置：首页最高为 1.0，其他静态页面为 0.8
        priority: route === '' ? 1 : 0.8,
        // 添加所有语言版本的备用链接，生成 hreflang 标签
        alternates: getAlternates(route),
      });
    });

    // 遍历所有的产品数据，为每种语言生成对应的产品详情页动态路由节点
    products.forEach((product) => {
      // 拼接当前产品的具体路径
      const route = `/products/${product.id}`;
      // 将生成的产品详情页 sitemap 节点推入数组
      sitemapEntries.push({
        // 设置该产品在当前语言下的访问 URL
        url: getUrl(route, locale),
        // 如果产品数据中包含更新时间则使用，否则默认使用当前时间
        lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
        // 产品页的更改频率相对较低，设置为每周
        changeFrequency: 'weekly' as const,
        // 产品页的权重配置为 0.6
        priority: 0.6,
        // 添加该产品所有语言版本的备用链接，生成 hreflang 标签
        alternates: getAlternates(route),
      });
    });
  });

  // 返回组装好的包含所有语言、所有页面路径的完整 sitemap 数组
  return sitemapEntries;
}