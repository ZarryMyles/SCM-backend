const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  serial: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: 'https://via.placeholder.com/150',
  },
  description: {
    type: String,
    required: true,
    default: 'No description available',
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

module.exports = mongoose.model('Product', productSchema)
