import { create } from 'zustand'

export type MenuItem = {
  id: number
  name: string
  price: number
  categoryId: number
}

type MenuStore = {
  items: MenuItem[]
  categories: { id: number; name: string }[]
  addItem: (item: MenuItem) => void
  updateItem: (id: number, updates: Partial<MenuItem>) => void
  deleteItem: (id: number) => void
}

export const useMenuStore = create<MenuStore>((set) => ({
  items: [
    { id: 1, name: '商品1', price: 1000, categoryId: 1 },
    { id: 2, name: '商品2', price: 1500, categoryId: 1 },
  ],
  categories: [
    { id: 1, name: 'フード' },
    { id: 2, name: 'ドリンク' },
    { id: 3, name: 'デザート' },
  ],
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
  updateItem: (id, updates) => set((state) => ({
    items: state.items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    )
  })),
  deleteItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
})) 