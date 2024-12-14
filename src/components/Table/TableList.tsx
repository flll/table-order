import React from 'react'
import { Box, Typography } from '@mui/material'
import Grid2 from '@mui/material/Grid2'
import { TableStatus } from './TableStatus'
import { TableMap } from './TableMap'
import { useTableStore } from '../../stores/tableStore'

export const TableList = () => {
  const tables = useTableStore(state => state.tables)
  const updateTableStatus = useTableStore(state => state.updateTableStatus)

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>テーブル管理</Typography>
      
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <TableMap 
            tables={tables}
            onTableClick={(tableId) => {
              console.log('Table clicked:', tableId)
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TableStatus tables={tables} />
        </Grid2>
      </Grid2>
    </Box>
  )
} 