import { Request, Response } from 'express'
import Table from '../models/Table'

export const tableController = {
  // テーブル一覧の取得
  async getTables(req: Request, res: Response) {
    try {
      const tables = await Table.find().sort({ number: 1 })
      res.json(tables)
    } catch (error) {
      res.status(500).json({ message: 'テーブル情報の取得に失敗しました' })
    }
  },

  // テーブル状態の更新
  async updateTableStatus(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { status, occupiedAt } = req.body

      const updatedTable = await Table.findByIdAndUpdate(
        id,
        { 
          $set: { 
            status,
            occupiedAt: status === 'occupied' ? occupiedAt || new Date() : null,
            updatedAt: new Date()
          }
        },
        { new: true }
      )

      if (!updatedTable) {
        return res.status(404).json({ message: 'テーブルが見つかりません' })
      }

      res.json(updatedTable)
    } catch (error) {
      res.status(400).json({ message: '更新に失敗しました' })
    }
  },

  // テーブルの追加
  async createTable(req: Request, res: Response) {
    try {
      const newTable = new Table(req.body)
      await newTable.validate()
      const savedTable = await newTable.save()
      res.status(201).json(savedTable)
    } catch (error) {
      res.status(400).json({ message: '無効なテーブルデータです' })
    }
  },

  // テーブルの削除
  async deleteTable(req: Request, res: Response) {
    try {
      const { id } = req.params
      const deletedTable = await Table.findByIdAndDelete(id)
      if (!deletedTable) {
        return res.status(404).json({ message: 'テーブルが見つかりません' })
      }
      res.json({ message: '削除しました' })
    } catch (error) {
      res.status(500).json({ message: '削除に失敗しました' })
    }
  }
} 