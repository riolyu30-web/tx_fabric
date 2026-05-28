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
            <Button size="lg" variant="outline" className="bg-white text-brand-brown hover:bg-gray-100 font-semibold" asChild>
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
          <div className="max-w-2xl mx-auto grid grid-cols-1 gap-6">
            <Card className="border-2 border-brand-brown/20 hover:border-brand-brown transition-colors">
              <CardContent className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <WhatsAppIcon className="h-8 w-8 text-brand-brown" />
                    <h3 className="text-xl font-bold">WhatsApp</h3>
                  </div>
                  <p className="text-sm text-gray-500">{t('workTime')}</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-3xl font-extrabold text-brand-brown tracking-wide drop-shadow-sm">+86 185-2058-3992</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-brand-brown/20 hover:border-brand-brown transition-colors">
              <CardContent className="p-8 flex flex-col items-center gap-6">
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <WeChatIcon className="h-8 w-8 text-brand-brown" />
                      <h3 className="text-xl font-bold">{t('wechatConsult')}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{t('wechatDesc')}</p>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-3xl font-extrabold text-brand-brown tracking-wide drop-shadow-sm">ababa288</p>
                  </div>
                </div>
                <div className="relative w-96 h-96 border border-gray-200 p-2 rounded-lg bg-white shadow-sm mt-4">
                  <Image
                    src="/images/wx_1.jpg"
                    alt="客服微信二维码"
                    fill
                    className="object-contain p-2"
                  />
                </div>
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

function WhatsAppIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  )
}

function WeChatIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.477 2 2 5.932 2 10.785c0 2.825 1.583 5.342 4.024 6.966-.233.864-.842 2.456-.867 2.525-.034.095.05.18.136.136.084-.044 2.82-1.488 3.528-1.895A11.08 11.08 0 0 0 12 19.57c5.523 0 10-3.932 10-8.785C22 5.932 17.523 2 12 2zm-3.5 6.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm7 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" />
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
