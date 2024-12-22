import { defineStore } from 'pinia'
import axios from 'axios'

export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  options?: string[]
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Order {
  items: CartItem[]
  tableNumber: string
  timestamp: string
  status?: 'pending' | 'processing' | 'completed' | 'cancelled'
}

export const useOrderStore = defineStore('order', {
  state: () => ({
    cartItems: [] as CartItem[],
    activeOrders: [] as Order[]
  }),

  getters: {
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },

    cartItemCount: (state) => {
      return state.cartItems.reduce((count, item) => {
        return count + item.quantity
      }, 0)
    }
  },

  actions: {
    addToCart(item: MenuItem) {
      const existingItem = this.cartItems.find(i => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cartItems.push({ ...item, quantity: 1 })
      }
    },

    removeFromCart(itemId: number) {
      const index = this.cartItems.findIndex(item => item.id === itemId)
      if (index > -1) {
        this.cartItems.splice(index, 1)
      }
    },

    updateQuantity(itemId: number, quantity: number) {
      const item = this.cartItems.find(i => i.id === itemId)
      if (item) {
        item.quantity = quantity
      }
    },

    clearCart() {
      this.cartItems = []
    },

    async submitOrder() {
      try {
        const orderData: Order = {
          items: this.cartItems,
          tableNumber: localStorage.getItem('tableNumber') || '未設定',
          timestamp: new Date().toISOString()
        }
        
        const response = await axios.post<{ orderId: string }>('/api/order', orderData)
        this.clearCart()
        return response.data
      } catch (error) {
        console.error('注文送信エラー:', error)
        throw error
      }
    },

    async fetchActiveOrders() {
      try {
        const response = await axios.get<Order[]>('/api/orders/active')
        this.activeOrders = response.data
      } catch (error) {
        console.error('注文取得エラー:', error)
        throw error
      }
    }
  }
}) 