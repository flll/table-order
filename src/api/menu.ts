import { api } from './client'
import { MenuItem } from '../types/menu'

export const menuApi = {
  // メニュー一覧の取得
  getMenuItems: () => 
    api.get<MenuItem[]>('/menu').then(res => res.data),

  // メニュー項目の追加
  createMenuItem: (item: Omit<MenuItem, 'id'>) => 
    api.post<MenuItem>('/menu', item).then(res => res.data),

  // メニュー項目の更新
  updateMenuItem: (id: number, updates: Partial<MenuItem>) => 
    api.patch<MenuItem>(`/menu/${id}`, updates).then(res => res.data),

  // メニュー項目の削除
  deleteMenuItem: (id: number) => 
    api.delete(`/menu/${id}`).then(res => res.data),
} 