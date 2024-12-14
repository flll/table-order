import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import type { Order } from '../../types/order'

type Props = {
  orders: Order[]
}

export const OrderStatus = ({ orders }: Props) => {
  const pendingCount = orders.filter(o => o.status === 'pending').length
  const preparingCount = orders.filter(o => o.status === 'preparing').length
  const completedCount = orders.filter(o => o.status === 'completed').length

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>注文状況</Typography>
      <Box sx={{ mb: 1 }}>
        <Typography>未着手: {pendingCount}件</Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography>調理中: {preparingCount}件</Typography>
      </Box>
      <Box>
        <Typography>完了: {completedCount}件</Typography>
      </Box>
    </Paper>
  )
} 