import { create } from 'zustand'
import type { Table } from '../types/table'

export type TableStatus = 'available' | 'occupied' | 'reserved'

type TableStore = {
  tables: Table[]
  updateTableStatus: (tableId: string, status: TableStatus) => void
  addTable: (table: Table) => void
  removeTable: (tableId: string) => void
}

export const useTableStore = create<TableStore>((set) => ({
  tables: [
    { id: 't1', number: 1, capacity: 4, status: 'available' },
    { id: 't2', number: 2, capacity: 2, status: 'occupied' },
    { id: 't3', number: 3, capacity: 6, status: 'reserved' },
  ],
  updateTableStatus: (tableId, status) => set((state) => ({
    tables: state.tables.map(table =>
      table.id === tableId ? { ...table, status } : table
    )
  })),
  addTable: (table) => set((state) => ({
    tables: [...state.tables, table]
  })),
  removeTable: (tableId) => set((state) => ({
    tables: state.tables.filter(table => table.id !== tableId)
  })),
})) 