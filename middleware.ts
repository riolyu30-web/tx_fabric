import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // 匹配所有路径 (跳过 api, _next, 以及带后缀的文件)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // 匹配根路径
    '/'
  ]
};