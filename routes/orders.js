const express = require('express')
const router = express.Router()
const Orders = require('../models/order.js')
const Product = require('../models/product.js')

// Getting all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Orders.find()
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting one order
router.get('/:id', getOrder, (req, res) => {
  res.send(res.order)
})

// Creating an order
router.post('/', async (req, res) => {
  const order = new Order({
    serial: req.body.serial,
    product: req.body.product,
    quantity: req.body.quantity,
    dateOrdered: req.body.dateOrdered,
  })

  try {
    const newOrder = await order.save()
    res.status(201).json(newOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting an user
router.delete('/:id', getOrder, async (req, res) => {
  try {
    await res.order.remove()
    res.json({ message: 'User was removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware to get order by serial
async function getOrder(req, res, next) {
  let order
  try {
    order = await Orders.findById(req.params.id)
    if (order == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.order = order
  next()
}

module.exports = router
