import { 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Chip, 
  Typography 
} from '@mui/material'
import type { Table } from '@/types/table'

type Props = {
  tables: Table[]
}

export const TableStatus = ({ tables }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success'
      case 'occupied': return 'warning'
      case 'reserved': return 'info'
      default: return 'default'
    }
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>テーブル状況</Typography>
      <List>
        {tables.map(table => (
          <ListItem key={table.id}>
            <ListItemText 
              primary={`テーブル ${table.number}`}
              secondary={`${table.capacity}人掛け`}
            />
            <Chip 
              label={table.status}
              color={getStatusColor(table.status)}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
} 