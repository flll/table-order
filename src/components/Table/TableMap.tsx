import React from 'react'
import { 
  Box, 
  Paper, 
  Grid2, 
  Typography, 
  IconButton 
} from '@mui/material'
import { 
  TableRestaurant as TableIcon,
  Person as PersonIcon 
} from '@mui/icons-material'
import type { Table } from '../../types/table'

type Props = {
  tables: Table[]
  onTableClick: (tableId: string) => void
}

export const TableMap = ({ tables, onTableClick }: Props) => {
  const getTableColor = (status: string) => {
    switch (status) {
      case 'available': return 'success.main'
      case 'occupied': return 'warning.main'
      case 'reserved': return 'info.main'
      default: return 'grey.500'
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>テーブルマップ</Typography>
      <Grid2 container spacing={2}>
        {tables.map(table => (
          <Grid2 size={{ xs: 4, sm: 3 }} key={table.id}>
            <Box
              sx={{
                border: 1,
                borderColor: getTableColor(table.status),
                borderRadius: 1,
                p: 2,
                textAlign: 'center',
                cursor: 'pointer'
              }}
              onClick={() => onTableClick(table.id)}
            >
              <IconButton 
                color={table.status === 'available' ? 'success' : 'warning'}
                sx={{ mb: 1 }}
              >
                <TableIcon />
              </IconButton>
              <Typography variant="body2">
                テーブル {table.number}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PersonIcon fontSize="small" />
                <Typography variant="caption">
                  {table.capacity}名
                </Typography>
              </Box>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Paper>
  )
} 