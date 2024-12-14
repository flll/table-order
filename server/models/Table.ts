import mongoose from 'mongoose'

const tableSchema = new mongoose.Schema({
  number: { 
    type: Number, 
    required: true,
    unique: true 
  },
  capacity: { 
    type: Number, 
    required: true,
    min: 1 
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'reserved', 'cleaning'],
    default: 'available'
  },
  occupiedAt: { 
    type: Date 
  },
  currentOrderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order' 
  },
  location: {
    x: { type: Number },
    y: { type: Number }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
})

export default mongoose.model('Table', tableSchema) 