const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  serial: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isManufacturer: {
    type: Boolean,
    required: true,
    default: false,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

module.exports = mongoose.model('Users', usersSchema)
