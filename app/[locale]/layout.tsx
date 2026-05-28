import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import type { Metadata } from "next";
import "./globals.css";

// 引入布局包装器组件，用于根据路由动态显示头部尾部
import LayoutWrapper from "@/components/layout/LayoutWrapper";

// 网站元数据
export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Layout'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    // 站点验证配置
    verification: {
      // 配置其他自定义验证
      other: {
        // 百度站点验证的meta标签内容
        'baidu-site-verification': 'codeva-uCNaaRZAUQ',
      },
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  
  // 提供所有翻译数据到客户端
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}