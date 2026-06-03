import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // 支持的语言列表
  locales: ['en', 'zh', 'vi'],
  
  // 默认语言
  defaultLocale: 'zh',
  
  // 仅在默认语言时不在URL中显示前缀 (例如: /zh/about -> /about)
  localePrefix: 'as-needed'
});

// 导出类型安全的路由API，后续在组件中跳转使用这些而不是next/navigation
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);