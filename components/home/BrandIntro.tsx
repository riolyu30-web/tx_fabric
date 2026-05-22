import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// 引入图标组件以优化列表展示
import { CheckCircle2 } from "lucide-react"
import { useTranslations } from "next-intl"

// 品牌介绍区块组件
export default function BrandIntro() {
  const t = useTranslations('BrandIntro')

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧：图片网格布局 */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 h-[400px] sm:h-[500px] lg:h-[600px]">
            {/* 左侧大图容器，跨两行 */}
            <div className="relative rounded-lg overflow-hidden row-span-2 shadow-sm hover:shadow-md transition-shadow">
              {/* 第一张图片 */}
              <Image
                src="/images/about01.png" // 图片路径
                alt={t("imageAlt.img1")} // 替代文本
                fill // 填充容器
                className="object-cover hover:scale-105 transition-transform duration-500" // 保持宽高比填充，悬浮放大效果
              />
            {/* 结束左侧大图容器 */}
            </div>
            {/* 右上小图容器 */}
            <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* 第二张图片 */}
              <Image
                src="/images/about02.png" // 图片路径
                alt={t("imageAlt.img2")} // 替代文本
                fill // 填充容器
                className="object-cover hover:scale-105 transition-transform duration-500" // 保持宽高比填充，悬浮放大效果
              />
            {/* 结束右上小图容器 */}
            </div>
            {/* 右下小图容器 */}
            <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* 第三张图片 */}
              <Image
                src="/images/about03.png" // 图片路径
                alt={t("imageAlt.img3")} // 替代文本
                fill // 填充容器
                className="object-cover hover:scale-105 transition-transform duration-500" // 保持宽高比填充，悬浮放大效果
              />
            {/* 结束右下小图容器 */}
            </div>
          {/* 结束左侧图片网格布局 */}
          </div>

          {/* 右侧文字内容容器 */}
          <div className="space-y-8">
            
            {/* 标题与副标题的包裹器 */}
            <div className="space-y-3">
              {/* 主标题 */}
              <h2 className="text-4xl font-bold text-gray-900">{t("title")}</h2>
              {/* 醒目的副标题（高亮品牌色） */}
              <p className="text-xl font-medium text-brand-brown">
                {/* 副标题文本 */}
                {t("subtitle")}
              </p>
            {/* 结束标题包裹器 */}
            </div>
            
            {/* 核心段落容器 */}
            <div className="text-gray-600 space-y-4">
              {/* 正文段落 */}
              <p className="leading-relaxed">
                {/* 文本内容 */}
                {t.rich('description', {
                  strong: (chunks) => <strong className="text-gray-900">{chunks}</strong>
                })}
              </p>
            {/* 结束段落容器 */}
            </div>

            {/* 优势列表卡片背景 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-4">
              {/* 卡片标题 */}
              <h3 className="text-lg font-bold text-gray-900">{t("whyChooseUs")}</h3>
              {/* 无序列表 */}
              <ul className="space-y-3">
                {/* 列表项 1 */}
                <li className="flex items-start">
                  {/* 对号图标 */}
                  <CheckCircle2 className="w-5 h-5 text-brand-brown mt-0.5 mr-3 flex-shrink-0" />
                  {/* 列表项文字 */}
                  <p className="text-gray-600 leading-relaxed">
                    {/* 小标题加粗 */}
                    <strong className="text-gray-900">{t("features.feature1Title")}</strong>
                    {/* 详情文本 */}
                    {t("features.feature1Desc")}
                  </p>
                {/* 结束列表项 1 */}
                </li>
                
                {/* 列表项 2 */}
                <li className="flex items-start">
                  {/* 对号图标 */}
                  <CheckCircle2 className="w-5 h-5 text-brand-brown mt-0.5 mr-3 flex-shrink-0" />
                  {/* 列表项文字 */}
                  <p className="text-gray-600 leading-relaxed">
                    {/* 小标题加粗 */}
                    <strong className="text-gray-900">{t("features.feature2Title")}</strong>
                    {/* 详情文本 */}
                    {t("features.feature2Desc")}
                  </p>
                {/* 结束列表项 2 */}
                </li>
                
                {/* 列表项 3 */}
                <li className="flex items-start">
                  {/* 对号图标 */}
                  <CheckCircle2 className="w-5 h-5 text-brand-brown mt-0.5 mr-3 flex-shrink-0" />
                  {/* 列表项文字 */}
                  <p className="text-gray-600 leading-relaxed">
                    {/* 小标题加粗 */}
                    <strong className="text-gray-900">{t("features.feature3Title")}</strong>
                    {/* 详情文本 */}
                    {t("features.feature3Desc")}
                  </p>
                {/* 结束列表项 3 */}
                </li>
              {/* 结束无序列表 */}
              </ul>
            {/* 结束优势列表卡片 */}
            </div>
            
            {/* 特色亮点 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-t border-gray-100 mt-4">
              {/* 数据项 1 */}
              <div className="border-l-4 border-brand-brown pl-4">
                {/* 数据 */}
                <div className="text-3xl font-bold text-brand-brown">1000+</div>
                {/* 描述 */}
                <div className="text-sm font-medium text-gray-600 mt-1">{t("stats.stat1")}</div>
              {/* 结束数据项 1 */}
              </div>
              {/* 数据项 2 */}
              <div className="border-l-4 border-brand-brown pl-4">
                {/* 数据 */}
                <div className="text-3xl font-bold text-brand-brown">50+</div>
                {/* 描述 */}
                <div className="text-sm font-medium text-gray-600 mt-1">{t("stats.stat2")}</div>
              {/* 结束数据项 2 */}
              </div>
              {/* 数据项 3 */}
              <div className="border-l-4 border-brand-brown pl-4">
                {/* 数据 */}
                <div className="text-3xl font-bold text-brand-brown">10K+</div>
                {/* 描述 */}
                <div className="text-sm font-medium text-gray-600 mt-1">{t("stats.stat3")}</div>
              {/* 结束数据项 3 */}
              </div>
              {/* 数据项 4 */}
              <div className="border-l-4 border-brand-brown pl-4">
                {/* 数据 */}
                <div className="text-3xl font-bold text-brand-brown">100%</div>
                {/* 描述 */}
                <div className="text-sm font-medium text-gray-600 mt-1">{t("stats.stat4")}</div>
              {/* 结束数据项 4 */}
              </div>
            {/* 结束特色亮点 */}
            </div>

            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/about">{t("buttons.learnMore")}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">{t("buttons.startShopping")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

