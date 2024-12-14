import { api } from './client'
import { Table, TableStatus } from '../types/table'

export const tableApi = {
  // テーブル一覧の取得
  getTables: () => 
    api.get<Table[]>('/tables').then(res => res.data),

  // テーブルの追加
  createTable: (table: Omit<Table, 'id'>) => 
    api.post<Table>('/tables', table).then(res => res.data),

  // テーブル状態の更新
  updateTableStatus: (tableId: string, status: TableStatus) => 
    api.patch<Table>(`/tables/${tableId}/status`, { status }).then(res => res.data),

  // テーブルの削除
  deleteTable: (tableId: string) => 
    api.delete(`/tables/${tableId}`).then(res => res.data),

  // 利用可能なテーブルの取得
  getAvailableTables: () => 
    api.get<Table[]>('/tables/available').then(res => res.data),
} 