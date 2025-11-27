"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// 关于我们页面客户端组件
export default function AboutClient() {
  const [aboutImages, setAboutImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // 加载关于我们图片
  useEffect(() => {
    const fetchAboutImages = async () => {
      try {
        const response = await fetch("/api/about-images")
        if (response.ok) {
          const data = await response.json()
          setAboutImages(data.images)
        }
      } catch (error) {
        console.error("加载关于我们图片失败:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutImages()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero区域 - 使用第一张图片作为背景 */}
      <section className="relative h-[400px] bg-gray-900">
        {aboutImages.length > 0 ? (
          <Image
            src={aboutImages[0]}
            alt="关于 千千纺织"
            fill
            className="object-cover opacity-50"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/20 to-brand-brown/40"></div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">关于 千千纺织</h1>
            <p className="text-xl">优质面料，源于热爱</p>
          </div>
        </div>
      </section>

      {/* 我们的故事 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">我们的故事</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                千千纺织 创立于 2020 年，源于创始人对优质面料和可持续时尚的热爱。
                作为一群热爱缝纫和手工艺的设计师，我们深知找到合适的面料对于创作的重要性。
              </p>
              <p>
                我们的使命是为每一位缝纫爱好者、专业设计师和手工艺人提供精心挑选的高品质面料。
                从欧洲的有机棉到日本的精致丝绸，从意大利的奢华羊毛到天然的亚麻和竹纤维，
                我们的每一匹布料都经过严格筛选，确保质量、触感和可持续性达到最高标准。
              </p>
              <p>
                我们相信，优质的面料是创作的基础，而可持续的选择是对地球的责任。
                这就是为什么我们致力于提供有机、环保的面料选择，支持负责任的生产方式。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 图片展示区域 */}
      {aboutImages.length > 1 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">我们的工厂与产品</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {aboutImages.slice(1, 7).map((image, index) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={image}
                    alt={`千千纺织 - 图片 ${index + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 我们的价值观 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">我们的价值观</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-brown text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">品质至上</h3>
              <p className="text-gray-600">
                我们只选择最优质的面料，每一匹布都经过严格的质量检验，
                确保您收到的是值得信赖的产品。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-brown text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">可持续发展</h3>
              <p className="text-gray-600">
                我们致力于推广有机、环保的面料，支持负责任的生产方式，
                为地球的未来贡献力量。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-brown text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">客户至上</h3>
              <p className="text-gray-600">
                您的满意是我们最大的动力。我们提供专业的建议、快速的配送
                和完善的售后服务。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 数据统计 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-brown mb-2">1000+</div>
              <div className="text-gray-600">优质面料</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-brown mb-2">50+</div>
              <div className="text-gray-600">合作供应商</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-brown mb-2">10K+</div>
              <div className="text-gray-600">满意客户</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-brown mb-2">100%</div>
              <div className="text-gray-600">品质保证</div>
            </div>
          </div>
        </div>
      </section>

    

      {/* 联系方式 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">联系我们</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-4">随时为您服务</h3>
                <p className="text-gray-600 mb-6">
                  如有任何关于面料、订单或服务的疑问，欢迎随时联系我们。
                  我们的专业团队将竭诚为您提供帮助。
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="w-10 h-10 bg-brand-brown text-white rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">手机号码</p>
                      <p className="text-lg font-medium">18520583992</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="w-10 h-10 bg-brand-brown text-white rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">微信客服</p>
                      <p className="text-lg font-medium">扫码添加微信</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-48 h-48 bg-white p-2 rounded-lg shadow-lg">
                  <Image
                    src="/images/wx_1.jpg"
                    alt="微信二维码"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-brown text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">准备好开始您的创作了吗？</h2>
          <p className="text-xl mb-8 opacity-90">探索我们精选的高品质面料系列</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/products">开始选购</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}