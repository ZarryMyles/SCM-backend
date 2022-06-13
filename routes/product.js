const express = require('express')
const router = express.Router()
const Product = require('../models/product.js')

// Getting all product
router.get('/', async (req, res) => {
  try {
    const product = await Product.find()
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting one product
router.get('/:id', getProduct, (req, res) => {
  res.send(res.product)
})

// Decreasing a Stock of a Product by 1
router.patch('/:id/rem', getProduct, async (req, res) => {
  if (res.product.stock > 0) {
    res.product.stock--
    try {
      const updatedProduct = await res.product.save()
      res.json(updatedProduct)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: 'No stock available' })
  }
})

// Creating a product
router.post('/', async (req, res) => {
  const product = new Product({
    serial: req.body.serial,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    manufacturer: req.body.manufacturer,
    price: req.body.price,
    stock: req.body.stock,
    dateAdded: req.body.dateAdded,
  })

  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating an Product
router.patch('/:id', getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name
  }
  if (req.body.description != null) {
    res.product.description = req.body.description
  }
  if (req.body.image != null) {
    res.product.image = req.body.image
  }
  if (req.body.category != null) {
    res.product.category = req.body.category
  }
  if (req.body.manufacturer != null) {
    res.product.manufacturer = req.body.manufacturer
  }
  if (req.body.price != null) {
    res.product.price = req.body.price
  }
  if (req.body.stock != null) {
    res.product.stock = req.body.stock
  }
  try {
    const updatedProduct = await res.product.save()
    res.json(updatedProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Removing an Product
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove()
    res.json({ message: 'Product was removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware to get Product by id
async function getProduct(req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.id)
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find Product' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.product = product
  next()
}

module.exports = router
