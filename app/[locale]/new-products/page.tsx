import { getTranslations } from "next-intl/server"
import { Metadata } from "next"
import NewProductsClient from "./client"

// 页面元数据 (支持多语言 SEO)
export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'NewProducts'});

  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  };
}

// 新品上线页面组件
export default function NewProductsPage() {
  return <NewProductsClient />
}
