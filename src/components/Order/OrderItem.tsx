import React from 'react'
import { Box, Card, Typography, Chip, IconButton } from '@mui/material'
import { Check, Close } from '@mui/icons-material'
import type { Order, OrderStatus } from '../../types/order'

type Props = {
  order: Order
  onStatusChange: (orderId: string, status: OrderStatus) => void
}

export const OrderItem = ({ order, onStatusChange }: Props) => {
  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">テーブル {order.tableNumber}</Typography>
        <Chip 
          label={order.status} 
          color={order.status === 'pending' ? 'warning' : 'success'} 
        />
      </Box>

      {order.items.map((item, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Typography>
            {item.menuName} × {item.quantity}
            {item.notes && <Typography variant="caption"> ({item.notes})</Typography>}
          </Typography>
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <IconButton 
          color="success" 
          onClick={() => onStatusChange(order.id, 'completed')}
        >
          <Check />
        </IconButton>
        <IconButton 
          color="error" 
          onClick={() => onStatusChange(order.id, 'cancelled')}
        >
          <Close />
        </IconButton>
      </Box>
    </Card>
  )
} 