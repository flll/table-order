import React from 'react'
import { 
  Box, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow 
} from '@mui/material'
import { useOrderStore } from '../../stores/orderStore'

export const OrderHistory = () => {
  const orders = useOrderStore(state => state.orders)
  const completedOrders = orders.filter(o => 
    o.status === 'completed' || o.status === 'cancelled'
  )

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>注文履歴</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>テーブル</TableCell>
            <TableCell>商品</TableCell>
            <TableCell>状態</TableCell>
            <TableCell>時刻</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {completedOrders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.tableNumber}</TableCell>
              <TableCell>
                {order.items.map(item => 
                  `${item.menuName}×${item.quantity}`
                ).join(', ')}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleTimeString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
} 