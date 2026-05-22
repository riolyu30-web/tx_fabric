import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // 这对应于 [locale] 动态路由段
  let locale = await requestLocale;
  
  // 确保使用有效的语言代码
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // 动态加载对应语言的字典文件
    messages: (await import(`../messages/${locale}.json`)).default
  };
});