import Table from '../models/Table'
import type { Document } from 'mongoose'

interface Location {
  x: number
  y: number
}

interface TableDocument extends Document {
  number: number
  capacity: number
  status: 'available' | 'occupied' | 'reserved'
  location: Location
  currentOrderId?: string
  occupiedAt?: Date
  updatedAt: Date
}

export class TableService {
  // テーブル一覧の取得
  static async getAllTables() {
    try {
      return await Table.find()
        .populate('currentOrderId')
        .sort({ number: 1 })
    } catch (error) {
      throw new Error('テーブル一覧の取得に失敗しました')
    }
  }

  // テーブル状態の取得
  static async getTableStatus(number: number) {
    try {
      return await Table.findOne({ number })
        .populate('currentOrderId')
    } catch (error) {
      throw new Error('テーブル状態の取得に失敗しました')
    }
  }

  // テーブル状態の更新
  static async updateTableStatus(
    id: string,
    status: TableDocument['status'],
    orderId?: string
  ) {
    try {
      const updateData: Partial<TableDocument> = {
        status,
        updatedAt: new Date()
      }

      if (status === 'occupied') {
        updateData.occupiedAt = new Date()
        updateData.currentOrderId = orderId
      } else if (status === 'available') {
        updateData.occupiedAt = undefined
        updateData.currentOrderId = undefined
      }

      return await Table.findByIdAndUpdate(id, updateData, { new: true })
    } catch (error) {
      throw new Error('テーブル状態の更新に失敗しました')
    }
  }

  // テーブル位置の更新
  static async updateTableLocation(id: string, location: Location) {
    try {
      return await Table.findByIdAndUpdate(
        id,
        {
          location,
          updatedAt: new Date()
        },
        { new: true }
      )
    } catch (error) {
      throw new Error('テーブル位置の更新に失敗しました')
    }
  }
} 