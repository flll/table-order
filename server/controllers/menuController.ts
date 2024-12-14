import type { RequestHandler } from 'express'
import { Menu } from '../models/Menu'

export const menuController = {
  // メニュー一覧の取得
  getMenuItems: (async (req, res) => {
    try {
      const items = await Menu.find().sort({ categoryId: 1, name: 1 })
      res.json(items)
    } catch (error) {
      res.status(500).json({ message: 'メニューの取得に失敗しました' })
    }
  }) as RequestHandler,

  // メニュー項目の追加
  createMenuItem: (async (req, res) => {
    try {
      const newItem = new Menu(req.body)
      await newItem.validate()
      const savedItem = await newItem.save()
      res.status(201).json(savedItem)
    } catch (error) {
      res.status(400).json({ message: '無効なメニューデータです' })
    }
  }) as RequestHandler,

  // メニュー項目の更新
  updateMenuItem: (async (req, res) => {
    try {
      const { id } = req.params
      const updatedItem = await Menu.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
      )
      if (!updatedItem) {
        return res.status(404).json({ message: 'メニューが見つかりません' })
      }
      res.json(updatedItem)
    } catch (error) {
      res.status(400).json({ message: '更新に失敗しました' })
    }
  }) as RequestHandler,

  // メニュー項目の削除
  deleteMenuItem: (async (req, res) => {
    try {
      const { id } = req.params
      const deletedItem = await Menu.findByIdAndDelete(id)
      if (!deletedItem) {
        return res.status(404).json({ message: 'メニューが見つかりません' })
      }
      res.json({ message: '削除しました' })
    } catch (error) {
      res.status(500).json({ message: '削除に失敗しました' })
    }
  }) as RequestHandler
} 