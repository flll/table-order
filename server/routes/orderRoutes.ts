import { Router, Request, Response, RequestHandler } from 'express'
import { Order } from '../models/Order'
import Table from '../models/Table'
import { ParamsDictionary } from 'express-serve-static-core'

const router = Router()

// 注文一覧の取得
router.get('/', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('items.menuId')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: '注文の取得に失敗しました' })
  }
})

// 新規注文の作成
router.post('/', async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body)
    await order.save()
    
    // テーブルの状態を更新
    if (req.body.tableNumber) {
      await Table.findOneAndUpdate(
        { number: req.body.tableNumber },
        { 
          status: 'occupied',
          occupiedAt: Date.now(),
          currentOrderId: order._id
        }
      )
    }
    
    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ message: '注文の作成に失敗しました' })
  }
})

// 注文状態の更新
router.patch('/:id/status', (async (
  req: Request,
  res: Response
) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!order) return res.status(404).json({ message: '注文が見つかりません' })
    res.json(order)
  } catch (error) {
    res.status(400).json({ message: '注文状態の更新に失敗しました' })
  }
}) as RequestHandler<{id: string}, any, {status: string}>)

export default router 