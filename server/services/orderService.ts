import { Order } from '../models/Order'
import Table from '../models/Table'
import type { Document } from 'mongoose'

interface OrderItem {
  menuName: string
  quantity: number
  notes?: string
  price: number
}

interface OrderDocument extends Document {
  tableNumber: number
  items: OrderItem[]
  status: 'pending' | 'preparing' | 'ready' | 'served'
  createdAt: Date
}

export class OrderService {
  // 注文一覧の取得
  static async getAllOrders() {
    try {
      return await Order.find()
        .populate('items.menuId')
        .sort({ createdAt: -1 })
    } catch (error) {
      throw new Error('注文一覧の取得に失敗しました')
    }
  }

  // テーブル別注文の取得
  static async getOrdersByTable(tableNumber: number) {
    try {
      return await Order.find({ tableNumber })
        .populate('items.menuId')
        .sort({ createdAt: -1 })
    } catch (error) {
      throw new Error('テーブル別注文の取得に失敗しました')
    }
  }

  // 新規注文の作成
  static async createOrder(orderData: Partial<OrderDocument>) {
    try {
      const order = new Order(orderData)
      await order.save()

      // テーブル状態の更新
      await Table.findOneAndUpdate(
        { number: orderData.tableNumber },
        {
          status: 'occupied',
          occupiedAt: new Date(),
          currentOrderId: order._id
        }
      )

      return order
    } catch (error) {
      throw new Error('注文の作成に失敗しました')
    }
  }

  // 注文状態の更新
  static async updateOrderStatus(id: string, status: OrderDocument['status']) {
    try {
      const order = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      )

      // 注文が完了した場合、テーブル状態を更新
      if (status === 'served') {
        await Table.findOneAndUpdate(
          { currentOrderId: id },
          {
            status: 'available',
            occupiedAt: null,
            currentOrderId: null
          }
        )
      }

      return order
    } catch (error) {
      throw new Error('注文状態の更新に失敗しました')
    }
  }
} 