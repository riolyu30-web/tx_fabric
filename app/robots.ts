import { MetadataRoute } from 'next';

// 导出一个默认函数，Next.js 会自动将其识别为 robots.txt 生成器
export default function robots(): MetadataRoute.Robots {
  // 定义网站的基础 URL，优先使用环境变量，否则使用默认域名
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tx-fabric.com';

  return {
    // 定义爬虫规则
    rules: {
      // 允许所有的搜索引擎爬虫 (User-Agent: *)
      userAgent: '*',
      // 允许抓取整个网站的内容
      allow: '/',
      // 拒绝抓取私有或不需要被索引的目录 (例如后台 API、管理页面或用户私有页面)
      // 根据您的项目结构，可以按需添加，这里暂时禁止抓取 /api/
      disallow: ['/api/'],
    },
    // 指定 Sitemap 的绝对路径，帮助搜索引擎快速发现网站的所有页面
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}