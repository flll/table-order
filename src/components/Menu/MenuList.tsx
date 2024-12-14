import React from 'react'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { MenuItem } from './MenuItem'
import { MenuCategory } from './MenuCategory'
import { MenuForm } from './MenuForm'

export const MenuList = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<number>(1)
  const [showForm, setShowForm] = React.useState(false)

  const categories = [
    { id: 1, name: 'フード' },
    { id: 2, name: 'ドリンク' },
    { id: 3, name: 'デザート' },
  ]

  const menuItems = [
    { id: 1, name: '商品1', price: 1000, categoryId: 1 },
    { id: 2, name: '商品2', price: 1500, categoryId: 1 },
    { id: 3, name: 'ドリンク1', price: 500, categoryId: 2 },
    { id: 4, name: 'デザート1', price: 800, categoryId: 3 },
  ]

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId)
  }

  const handleEdit = (id: number) => {
    console.log('Edit item:', id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    console.log('Delete item:', id)
  }

  const handleSubmit = (data: { name: string; price: number; categoryId: number }) => {
    console.log('Submit:', data)
    setShowForm(false)
  }

  const filteredItems = menuItems.filter(item => item.categoryId === selectedCategory)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuCategory 
        categories={categories} 
        onCategoryChange={handleCategoryChange} 
      />
      
      {showForm && (
        <MenuForm onSubmit={handleSubmit} />
      )}

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {filteredItems.map(item => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
              <MenuItem 
                {...item} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
} 