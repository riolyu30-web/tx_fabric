import { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Zap, Package, Phone, Mail, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "代客找版服务 - 专业面料采购代理",
  description: "提供专业的面料采购代理服务，本地批发商资源，多年找布经验，中大市场面料齐全",
}

export default function FabricSourcingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 页面标题区 */}
      <div className="relative h-[400px] bg-brand-brown">
        <Image
          src="/images/sourcing/sc_1.jpg"
          alt="代客找版服务"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/80 to-brand-brown/60"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">代客找版服务</h1>
            <p className="text-xl max-w-2xl mx-auto">
              让专业的人帮您找到最合适的面料
            </p>
            <p className="mt-4 text-lg">
              省时 · 省力 · 省心 · 省钱
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* 第一部分：什么人需要代客找版 */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              哪些人需要代客找版？
            </h2>
            <p className="text-gray-600 text-lg">
              如果您是以下人群之一，我们的服务将为您节省大量时间和精力
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 人群1：外地客户 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-brand-brown">
              <CardContent className="p-8">
                <div className="bg-brand-brown/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <MapPin className="w-8 h-8 text-brand-brown" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900">
                  外地客户
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  您在外地经营服装生意，需要采购面料，但来广州中大市场一趟成本高、时间紧？
                </p>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-brand-brown mr-2">✓</span>
                    <span>节省往返差旅费用</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-brown mr-2">✓</span>
                    <span>不用请假耽误生意</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-brown mr-2">✓</span>
                    <span>避免人生地不熟被坑</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 人群2：新手创业者 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-brand-brown">
              <CardContent className="p-8">
                <div className="bg-brand-brown/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-8 h-8 text-brand-brown" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900">
                  新手创业者
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  刚开始做服装，对面料市场不熟悉，不知道哪里能找到合适的布料？
                </p>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-brand-brown mr-2">✓</span>
                    <span>避免走弯路浪费时间</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-brown mr-2">✓</span>
                    <span>获得专业采购建议</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-brown mr-2">✓</span>
                    <span>快速找到性价比高的面料</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 人群3：时间紧急的客户 */}
            <Card className="hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-brand-brown">
              <CardContent className="p-8">
                <div className="bg-brand-brown/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Zap className="w-8 h-8 text-brand-brown" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900">
                  赶时间的客户
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  订单急着出货，需要马上找到合适的面料，自己找太慢来不及？
                </p>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-brand-brown mr-2">✓</span>
                    <span>当天发布需求次日反馈</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-brown mr-2">✓</span>
                    <span>同时对接多家供应商</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-brown mr-2">✓</span>
                    <span>不耽误您的订单交期</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 第二部分：为什么选择我们 */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              为什么选择我们？
            </h2>
            <p className="text-gray-600 text-lg">
              我们的优势让您的采购更省心、更省钱
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 优势1：价格更低 */}
            <div className="relative">
              <Card className="h-full bg-gradient-to-br from-green-50 to-white hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="absolute -top-4 left-8 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    比别人低
                  </div>
                  <div className="mt-8 mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-4xl">💰</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
                    本地批发商资源
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    我们长期与广州中大市场数十家一手批发商保持紧密合作关系，拿货价格比散客低10%-20%。
                  </p>
                  <div className="bg-green-50 rounded-lg p-4 mt-4">
                    <p className="text-sm text-gray-700 font-medium mb-2">真实案例：</p>
                    <p className="text-sm text-gray-600">
                      天丝面料市场价¥6.5/米，我们的批发商价格¥5.2/米，一次采购500米就能省650元！
                    </p>
                  </div>
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <Image
                      src="/images/sourcing/s_1.jpg"
                      alt="本地批发商资源"
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 优势2：速度更快 */}
            <div className="relative">
              <Card className="h-full bg-gradient-to-br from-blue-50 to-white hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="absolute -top-4 left-8 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    比别人快
                  </div>
                  <div className="mt-8 mb-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-4xl">⚡</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
                    多年找布经验
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    我们团队从事面料采购已有8年经验，熟悉中大市场每个楼层的布料分类，能快速定位您需要的面料。
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 mt-4">
                    <p className="text-sm text-gray-700 font-medium mb-2">服务速度：</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 今天提交需求，明天给结果</li>
                      <li>• 平均2小时找到3-5个选择</li>
                      <li>• 比自己跑市场节省3-5天</li>
                    </ul>
                  </div>
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <Image
                      src="/images/sourcing/s_2.jpg"
                      alt="本地批发商资源"
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 优势3：选择更多 */}
            <div className="relative">
              <Card className="h-full bg-gradient-to-br from-purple-50 to-white hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="absolute -top-4 left-8 bg-purple-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    比别人多
                  </div>
                  <div className="mt-8 mb-6">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-4xl">📦</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
                    中大市场资源齐全
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    中大布料市场是全国最大的面料批发市场，汇集了5000+档口、10万+款面料，我们能帮您找到最合适的那一款。
                  </p>
                  <div className="bg-purple-50 rounded-lg p-4 mt-4">
                    <p className="text-sm text-gray-700 font-medium mb-2">面料品类：</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-white px-3 py-1 rounded-full text-gray-700">天丝</span>
                      <span className="bg-white px-3 py-1 rounded-full text-gray-700">棉布</span>
                      <span className="bg-white px-3 py-1 rounded-full text-gray-700">麻布</span>
                      <span className="bg-white px-3 py-1 rounded-full text-gray-700">真丝</span>
                      <span className="bg-white px-3 py-1 rounded-full text-gray-700">化纤</span>
                      <span className="bg-white px-3 py-1 rounded-full text-gray-700">针织</span>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <Image
                      src="/images/sourcing/s_3.jpg"
                      alt="本地批发商资源"
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 第三部分：如何开始 */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              如何开始使用服务？
            </h2>
            <p className="text-gray-600 text-lg">
              两种方式，选择最方便的那一种
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 方式1：微信/电话联系 */}
            <Card className="bg-gradient-to-br from-brand-brown/5 to-white hover:shadow-2xl transition-all duration-300 border-2 border-brand-brown/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-brand-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-12 h-12 text-brand-brown" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">方式一：直接联系</h3>
                  <p className="text-gray-600 mt-2">最快捷的方式，实时沟通</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center mb-2">
                      <Phone className="w-5 h-5 text-brand-brown mr-2" />
                      <span className="font-bold text-gray-900">电话咨询</span>
                    </div>
                    <p className="text-2xl font-bold text-brand-brown ml-7">
                      185-2058-3992
                    </p>
                    <p className="text-sm text-gray-500 ml-7 mt-1">
                      工作时间：9:00-23:00
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      </svg>
                      <span className="font-bold text-gray-900">微信咨询</span>
                    </div>
                    <p className="text-xl font-bold text-green-600 ml-7">
                      ababa288
                    </p>
                    <p className="text-sm text-gray-500 ml-7 mt-1">
                      添加时请备注：找版
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-brand-brown/10 rounded-lg p-4">
                  <p className="text-sm text-gray-700 font-medium mb-2">
                    📋 请告诉我们：
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 您需要什么类型的面料（如：天丝、棉布等）</li>
                    <li>• 大概的幅宽、克重要求</li>
                    <li>• 需要的数量（大货或打版）</li>
                    <li>• 其他特殊要求（如：颜色、手感等）</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 方式2：邮寄样品 */}
            <Card className="bg-gradient-to-br from-brand-brown/5 to-white hover:shadow-2xl transition-all duration-300 border-2 border-brand-brown/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-brand-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-12 h-12 text-brand-brown" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">方式二：邮寄样品</h3>
                  <p className="text-gray-600 mt-2">有样品？寄给我们更精准</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4">
                  <div className="flex items-start mb-3">
                    <MapPin className="w-5 h-5 text-brand-brown mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-gray-900 block mb-2">邮寄地址</span>
                      <p className="text-gray-700 leading-relaxed">
                        广州长江(中国)轻纺城北区富一楼一横街H024-026、HT101-108<br/>
                        卡卡（收）<br/>
                        电话：185-2058-3992
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-brown/10 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 font-medium mb-2">
                    📝 请在包裹中附上纸条，写明：
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 您的姓名和联系方式</li>
                    <li>• 需要找的面料类型（如果有样品）</li>
                    <li>• 大概需要的数量</li>
                    <li>• 预算范围（可选）</li>
                    <li>• 交期要求</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-900 mb-2">
                    💡 温馨提示
                  </p>
                  <p className="text-sm text-blue-700">
                    收到样品后，我们会在24小时内联系您，提供3-5个相似面料选择及报价，让您对比挑选。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 服务流程说明 */}
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-center mb-6 text-gray-900">
                  📌 服务流程（通常2-3天完成）
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex-1 text-center">
                    <div className="w-12 h-12 bg-brand-brown text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                      1
                    </div>
                    <p className="font-medium text-gray-900">提交需求</p>
                    <p className="text-sm text-gray-600 mt-1">电话/微信/邮寄</p>
                  </div>
                  <div className="text-gray-400 hidden md:block">→</div>
                  <div className="flex-1 text-center">
                    <div className="w-12 h-12 bg-brand-brown text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                      2
                    </div>
                    <p className="font-medium text-gray-900">市场寻找</p>
                    <p className="text-sm text-gray-600 mt-1">1-2天内完成</p>
                  </div>
                  <div className="text-gray-400 hidden md:block">→</div>
                  <div className="flex-1 text-center">
                    <div className="w-12 h-12 bg-brand-brown text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                      3
                    </div>
                    <p className="font-medium text-gray-900">反馈结果</p>
                    <p className="text-sm text-gray-600 mt-1">提供多个选择</p>
                  </div>
                  <div className="text-gray-400 hidden md:block">→</div>
                  <div className="flex-1 text-center">
                    <div className="w-12 h-12 bg-brand-brown text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                      4
                    </div>
                    <p className="font-medium text-gray-900">确认下单</p>
                    <p className="text-sm text-gray-600 mt-1">满意后采购</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA 区域 */}
        <div className="mt-16 text-center bg-gradient-to-r from-brand-brown to-brand-brown/80 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            还在为找面料发愁？
          </h2>
          <p className="text-xl mb-8 text-brand-brown/90">
            让我们帮您省时、省力、省钱！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-brand-brown hover:bg-gray-100 text-lg px-8 py-6"
            >
              <Phone className="mr-2 h-5 w-5" />
              立即电话咨询
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              添加微信咨询
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

