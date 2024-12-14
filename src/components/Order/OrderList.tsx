import React from 'react'
import { Box, Typography } from '@mui/material'
import Grid2 from '@mui/material/Grid2'
import { useOrderStore } from '../../stores/orderStore'
import { OrderItem } from './OrderItem'
import { OrderStatus } from './OrderStatus.tsx'

export const OrderList = () => {
  const orders = useOrderStore(state => state.orders)
  const updateStatus = useOrderStore(state => state.updateOrderStatus)

  return (
    <Box sx={{ p: 2 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>注文一覧</Typography>
          {orders.map(order => (
            <OrderItem 
              key={order.id}
              order={order}
              onStatusChange={updateStatus}
            />
          ))}
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <OrderStatus orders={orders} />
        </Grid2>
      </Grid2>
    </Box>
  )
} 