import { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Zap, Package, Phone, Mail, MapPin } from "lucide-react"
import { getTranslations } from "next-intl/server"
import SourcingCarousel from "@/components/sourcing/SourcingCarousel"

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'FabricSourcing'});

  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  };
}

export default async function FabricSourcingPage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'FabricSourcing'});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 英雄区域 */}
      <section className="relative bg-brand-brown text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <Image
            src="/images/sourcing/s_1.jpg"
            alt="面料找版服务背景"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="container relative z-20 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('heroTitle')}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-brand-brown hover:bg-gray-100 font-semibold" asChild>
              <a href="#contact">{t('consultNow')}</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
              <a href="#process">{t('learnProcess')}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* 我们的优势 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t('whyChoose')}</h2>
            <div className="w-24 h-1 bg-brand-brown mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-brown/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-brand-brown" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('advantage1Title')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('advantage1Desc')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-brown/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-brand-brown" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('advantage2Title')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('advantage2Desc')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-brown/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-brand-brown" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('advantage3Title')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('advantage3Desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 服务范围 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('whatWeFind')}</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-semibold text-gray-900">{t('scope1Title')}</h4>
                    <p className="text-gray-600">{t('scope1Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-semibold text-gray-900">{t('scope2Title')}</h4>
                    <p className="text-gray-600">{t('scope2Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-semibold text-gray-900">{t('scope3Title')}</h4>
                    <p className="text-gray-600">{t('scope3Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-semibold text-gray-900">{t('scope4Title')}</h4>
                    <p className="text-gray-600">{t('scope4Desc')}</p>
                  </div>
                </li>
              </ul>
            </div>
            <SourcingCarousel />
          </div>
        </div>
      </section>

      {/* 服务流程 */}
      <section id="process" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">{t('processTitle')}</h2>
            <p className="mt-4 text-gray-600">{t('processSubtitle')}</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* 连接线 */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-brown/20 -translate-x-1/2"></div>
            
            <div className="space-y-12 relative">
              {/* 步骤 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 text-center md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-900">{t('step1Title')}</h3>
                  <p className="mt-2 text-gray-600">{t('step1Desc')}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-brown text-white font-bold flex items-center justify-center z-10 border-4 border-gray-50 shadow-md">
                  1
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-fit">
                    <Package className="h-8 w-8 text-brand-brown/60" />
                  </div>
                </div>
              </div>
              
              {/* 步骤 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:flex justify-end">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-fit">
                    <Search className="h-8 w-8 text-brand-brown/60" />
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-brown text-white font-bold flex items-center justify-center z-10 border-4 border-gray-50 shadow-md">
                  2
                </div>
                <div className="md:w-1/2 md:pl-12 text-center md:text-left mt-4 md:mt-0">
                  <h3 className="text-xl font-bold text-gray-900">{t('step2Title')}</h3>
                  <p className="mt-2 text-gray-600">{t('step2Desc')}</p>
                </div>
              </div>
              
              {/* 步骤 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 text-center md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-900">{t('step3Title')}</h3>
                  <p className="mt-2 text-gray-600">{t('step3Desc')}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-brown text-white font-bold flex items-center justify-center z-10 border-4 border-gray-50 shadow-md">
                  3
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-fit">
                    <Mail className="h-8 w-8 text-brand-brown/60" />
                  </div>
                </div>
              </div>
              
              {/* 步骤 4 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:flex justify-end">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-fit">
                    <CheckCircle className="h-8 w-8 text-brand-brown/60" />
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-brown text-white font-bold flex items-center justify-center z-10 border-4 border-gray-50 shadow-md">
                  4
                </div>
                <div className="md:w-1/2 md:pl-12 text-center md:text-left mt-4 md:mt-0">
                  <h3 className="text-xl font-bold text-gray-900">{t('step4Title')}</h3>
                  <p className="mt-2 text-gray-600">{t('step4Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 计费说明 */}
      <section className="py-16 bg-brand-brown/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-brand-brown text-white p-6 text-center">
              <h2 className="text-2xl font-bold">{t('feeTitle')}</h2>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 border-b pb-2">{t('fee1Title')}</h3>
                  <p className="text-gray-700">
                    {t.rich('fee1Desc', {
                      strong: (chunks) => <strong>{chunks}</strong>
                    })}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 border-b pb-2">{t('fee2Title')}</h3>
                  <p className="text-gray-700">
                    {t.rich('fee2Desc', {
                      strong: (chunks) => <strong>{chunks}</strong>
                    })}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <p className="text-sm text-orange-800 font-medium">
                    <span className="font-bold">{t('feeTipTitle')}</span> {t('feeTipDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 联系方式 / CTA */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('contactTitle')}</h2>
          <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-6">
            <Card className="border-2 border-brand-brown/20 hover:border-brand-brown transition-colors">
              <CardContent className="p-6">
                <Phone className="h-10 w-10 text-brand-brown mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{t('phoneConsult')}</h3>
                <p className="text-2xl font-bold text-gray-900">185-2058-3992</p>
                <p className="text-sm text-gray-500 mt-2">{t('workTime')}</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-brand-brown/20 hover:border-brand-brown transition-colors">
              <CardContent className="p-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/images/wx_1.jpg"
                    alt="客服微信"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold mb-1">{t('wechatConsult')}</h3>
                <p className="text-sm text-gray-600">{t('wechatDesc')}</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-left max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-brand-brown" /> {t('mailAddress')}
            </h4>
            <p className="text-gray-700 ml-7 leading-relaxed">
              {t.rich('addressDetail', {
                br: () => <br />
              })}
            </p>
            <p className="text-sm text-red-500 ml-7 mt-2">{t('mailTip')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

// 补充缺失的图标组件
function Search(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
