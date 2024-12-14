import React from 'react'
import { Box, Tabs, Tab } from '@mui/material'

interface Category {
  id: number
  name: string
}

interface MenuCategoryProps {
  categories: Category[]
  onCategoryChange: (categoryId: number) => void
}

export const MenuCategory = ({ categories, onCategoryChange }: MenuCategoryProps) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    onCategoryChange(categories[newValue].id)
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="menu categories">
        {categories.map((category) => (
          <Tab key={category.id} label={category.name} />
        ))}
      </Tabs>
    </Box>
  )
} 