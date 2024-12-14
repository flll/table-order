import { api } from './client'
import { Order, OrderStatus } from '../types/order'

export const orderApi = {
  // 注文一覧の取得
  getOrders: () => 
    api.get<Order[]>('/orders').then(res => res.data),

  // 新規注文の作成
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => 
    api.post<Order>('/orders', order).then(res => res.data),

  // 注文状態の更新
  updateOrderStatus: (orderId: string, status: OrderStatus) => 
    api.patch<Order>(`/orders/${orderId}/status`, { status }).then(res => res.data),

  // 注文の削除
  deleteOrder: (orderId: string) => 
    api.delete(`/orders/${orderId}`).then(res => res.data),

  // テーブル別の注文取得
  getOrdersByTable: (tableNumber: number) => 
    api.get<Order[]>(`/orders/table/${tableNumber}`).then(res => res.data),
} 