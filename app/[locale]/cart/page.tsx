"use client" // 声明为客户端组件

import { useState } from "react" // 引入 useState 钩子
import Link from "next/link" // 引入 Next.js 路由链接
import Image from "next/image" // 引入 Next.js 图片组件
import { Trash2, ShoppingBag, CheckCircle2, X } from "lucide-react" // 引入图标组件
import { Button } from "@/components/ui/button" // 引入按钮组件
import { Card, CardContent } from "@/components/ui/card" // 引入卡片组件
import { Input } from "@/components/ui/input" // 引入输入框组件
import { useCartStore } from "@/lib/store/cart" // 引入购物车状态管理
import { formatPrice, getPrimaryImage } from "@/lib/utils" // 引入工具函数
import { calculateProductDisplayPrices } from "@/lib/config/pricing" // 引入价格计算配置
import { useLocale, useTranslations } from "next-intl" // 引入国际化语言获取钩子

// 购物车页面
export default function CartPage() {
  // 获取当前语言环境
  const locale = useLocale()
  const t = useTranslations("CartPage")
  // 从状态管理中解构购物车数据和方法
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore() // 购物车状态和方法

  // 定义国家/地区输入框状态
  const [country, setCountry] = useState("")
  // 定义联系方式输入框状态
  const [contact, setContact] = useState("")
  // 定义表单提交加载状态
  const [isSubmitting, setIsSubmitting] = useState(false)
  // 定义成功提示弹窗显示状态
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  // 定义表单校验错误状态
  const [formErrors, setFormErrors] = useState({ country: false, contact: false })

  // 计算购物车商品总价
  const totalPrice = getTotalPrice() // 总价
  // 根据总价计算运费（满150免邮费，否则15）
  const shippingCost = totalPrice >= 150 ? 0 : 15 // 运费
  // 计算包含运费的最终总价
  const finalTotal = totalPrice + shippingCost // 最终总价

  // 处理结算提交逻辑
  const handleCheckout = async () => {
    // 定义错误对象检查必填项
    const errors = {
      // 判断国家地区是否为空格或空字符串
      country: !country.trim(),
      // 判断联系方式是否为空格或空字符串
      contact: !contact.trim()
    }
    // 更新表单错误状态以触发页面提示
    setFormErrors(errors)

    // 如果任意必填项为空则中断提交
    if (errors.country || errors.contact) {
      // 直接返回退出函数
      return
    }

    // 设置状态为正在提交，防止重复点击
    setIsSubmitting(true)

    // 开始执行异步请求
    try {
      // 遍历购物车商品并提取所需信息
      const orderDetails = items.map(item => 
        // 拼接商品名称、编号与数量
        `${item.product.name} (编号: ${item.product.id}, 数量: ${item.quantity}米)`
      // 使用分号将所有商品信息合并为一个字符串
      ).join('; ')

      // 组装要提交的留资数据对象
      const leadData = {
        // 设置留资记录类型为订单
        type: "order", 
        // 传入填写的国家地区
        country,
        // 传入填写的联系方式
        contact,
        // 将商品明细写入数量字段
        quantity: orderDetails, 
        // 在附带信息中加入总价数据
        message: `${t("summary.total")} ${formatPrice(finalTotal, locale)}` 
      }

      // 发起 POST 请求至留资 API 接口
      const response = await fetch('/api/leads', {
        // 设置 HTTP 方法为 POST
        method: 'POST',
        // 配置请求头
        headers: {
          // 声明请求体数据格式为 JSON
          'Content-Type': 'application/json',
        },
        // 将留资数据序列化为 JSON 字符串
        body: JSON.stringify(leadData),
      })

      // 判断接口是否响应成功
      if (response.ok) {
        // 提交成功后显示弹窗
        setShowSuccessModal(true) 
      // 接口响应非成功状态
      } else {
        // 在控制台打印错误信息
        console.error("订单提交失败")
      }
    // 捕获网络异常等错误
    } catch (error) {
      // 在控制台打印异常详情
      console.error("提交异常:", error)
    // 无论成功失败最后都会执行
    } finally {
      // 恢复提交按钮状态
      setIsSubmitting(false)
    }
  }

  // 处理关闭弹窗并清空购物车
  const handleCloseModal = () => {
    // 隐藏成功提示弹窗
    setShowSuccessModal(false)
    // 调用全局方法清空购物车数据
    clearCart() 
  }

  // 如果购物车为空
  if (items.length === 0) {
    // 返回空购物车界面结构
    return (
      // 外层容器，居中布局
      <div className="container mx-auto px-4 py-16">
        {/* 内容容器，限制最大宽度并文本居中 */}
        <div className="max-w-md mx-auto text-center">
          {/* 显示购物袋图标 */}
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          {/* 空状态主标题 */}
          <h1 className="text-3xl font-bold mb-4">{t("empty.title")}</h1>
          {/* 空状态副标题描述 */}
          <p className="text-gray-600 mb-8">
            {t("empty.desc")}
          </p>
          {/* 引导选购按钮 */}
          <Button size="lg" asChild>
            {/* 链接至商品列表页 */}
            <Link href="/products">{t("empty.button")}</Link>
          </Button>
        </div>
      </div>
    )
  }

  // 购物车非空时返回主界面结构
  return (
    // 页面主容器，设置内边距和相对定位（为弹窗做准备）
    <div className="container mx-auto px-4 py-8 relative">
      {/* 页面标题栏区域 */}
      <div className="flex items-center justify-between mb-8">
        {/* 主标题文本 */}
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        {/* 清空购物车按钮 */}
        <Button variant="outline" onClick={clearCart}>
          {t("clear")}
        </Button>
      </div>

      {/* 页面主体网格布局，大屏分3列 */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* 左侧商品列表区域，占据2列 */}
        <div className="lg:col-span-2 space-y-4">
          {/* 遍历渲染购物车中的每个商品 */}
          {items.map((item) => {
            // 获取商品的计算显示价格
            const displayPrices = calculateProductDisplayPrices(item.product)
            // 确定最终使用的单价（促销价优先）
            const price = item.product.salePrice || displayPrices.whitePrice || displayPrices.basePrice
            // 计算当前商品的小计金额
            const itemTotal = price * item.quantity

            // 返回单个商品卡片结构
            return (
              // 使用商品ID作为列表键值
              <Card key={item.product.id}>
                {/* 卡片内容区域设置内边距 */}
                <CardContent className="p-6">
                  {/* 商品信息水平排列容器 */}
                  <div className="flex gap-6">
                    {/* 商品图片链接容器 */}
                    <Link
                      // 链接到商品详情页
                      href={`/products/${item.product.slug}`}
                      // 设置图片容器样式，固定大小并隐藏溢出
                      className="relative w-32 h-32 flex-shrink-0 rounded overflow-hidden"
                    >
                      {/* 渲染商品主图 */}
                      <Image
                        // 获取首图URL
                        src={getPrimaryImage(item.product.images)}
                        // 图片替代文本
                        alt={item.product.name}
                        // 填充父容器
                        fill
                        // 设置封面模式并添加悬浮缩放动画
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </Link>

                    {/* 商品文本信息区域，占据剩余空间 */}
                    <div className="flex-1">
                      {/* 商品名称链接 */}
                      <Link
                        // 链接到商品详情页
                        href={`/products/${item.product.slug}`}
                        // 鼠标悬浮颜色变化
                        className="block hover:text-brand-brown transition-colors mb-2"
                      >
                        {/* 商品名称文本 */}
                        <h3 className="font-semibold text-lg">
                          {item.product.name}
                        </h3>
                      </Link>
                      {/* 商品规格描述 */}
                      <p className="text-sm text-gray-600 mb-3">
                        {/* 拼接成分和百分比信息 */}
                        {item.product.content.map(c => `${c.name}${c.percentage}%`).join(" · ")} | {t("item.width")}{" "}
                        {/* 拼接宽度信息 */}
                        {item.product.width}cm
                      </p>

                      {/* 价格展示区域 */}
                      <div className="flex items-baseline gap-2 mb-4">
                        {/* 如果存在促销价 */}
                        {item.product.salePrice ? (
                          // 显示促销价和划线原价
                          <>
                            {/* 红色强调促销价 */}
                            <span className="text-xl font-bold text-red-600">
                              {/* 格式化促销价 */}
                              {formatPrice(item.product.salePrice, locale)}
                            </span>
                            {/* 灰色划线显示原价 */}
                            <span className="text-sm text-gray-500 line-through">
                              {/* 格式化原价 */}
                              {formatPrice(displayPrices.basePrice, locale)}
                            </span>
                          </>
                        // 如果没有促销价
                        ) : (
                          // 直接显示正常价格
                          <span className="text-xl font-bold">
                            {/* 格式化当前价格 */}
                            {formatPrice(price, locale)}
                          </span>
                        )}
                        {/* 计价单位文本 */}
                        <span className="text-sm text-gray-500">/{t("item.meter")}</span>
                      </div>

                      {/* 数量调节和小计区域 */}
                      <div className="flex items-center justify-between">
                        {/* 数量调节控件容器 */}
                        <div className="flex items-center gap-3">
                          {/* 数量标签文本 */}
                          <span className="text-sm text-gray-600">{t("item.quantity")}</span>
                          {/* 减少数量按钮 */}
                          <Button
                            // 按钮样式为轮廓
                            variant="outline"
                            // 按钮尺寸为图标大小
                            size="icon"
                            // 自定义按钮宽高
                            className="h-8 w-8"
                            // 点击时触发减少数量方法
                            onClick={() =>
                              // 更新数量，最小值为0.5
                              updateQuantity(
                                // 传入商品ID
                                item.product.id,
                                // 计算新数量，步长为0.5
                                Math.max(0.5, item.quantity - 0.5)
                              )
                            }
                          >
                            -
                          </Button>
                          {/* 当前数量显示文本 */}
                          <span className="w-16 text-center font-medium">
                            {item.quantity} {t("item.meter")}
                          </span>
                          {/* 增加数量按钮 */}
                          <Button
                            // 按钮样式为轮廓
                            variant="outline"
                            // 按钮尺寸为图标大小
                            size="icon"
                            // 自定义按钮宽高
                            className="h-8 w-8"
                            // 点击时触发增加数量方法
                            onClick={() =>
                              // 增加数量，步长为0.5
                              updateQuantity(item.product.id, item.quantity + 0.5)
                            }
                          >
                            +
                          </Button>
                        </div>

                        {/* 小计金额展示区域 */}
                        <div className="text-right">
                          {/* 小计标签文本 */}
                          <p className="text-sm text-gray-600 mb-1">{t("item.subtotal")}</p>
                          {/* 小计金额文本 */}
                          <p className="text-xl font-bold">
                            {/* 格式化商品小计金额 */}
                            {formatPrice(itemTotal, locale)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 删除商品按钮 */}
                    <Button
                      // 幽灵按钮样式
                      variant="ghost"
                      // 图标大小
                      size="icon"
                      // 点击时触发移除商品方法
                      onClick={() => removeItem(item.product.id)}
                    >
                      {/* 垃圾桶图标 */}
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 右侧订单摘要区域，占据1列 */}
        <div className="lg:col-span-1">
          {/* 吸顶卡片容器 */}
          <Card className="sticky top-20">
            {/* 卡片内容区域 */}
            <CardContent className="p-6 space-y-4">
              {/* 订单摘要标题 */}
              <h2 className="text-xl font-bold mb-4">{t("summary.title")}</h2>

              {/* 商品总价展示行 */}
              <div className="flex justify-between text-base">
                {/* 总价标签 */}
                <span className="text-gray-600">{t("summary.itemsTotal")}</span>
                {/* 格式化总价文本 */}
                <span className="font-medium">{formatPrice(totalPrice, locale)}</span>
              </div>

              {/* 运费展示行 */}
              <div className="flex justify-between text-base">
                {/* 运费标签 */}
                <span className="text-gray-600">{t("summary.shipping")}</span>
                {/* 运费文本展示 */}
                <span className="font-medium">
                  {/* 判断是否免运费 */}
                  {shippingCost === 0 ? (
                    // 绿色显示免费文本
                    <span className="text-green-600">{t("summary.free")}</span>
                  ) : (
                    // 否则格式化运费金额
                    formatPrice(shippingCost, locale)
                  )}
                </span>
              </div>

              {/* 总计金额分割线及展示 */}
              <div className="border-t pt-4">
                {/* 粗体字展示总计金额行 */}
                <div className="flex justify-between text-xl font-bold">
                  {/* 总计标签 */}
                  <span>{t("summary.total")}</span>
                  {/* 格式化最终总价文本 */}
                  <span>{formatPrice(finalTotal, locale)}</span>
                </div>
              </div>

              {/* 配送提示信息框 */}
              <div className="bg-gray-50 p-4 rounded-lg text-sm mb-4">
                {/* 判断总价是否满足免邮条件 */}
                {totalPrice >= 150 ? (
                  // 满足条件时显示绿色提示语
                  <p className="text-green-600">
                    {t("summary.freeShippingTip")}
                  </p>
                ) : (
                  // 不满足时提示差额
                  <p className="text-gray-600">
                    {/* 计算差额并格式化 */}
                    {t("summary.buyMore")} {formatPrice(150 - totalPrice, locale)} {t("summary.enjoyFreeShipping")}
                  </p>
                )}
              </div>

              {/* 客户信息输入表单区域 */}
              <div className="border-t pt-4 space-y-4">
                {/* 国家地区输入容器 */}
                <div className="space-y-2">
                  {/* 国家地区标签 */}
                  <label className="text-sm font-medium">
                    {/* 标签文字 */}
                    {t("summary.country")} <span className="text-red-500">*</span>
                  </label>
                  {/* 国家地区输入框 */}
                  <Input 
                    // 占位符文本
                    placeholder={t("summary.countryPlaceholder")} 
                    // 绑定状态值
                    value={country}
                    // 监听输入变化
                    onChange={(e) => {
                      // 更新状态
                      setCountry(e.target.value)
                      // 输入内容后清除错误提示
                      if (e.target.value.trim()) setFormErrors(prev => ({ ...prev, country: false }))
                    }}
                    // 错误时边框变红
                    className={formErrors.country ? "border-red-500" : ""}
                  />
                  {/* 错误提示文字 */}
                  {formErrors.country && <p className="text-xs text-red-500">{t("summary.countryRequired")}</p>}
                </div>
                {/* 联系方式输入容器 */}
                <div className="space-y-2">
                  {/* 联系方式标签 */}
                  <label className="text-sm font-medium">
                    {/* 标签文字 */}
                    {t("summary.contact")} <span className="text-red-500">*</span>
                  </label>
                  {/* 联系方式输入框 */}
                  <Input 
                    // 占位符文本
                    placeholder={t("summary.contactPlaceholder")} 
                    // 绑定状态值
                    value={contact}
                    // 监听输入变化
                    onChange={(e) => {
                      // 更新状态
                      setContact(e.target.value)
                      // 输入内容后清除错误提示
                      if (e.target.value.trim()) setFormErrors(prev => ({ ...prev, contact: false }))
                    }}
                    // 错误时边框变红
                    className={formErrors.contact ? "border-red-500" : ""}
                  />
                  {/* 错误提示文字 */}
                  {formErrors.contact && <p className="text-xs text-red-500">{t("summary.contactRequired")}</p>}
                </div>
              </div>

              {/* 结算操作按钮 */}
              <Button 
                // 占满宽度并设置上边距
                className="w-full mt-2" 
                // 大号按钮尺寸
                size="lg"
                // 绑定结算点击事件
                onClick={handleCheckout}
                // 提交中时禁用按钮
                disabled={isSubmitting}
              >
                {/* 动态显示按钮文字 */}
                {isSubmitting ? t("summary.processing") : t("summary.checkout")}
              </Button>

              {/* 继续购物按钮 */}
              <Button variant="outline" className="w-full" asChild>
                {/* 链接至商品列表 */}
                <Link href="/products">{t("summary.continue")}</Link>
              </Button>

              {/* 服务保障等额外信息 */}
              <div className="border-t pt-4 space-y-2 text-xs text-gray-600">
                {/* 安全支付提示 */}
                <p>{t("guarantees.secure")}</p>
                {/* 退换货提示 */}
                <p>{t("guarantees.return")}</p>
                {/* 品质保证提示 */}
                <p>{t("guarantees.quality")}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 提交成功弹窗遮罩层 */}
      {showSuccessModal && (
        // 固定定位覆盖全屏，半透明黑色背景，居中显示内容
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          {/* 弹窗内容容器，带动画效果 */}
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative animate-in fade-in zoom-in duration-200">
            {/* 右上角关闭按钮 */}
            <Button 
              // 幽灵按钮样式
              variant="ghost" 
              // 图标尺寸
              size="icon" 
              // 绝对定位在右上角
              className="absolute right-4 top-4"
              // 点击触发关闭逻辑
              onClick={handleCloseModal}
            >
              {/* 关闭图标 */}
              <X className="h-4 w-4" />
            </Button>
            {/* 弹窗中心内容区域 */}
            <div className="text-center space-y-4">
              {/* 成功图标背景圆 */}
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                {/* 绿色对号图标 */}
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              {/* 弹窗标题 */}
              <h3 className="text-2xl font-bold text-gray-900">{t("successModal.title")}</h3>
              {/* 弹窗正文提示（商务风格） */}
              <div className="space-y-2 text-gray-600 text-sm leading-relaxed">
                {/* 感谢语 */}
                <p>{t("successModal.p1")}</p>
                {/* 服务跟进提示 */}
                <p>{t("successModal.p2")}</p>
              </div>
              {/* 底部确认按钮 */}
              <Button 
                // 占满宽度并增加上边距
                className="w-full mt-6" 
                // 点击触发关闭逻辑
                onClick={handleCloseModal}
              >
                {/* 按钮文字 */}
                {t("successModal.button")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
