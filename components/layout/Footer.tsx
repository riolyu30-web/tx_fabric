import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

// 页脚组件
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 关于我们 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">关于 TX Fabric</h3>
            <p className="text-sm text-gray-600 mb-4">
              我们致力于为缝纫爱好者和专业设计师提供高品质面料，精选全球优质材料，支持可持续发展。
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
            <h3 className="font-semibold text-gray-900 mb-4">选购面料</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?tags=New" className="text-gray-600 hover:text-brand-brown transition-colors">
                  新品上架
                </Link>
              </li>
              <li>
                <Link href="/products?category=woven" className="text-gray-600 hover:text-brand-brown transition-colors">
                  机织布
                </Link>
              </li>
              <li>
                <Link href="/products?category=knit" className="text-gray-600 hover:text-brand-brown transition-colors">
                  针织布
                </Link>
              </li>
              <li>
                <Link href="/products?category=print" className="text-gray-600 hover:text-brand-brown transition-colors">
                  印花布
                </Link>
              </li>
              <li>
                <Link href="/products?tags=Sale" className="text-gray-600 hover:text-brand-brown transition-colors">
                  促销商品
                </Link>
              </li>
            </ul>
          </div>

          {/* 客户服务 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">客户服务</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-brand-brown transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-brand-brown transition-colors">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-brand-brown transition-colors">
                  配送信息
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-brand-brown transition-colors">
                  退换货政策
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-brand-brown transition-colors">
                  常见问题
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系信息 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">联系我们</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>电话：1-800-TX-FABRIC</li>
              <li>邮箱：hello@txfabric.com</li>
              <li>地址：123 Fabric Street</li>
              <li>Vancouver, BC V6B 1A1</li>
              <li>Canada</li>
            </ul>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} TX Fabric. 保留所有权利。
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-brand-brown transition-colors">
              隐私政策
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/terms" className="text-gray-500 hover:text-brand-brown transition-colors">
              服务条款
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/accessibility" className="text-gray-500 hover:text-brand-brown transition-colors">
              无障碍声明
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

