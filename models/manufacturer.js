const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  serial: Number,
  name: String,
  category: String,
})

const manufacturerSchema = new mongoose.Schema({
  serial: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  products: [productSchema],
})

module.exports = mongoose.model('Manufacturer', manufacturerSchema)
