export type MenuItem = {
  id: number
  name: string
  price: number
  categoryId: number
  description?: string
  imageUrl?: string
  isAvailable?: boolean
}

export type MenuCategory = {
  id: number
  name: string
  description?: string
}

export type MenuItemFormData = Omit<MenuItem, 'id'> 