import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}