const express = require('express')
const router = express.Router()
const Manufacturer = require('../models/manufacturer.js')

// Getting all Manufacturers
router.get('/', async (req, res) => {
  try {
    const manufacturer = await Manufacturer.find()
    res.json(manufacturer)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting one Manufacturer
router.get('/:id', getManufacturer, (req, res) => {
  res.send(res.manufacturer.name)
})

// Creating an Manufacturer
router.post('/', async (req, res) => {
  const manufacturer = new Manufacturer({
    serial: req.body.serial,
    name: req.body.name,
    dateAdded: req.body.dateAdded,
  })

  try {
    const newManufacturer = await manufacturer.save()
    res.status(201).json(newManufacturer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating an Manufacturer
router.patch('/:id', getManufacturer, (req, res) => {})

// Removing a manufacturer
router.delete('/:id', getManufacturer, async (req, res) => {
  try {
    await res.manufacturer.remove()
    res.json({ message: 'Manufacturer was removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware to get manufacturer by serial
async function getManufacturer(req, res, next) {
  let manufacturer
  try {
    manufacturer = await Manufacturer.findById(req.params.id)
    if (manufacturer == null) {
      return res.status(404).json({ message: 'Cannot find Manufacturer' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.manufacturer = manufacturer
  next()
}

module.exports = router
