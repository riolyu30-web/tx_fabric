"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

// 关于我们页面客户端组件
export default function AboutClient() {
  const t = useTranslations("AboutClient")
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
        console.error(t("error"), error)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutImages()
  }, [t])

  return (
    <div className="min-h-screen">
      {/* Hero区域 - 使用第一张图片作为背景 */}
      <section className="relative h-[400px] bg-gray-900">
        {aboutImages.length > 0 ? (
          <Image
            src={aboutImages[0]}
            alt={t("hero.alt")}
            fill
            className="object-cover opacity-50"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/20 to-brand-brown/40"></div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{t("hero.title")}</h1>
            <p className="text-xl">{t("hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* 我们的故事 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 text-gray-700 leading-relaxed">
              {/* 引言 */}
              <div className="text-center px-4 md:px-12">
                <p className="text-xl md:text-2xl text-gray-800 font-medium leading-snug">
                  {t.rich("story.intro", {
                    years: 16,
                    span1: (chunks) => <span className="text-brand-brown font-bold text-3xl mx-1">{chunks}</span>,
                    br: () => <br className="md:hidden" />
                  })}
                </p>
              </div>

              {/* 主要内容双列 */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-brand-brown mr-2">✦</span> {t("story.craftsmanship.title")}
                  </h3>
                  <p className="text-gray-600 text-justify">
                    {t.rich("story.craftsmanship.desc", {
                      strong: (chunks) => <strong>{chunks}</strong>
                    })}
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-brand-brown mr-2">✦</span> {t("story.export.title")}
                  </h3>
                  <p className="text-gray-600 text-justify">
                    {t("story.export.desc")}
                  </p>
                </div>
              </div>

              {/* 使命与愿景 */}
              <div className="bg-brand-brown/5 rounded-2xl p-8 md:p-10 border-l-4 border-brand-brown relative overflow-hidden">
                <div className="absolute top-0 right-0 text-9xl text-brand-brown/10 -mt-8 -mr-8 font-serif">"</div>
                <div className="relative z-10">
                  <p className="text-lg md:text-xl text-gray-800 font-medium mb-4">
                    {t.rich("story.mission.title", {
                      br: () => <br className="hidden md:block" />,
                      span1: (chunks) => <span className="text-brand-brown">{chunks}</span>
                    })}
                  </p>
                  <p className="text-gray-600">
                    {t.rich("story.mission.desc", {
                      strong1: (chunks) => <strong className="text-gray-800">{chunks}</strong>
                    })}
                  </p>
                </div>
              </div>

              {/* 联合声明图片展示 */}
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold mb-8 text-gray-900">{t("story.auth.title")}</h3>
                <div className="grid md:grid-cols-2 gap-8 items-center justify-center">
                  <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                    <img 
                      src="/images/auth-cn.png" 
                      alt={t("story.auth.cnAlt")}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                    <img 
                      src="/images/auth-en.png" 
                      alt={t("story.auth.enAlt")}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 图片展示区域 */}
      {aboutImages.length > 1 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t("gallery.title")}</h2>
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
              {aboutImages.slice(1).map((image, index) => (
                <div 
                  key={index} 
                  className="relative rounded-lg overflow-hidden shadow-md mb-6 break-inside-avoid"
                >
                  <img
                    src={image}
                    alt={t("gallery.alt", { index: index + 2 })}
                    className="w-full h-auto block hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* 我们的核心优势 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t("advantages.title")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-xl font-semibold mb-3">{t("advantages.factory.title")}</h3>
              <p className="text-gray-600">
                {t("advantages.factory.desc")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">{t("advantages.fast.title")}</h3>
              <p className="text-gray-600">
                {t("advantages.fast.desc")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3">{t("advantages.color.title")}</h3>
              <p className="text-gray-600">
                {t("advantages.color.desc")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-3">{t("advantages.sourcing.title")}</h3>
              <p className="text-gray-600">
                {t("advantages.sourcing.desc")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-xl font-semibold mb-3">{t("advantages.compliance.title")}</h3>
              <p className="text-gray-600">
                {t("advantages.compliance.desc")}
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
              <div className="text-4xl font-bold text-brand-brown mb-2">300+</div>
              <div className="text-gray-600">{t("stats.fabrics")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-brown mb-2">3500+</div>
              <div className="text-gray-600">{t("stats.area")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-brown mb-2">400+</div>
              <div className="text-gray-600">{t("stats.clients")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-brown mb-2">100%</div>
              <div className="text-gray-600">{t("stats.quality")}</div>
            </div>
          </div>
        </div>
      </section>

    

      {/* 联系方式 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t("contact.title")}</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-4">{t("contact.subtitle")}</h3>
                <p className="text-gray-600 mb-6">
                  {t("contact.desc")}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="w-10 h-10 bg-brand-brown text-white rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t("contact.phone")}</p>
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
                      <p className="text-sm text-gray-500">{t("contact.wechat")}</p>
                      <p className="text-lg font-medium">{t("contact.scan")}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-48 h-48 bg-white p-2 rounded-lg shadow-lg">
                  <Image
                    src="/images/wx_1.jpg"
                    alt={t("contact.qrAlt")}
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
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-xl mb-8 opacity-90">{t("cta.desc")}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/products">{t("cta.button")}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}