import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import zhCategories from "@/data/locales/zh/categories.json"
import enCategories from "@/data/locales/en/categories.json"
import { useLocale, useTranslations } from "next-intl"

// 页脚组件
export default function Footer() {
  const currentYear = new Date().getFullYear()
  const locale = useLocale()
  const t = useTranslations('Common')
  
  // 使用对应语言的分类数据
  const categories = locale === 'zh' ? zhCategories : enCategories
  const fabricTypes = categories.map(c => ({
    name: c.name,
    slug: c.slug
  }))

  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 关于我们 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t('footer.aboutTitle')}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {t('footer.aboutDesc')}
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-brand-brown transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-brand-brown transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-brand-brown transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* 选购面料 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t('nav.products')}</h3>
            <ul className="space-y-2 text-sm">
              {fabricTypes.map((type) => (
                <li key={type.slug}>
                  <Link
                    href={`/products?category=${type.slug}`}
                    className="text-gray-600 hover:text-brand-brown transition-colors"
                  >
                    {type.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 客户服务 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t('footer.customerService')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-brand-brown transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-brand-brown transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-brand-brown transition-colors">
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-brand-brown transition-colors">
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-brand-brown transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系信息 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t('footer.contactTitle')}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>{t('footer.contactPhone')}</li>
              <li>{t('footer.contactEmail')}</li>
              <li>{t('footer.contactAddress1')}</li>
              <li>{t('footer.contactAddress2')}</li>
              <li>{t('footer.contactCity')}</li>
            </ul>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-brand-brown transition-colors">
              {t('footer.privacy')}
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/terms" className="text-gray-500 hover:text-brand-brown transition-colors">
              {t('footer.terms')}
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/accessibility" className="text-gray-500 hover:text-brand-brown transition-colors">
              {t('footer.accessibility')}
            </Link>
          </div>

          {/* ICP备案信息 */}
          <div className="mt-4 text-xs text-gray-500">
            <a 
              href="https://beian.miit.gov.cn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-brand-brown transition-colors"
            >
              粤ICP备2025493637号
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

