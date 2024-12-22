import { MenuItem } from '../types/menu.js'
import { Order, OrderItem } from '../types/order.js'
import { Table } from '../types/table.js'

// メニュー項目のバリデーション
export const validateMenuItem = (item: Partial<MenuItem>): string[] => {
  const errors: string[] = []

  if (!item.name?.trim()) {
    errors.push('商品名は必須です')
  }

  if (typeof item.price !== 'number' || item.price < 0) {
    errors.push('価格は0以上の数値で入力してください')
  }

  if (!item.categoryId) {
    errors.push('カテゴリーは必須です')
  }

  return errors
}

// 注文のバリデーション
export const validateOrder = (order: Partial<Order>): string[] => {
  const errors: string[] = []

  if (!order.tableNumber) {
    errors.push('テーブル番号は必須です')
  }

  if (!order.items?.length) {
    errors.push('注文項目は1つ以上必要です')
  }

  return errors
}

// 注文項目のバリデーション
export const validateOrderItem = (item: Partial<OrderItem>): string[] => {
  const errors: string[] = []

  if (!item.menuName) {
    errors.push('メニュー名は必須です')
  }

  if (typeof item.quantity !== 'number' || item.quantity < 1) {
    errors.push('数量は1以上の数値で入力してください')
  }

  if (typeof item.price !== 'number' || item.price < 0) {
    errors.push('価格は0以上の数値で入力してください')
  }

  return errors
}

// テーブルのバリデーション
export const validateTable = (table: Partial<Table>): string[] => {
  const errors: string[] = []

  if (!table.number) {
    errors.push('テーブル番号は必須です')
  }

  if (typeof table.capacity !== 'number' || table.capacity < 1) {
    errors.push('定員は1以上の数値で入力してください')
  }

  if (!table.status) {
    errors.push('テーブル状態は必須です')
  }

  return errors
} 