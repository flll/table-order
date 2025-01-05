import { defineStore } from 'pinia'
import type { MenuItem } from './order'
import menuData from '../data/menu.json'
import axios from 'axios'

interface MenuCategory {
  id: number
  name: string
  items: MenuItem[]
}

export const useMenuStore = defineStore('menu', {
  state: () => ({
    categories: menuData.categories as MenuCategory[]
  }),

  actions: {
    async saveMenuData() {
      try {
        await axios.post('/api/menu/save', { categories: this.categories })
        return true
      } catch (error) {
        console.error('メニューの保存に失敗:', error)
        return false
      }
    },

    async addMenuItem(categoryId: number, item: MenuItem) {
      const category = this.categories.find(c => c.id === categoryId)
      if (category) {
        category.items.push(item)
        await this.saveMenuData()
      }
    },

    async removeMenuItem(categoryId: number, itemId: number) {
      const category = this.categories.find(c => c.id === categoryId)
      if (category) {
        const index = category.items.findIndex(item => item.id === itemId)
        if (index !== -1) {
          category.items.splice(index, 1)
          await this.saveMenuData()
        }
      }
    },

    async updateMenuItem(categoryId: number, itemId: number, updatedItem: Partial<MenuItem>) {
      const category = this.categories.find(c => c.id === categoryId)
      if (category) {
        const item = category.items.find(item => item.id === itemId)
        if (item) {
          Object.assign(item, updatedItem)
          await this.saveMenuData()
        }
      }
    }
  }
}) 