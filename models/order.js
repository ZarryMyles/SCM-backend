const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  serial: {
    type: Number,
    required: true,
  },
  user: {
    type: Number,
    required: true,
  },
  product: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  dateOrdered: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

module.exports = mongoose.model('Order', orderSchema)
