import express, { Request, Response, RequestHandler } from 'express'
import Table from '../models/Table'

const router = express.Router()

// テーブル一覧の取得
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find().populate('currentOrderId')
    res.json(tables)
  } catch (error) {
    res.status(500).json({ message: 'テーブル情報の取得に失敗しました' })
  }
})

// テーブル状態の更新
router.patch('/:id/status', (async (
  req: Request,
  res: Response
) => {
  try {
    const table = await Table.findByIdAndUpdate(
      req.params.id,
      { 
        status: req.body.status,
        ...(req.body.status === 'available' && {
          occupiedAt: null,
          currentOrderId: null
        })
      },
      { new: true }
    )
    if (!table) return res.status(404).json({ message: 'テーブルが見つかりません' })
    res.json(table)
  } catch (error) {
    res.status(400).json({ message: 'テーブル状態の更新に失敗しました' })
  }
}) as RequestHandler<{id: string}, any, {status: string}>)

// テーブル位置の更新
router.patch('/:id/location', (async (
  req: Request,
  res: Response
) => {
  try {
    const table = await Table.findByIdAndUpdate(
      req.params.id,
      { 
        location: req.body.location,
        updatedAt: Date.now()
      },
      { new: true }
    )
    if (!table) return res.status(404).json({ message: 'テーブルが見つかりません' })
    res.json(table)
  } catch (error) {
    res.status(400).json({ message: 'テーブル位置の更新に失敗しました' })
  }
}) as RequestHandler<{id: string}, any, {location: string}>)

export default router 