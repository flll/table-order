import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  items: [{
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: { type: Number, required: true },
    notes: String
  }],
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'served'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
})

export const Order = mongoose.model('Order', orderSchema) 