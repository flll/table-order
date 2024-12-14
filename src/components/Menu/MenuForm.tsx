import React from 'react'
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

interface MenuFormProps {
  onSubmit: (data: { name: string; price: number; categoryId: number }) => void
}

export const MenuForm = ({ onSubmit }: MenuFormProps) => {
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [categoryId, setCategoryId] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      price: Number(price),
      categoryId: Number(categoryId)
    })
    // フォームをリセット
    setName('')
    setPrice('')
    setCategoryId('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, m: 2 }}>
      <TextField
        fullWidth
        label="メニュー名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="価格"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>カテゴリー</InputLabel>
        <Select
          value={categoryId}
          label="カテゴリー"
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <MenuItem value={1}>フード</MenuItem>
          <MenuItem value={2}>ドリンク</MenuItem>
          <MenuItem value={3}>デザート</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        登録
      </Button>
    </Box>
  )
} 