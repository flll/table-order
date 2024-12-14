export type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning'

export type Table = {
  id: string
  number: number
  capacity: number
  status: TableStatus
  currentOrderId?: string
  lastOrderAt?: Date
  notes?: string
}

export type TableLocation = {
  x: number
  y: number
  rotation?: number
}

export type TableWithLocation = Table & {
  location: TableLocation
}