import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, CartItem } from '@/types'
import { calculateProductDisplayPrices } from '@/lib/config/pricing'

// 购物车状态接口
interface CartState {
  items: CartItem[] // 购物车商品列表
  addItem: (product: Product, quantity: number) => void // 添加商品
  removeItem: (productId: string) => void // 删除商品
  updateQuantity: (productId: string, quantity: number) => void // 更新数量
  clearCart: () => void // 清空购物车
  getTotalPrice: () => number // 获取总价
}

// 创建购物车状态管理
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // 添加商品到购物车
      addItem: (product, quantity) => {
        const items = get().items
        const existingItem = items.find(item => item.product.id === product.id)

        if (existingItem) {
          // 如果商品已存在，更新数量
          set({
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          })
        } else {
          // 如果商品不存在，添加新商品
          set({
            items: [...items, { product, quantity, addedAt: new Date().toISOString() }],
          })
        }
      },

      // 从购物车删除商品
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.product.id !== productId),
        })
      },

      // 更新商品数量
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set({
          items: get().items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })
      },

      // 清空购物车
      clearCart: () => {
        set({ items: [] })
      },

      // 计算总价（使用计算后的足米价）
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          // 计算显示价格
          const displayPrices = calculateProductDisplayPrices(item.product)
          // 使用促销价或计算后的显示价格
          const price = item.product.salePrice || displayPrices.whitePrice || displayPrices.basePrice
          return total + price * item.quantity
        }, 0)
      },
    }),
    {
      name: 'tx-fabric-cart', // localStorage key
    }
  )
)

