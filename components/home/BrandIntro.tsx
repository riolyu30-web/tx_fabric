import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// 品牌介绍区块组件
export default function BrandIntro() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 左侧：图片 */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1558769132-cb1aea26d29b?w=800&h=600&fit=crop"
              alt="关于 TX Fabric"
              fill
              className="object-cover"
            />
          </div>

          {/* 右侧：文字内容 */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">我们的故事</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              TX Fabric 创立于 2020 年，源于对优质面料和可持续时尚的热爱。
              我们致力于为缝纫爱好者、设计师和手工艺人提供精心挑选的高品质面料。
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              我们的面料来自世界各地的优质供应商，包括欧洲的有机棉、日本的精致丝绸、
              以及意大利的奢华羊毛。每一匹布料都经过我们的精心挑选，
              确保质量、触感和可持续性达到最高标准。
            </p>
            
            {/* 特色亮点 */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="border-l-4 border-brand-brown pl-4">
                <div className="text-2xl font-bold text-brand-brown">1000+</div>
                <div className="text-sm text-gray-600">优质面料</div>
              </div>
              <div className="border-l-4 border-brand-brown pl-4">
                <div className="text-2xl font-bold text-brand-brown">50+</div>
                <div className="text-sm text-gray-600">合作供应商</div>
              </div>
              <div className="border-l-4 border-brand-brown pl-4">
                <div className="text-2xl font-bold text-brand-brown">10K+</div>
                <div className="text-sm text-gray-600">满意客户</div>
              </div>
              <div className="border-l-4 border-brand-brown pl-4">
                <div className="text-2xl font-bold text-brand-brown">100%</div>
                <div className="text-sm text-gray-600">品质保证</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/about">了解更多</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">开始选购</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

