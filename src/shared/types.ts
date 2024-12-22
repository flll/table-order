export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  items: CartItem[];
  tableNumber: string;
  timestamp: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

export interface PrintJob {
  orderId: string;
  content: string;
  timestamp: string;
} 