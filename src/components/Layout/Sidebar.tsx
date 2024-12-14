import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import ListAltIcon from '@mui/icons-material/ListAlt'
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const menuItems = [
    { text: 'メニュー管理', icon: <RestaurantMenuIcon /> },
    { text: '注文一覧', icon: <ListAltIcon /> },
    { text: 'テーブル管理', icon: <TableRestaurantIcon /> }
  ]

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        {menuItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
} 