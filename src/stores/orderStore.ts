import { create } from 'zustand'
import type { Order, OrderStatus } from '../types/order'

interface OrderState {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  // ... その他の状態や関数
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  addOrder: (order) => set((state) => ({
    orders: [...state.orders, order]
  })),
  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    }))
  }
})) 