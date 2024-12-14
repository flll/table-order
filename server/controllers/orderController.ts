import { Request, Response } from 'express'
import { Order } from '../models/Order'
import { io } from '../services/socket'

export const orderController = {
  // 注文一覧の取得
  async getOrders(req: Request, res: Response) {
    try {
      const orders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(50)
      res.json(orders)
    } catch (error) {
      res.status(500).json({ message: '注文の取得に失敗しました' })
    }
  },

  // 新規注文の作成
  async createOrder(req: Request, res: Response) {
    try {
      const newOrder = new Order(req.body)
      await newOrder.validate()
      const savedOrder = await newOrder.save()
      
      // WebSocketで注文通知を送信
      io.emit('newOrder', savedOrder)
      
      res.status(201).json(savedOrder)
    } catch (error) {
      res.status(400).json({ message: '無効な注文データです' })
    }
  },

  // 注文状態の更新
  async updateOrderStatus(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { status } = req.body
      
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { $set: { status, updatedAt: new Date() } },
        { new: true }
      )

      if (!updatedOrder) {
        return res.status(404).json({ message: '注文が見つかりません' })
      }

      // WebSocketで状態更新を通知
      io.emit('orderStatusUpdated', updatedOrder)

      res.json(updatedOrder)
    } catch (error) {
      res.status(400).json({ message: '更新に失敗しました' })
    }
  },

  // 注文のキャンセル
  async cancelOrder(req: Request, res: Response) {
    try {
      const { id } = req.params
      const canceledOrder = await Order.findByIdAndUpdate(
        id,
        { $set: { status: 'canceled', updatedAt: new Date() } },
        { new: true }
      )

      if (!canceledOrder) {
        return res.status(404).json({ message: '注文が見つかりません' })
      }

      io.emit('orderCanceled', canceledOrder)
      res.json(canceledOrder)
    } catch (error) {
      res.status(500).json({ message: 'キャンセルに失敗しました' })
    }
  }
} 