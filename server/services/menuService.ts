import { Menu } from '../models/Menu'
import type { Document } from 'mongoose'

interface MenuItem extends Document {
  name: string
  price: number
  categoryId: number
  description?: string
  imageUrl?: string
  isAvailable: boolean
  updatedAt: Date
}

export class MenuService {
  // メニュー一覧の取得
  static async getAllMenus() {
    try {
      return await Menu.find({ isAvailable: true })
    } catch (error) {
      throw new Error('メニュー一覧の取得に失敗しました')
    }
  }

  // カテゴリー別メニューの取得
  static async getMenusByCategory(categoryId: number) {
    try {
      return await Menu.find({ categoryId, isAvailable: true })
    } catch (error) {
      throw new Error('カテゴリー別メニューの取得に失敗しました')
    }
  }

  // メニューの作成
  static async createMenu(menuData: Partial<MenuItem>) {
    try {
      const menu = new Menu({
        ...menuData,
        isAvailable: true,
        updatedAt: new Date()
      })
      return await menu.save()
    } catch (error) {
      throw new Error('メニューの作成に失敗しました')
    }
  }

  // メニューの更新
  static async updateMenu(id: string, menuData: Partial<MenuItem>) {
    try {
      return await Menu.findByIdAndUpdate(
        id,
        { ...menuData, updatedAt: new Date() },
        { new: true }
      )
    } catch (error) {
      throw new Error('メニューの更新に失敗しました')
    }
  }

  // メニューの論理削除
  static async deleteMenu(id: string) {
    try {
      return await Menu.findByIdAndUpdate(
        id,
        { isAvailable: false, updatedAt: new Date() },
        { new: true }
      )
    } catch (error) {
      throw new Error('メニューの削除に失敗しました')
    }
  }
} 