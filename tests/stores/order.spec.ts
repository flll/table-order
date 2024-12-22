import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useOrderStore } from '../order'
import type { MenuItem } from '../order'

describe('Order Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('State', () => {
    it('初期状態が正しい', () => {
      const store = useOrderStore()
      expect(store.cartItems).toEqual([])
      expect(store.activeOrders).toEqual([])
    })
  })

  describe('Getters', () => {
    it('cartTotal: カートの合計金額を正しく計算する', () => {
      const store = useOrderStore()
      const items: MenuItem[] = [
        { id: 1, name: '商品1', description: '説明1', price: 1000, image: 'image1.jpg' },
        { id: 2, name: '商品2', description: '説明2', price: 2000, image: 'image2.jpg' }
      ]
      
      store.addToCart(items[0])
      store.addToCart(items[1])
      store.updateQuantity(items[0].id, 2)

      expect(store.cartTotal).toBe(4000) // (1000 * 2) + (2000 * 1)
    })

    it('cartItemCount: カートのアイテム数を正しく計算する', () => {
      const store = useOrderStore()
      const item: MenuItem = { id: 1, name: '商品1', description: '説明1', price: 1000, image: 'image1.jpg' }
      
      store.addToCart(item)
      store.updateQuantity(item.id, 3)

      expect(store.cartItemCount).toBe(3)
    })
  })

  describe('Actions', () => {
    it('addToCart: 新しい商品をカートに追加する', () => {
      const store = useOrderStore()
      const item: MenuItem = { id: 1, name: '商品1', description: '説明1', price: 1000, image: 'image1.jpg' }
      
      store.addToCart(item)
      
      expect(store.cartItems).toHaveLength(1)
      expect(store.cartItems[0]).toEqual({ ...item, quantity: 1 })
    })

    it('addToCart: 既存の商品の数量を増やす', () => {
      const store = useOrderStore()
      const item: MenuItem = { id: 1, name: '商品1', description: '説明1', price: 1000, image: 'image1.jpg' }
      
      store.addToCart(item)
      store.addToCart(item)
      
      expect(store.cartItems).toHaveLength(1)
      expect(store.cartItems[0].quantity).toBe(2)
    })

    it('removeFromCart: カートから商品を削除する', () => {
      const store = useOrderStore()
      const item: MenuItem = { id: 1, name: '商品1', description: '説明1', price: 1000, image: 'image1.jpg' }
      
      store.addToCart(item)
      store.removeFromCart(item.id)
      
      expect(store.cartItems).toHaveLength(0)
    })

    it('updateQuantity: 商品の数量を更新する', () => {
      const store = useOrderStore()
      const item: MenuItem = { id: 1, name: '商品1', description: '説明1', price: 1000, image: 'image1.jpg' }
      
      store.addToCart(item)
      store.updateQuantity(item.id, 5)
      
      expect(store.cartItems[0].quantity).toBe(5)
    })

    it('clearCart: カートを空にする', () => {
      const store = useOrderStore()
      const item: MenuItem = { id: 1, name: '商品1', description: '説明1', price: 1000, image: 'image1.jpg' }
      
      store.addToCart(item)
      store.clearCart()
      
      expect(store.cartItems).toHaveLength(0)
    })

    it('submitOrder: 注文を送信し、カートをクリアする', async () => {
      const store = useOrderStore()
      const item: MenuItem = { id: 1, name: '商品1', description: '説明1', price: 1000, image: 'image1.jpg' }
      
      // axiosのモック
      vi.mock('axios', () => ({
        default: {
          post: vi.fn().mockResolvedValue({ data: { orderId: '123' } })
        }
      }))

      store.addToCart(item)
      await store.submitOrder()
      
      expect(store.cartItems).toHaveLength(0)
    })

    it('fetchActiveOrders: アクティブな注文を取得する', async () => {
      const store = useOrderStore()
      const mockOrders = [
        {
          items: [{ id: 1, name: '商品1', description: '説明1', price: 1000, image: 'image1.jpg', quantity: 1 }],
          tableNumber: '1',
          timestamp: new Date().toISOString(),
          status: 'pending'
        }
      ]

      // axiosのモック
      vi.mock('axios', () => ({
        default: {
          get: vi.fn().mockResolvedValue({ data: mockOrders })
        }
      }))

      await store.fetchActiveOrders()
      
      expect(store.activeOrders).toEqual(mockOrders)
    })
  })
}) 