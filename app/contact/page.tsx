// 导入 React 库，用于构建用户界面
import React from 'react';
// 导入 Card 和 CardContent 组件，用于构建卡片式布局
import { Card, CardContent } from "@/components/ui/card";
// 导入 Phone, Package, MapPin 组件，用于显示图标
import { Phone, Package, MapPin } from "lucide-react";
import Image from "next/image";

// 定义联系我们页面组件
const ContactPage: React.FC = () => {
  // 返回页面的 JSX 结构
  return (
    // 页面容器，设置背景色、内边距和最小高度
    <div className="bg-gray-50 min-h-screen py-12 sm:py-16">
      {/* 主内容容器，设置最大宽度和居中 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题部分 */}
        <div className="text-center mb-12">
          {/* 主标题 */}
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            联系我们
          </h1>
          {/* 副标题 */}
          <p className="mt-4 text-lg text-gray-600">
            我们在这里为您服务。随时通过以下方式与我们联系。
          </p>
        </div>

        {/* 联系信息网格布局 */}
        <div className="grid md:grid-cols-2 gap-8">
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
                    添加时请备注：找版/咨询
                  </p>
                  <div className="ml-7 mt-4">
                    <Image 
                      src="/images/wx_1.jpg"
                      alt="微信二维码"
                      width={120}
                      height={120}
                      className="rounded-md shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-brand-brown/10 rounded-lg p-4">
                <p className="text-sm text-gray-700 font-medium mb-2">
                  📋 请告诉我们：
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 需要采购的面料型号（是否需要大货样）</li>
                    <li>• 大概需要的数量</li>
                    <li>• 预算范围（可选）</li>
                    <li>• 交期要求</li>
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
                  <li>• 您需要什么类型的面料（如：天丝、棉布等）</li>
                  <li>• 大概的幅宽、克重要求</li>
                  <li>• 需要的数量（大货或打版）</li>
                  <li>• 其他特殊要求（如：颜色、手感等）</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-900 mb-2">
                  💡 温馨提示
                </p>
                <p className="text-sm text-blue-700">
                  我司原则上不接收到付快递，所有到付件将无法签收。烦请安排寄付，并将运单号提供给我们，谢谢您的理解与配合。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// 导出页面组件
export default ContactPage;
