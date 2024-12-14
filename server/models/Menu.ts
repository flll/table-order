import mongoose from 'mongoose'

const menuSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  categoryId: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String 
  },
  imageUrl: { 
    type: String 
  },
  available: { 
    type: Boolean, 
    default: true 
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

export const Menu = mongoose.model('Menu', menuSchema) 