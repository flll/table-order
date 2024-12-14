export type OrderStatus = 'pending' | 'preparing' | 'completed' | 'cancelled'

export type OrderItem = {
  menuName: string
  quantity: number
  notes?: string
  price: number
}

export type Order = {
  id: string
  tableNumber: number
  items: OrderItem[]
  status: OrderStatus
  createdAt: string
}

export type CreateOrderInput = Omit<Order, 'id' | 'createdAt' | 'status'> & {
  status?: OrderStatus
} 