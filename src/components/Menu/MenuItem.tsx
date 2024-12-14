import React from 'react'
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

interface MenuItemProps {
  id: number
  name: string
  price: number
  image?: string
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export const MenuItem = ({ id, name, price, image, onEdit, onDelete }: MenuItemProps) => {
  return (
    <Card>
      {image && (
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={name}
        />
      )}
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography>¥{price.toLocaleString()}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          {onEdit && (
            <IconButton onClick={() => onEdit(id)}>
              <EditIcon />
            </IconButton>
          )}
          {onDelete && (
            <IconButton onClick={() => onDelete(id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  )
} 