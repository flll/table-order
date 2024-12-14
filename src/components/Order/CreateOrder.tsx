import React from 'react'
import { useOrderStore } from '../../stores/orderStore'

export const CreateOrder = () => {
  const addOrder = useOrderStore(state => state.addOrder)

  const handleOrder = () => {
    const newOrder = {
      id: `order-${Date.now()}`,
      tableNumber: 1,
      items: [
        { 
          menuName: 'ラーメン',
          quantity: 2,
          notes: '辛さ控えめで',
          price: 800
        }
      ],
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    }
    
    addOrder(newOrder)
  }

  return (
    <button onClick={handleOrder}>注文確定</button>
  )
} 