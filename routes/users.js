const express = require('express')
const router = express.Router()
const Users = require('../models/users.js')

// Getting all users
router.get('/', async (req, res) => {
  try {
    const users = await Users.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting one user
router.get('/:id', getUser, (req, res) => {
  res.send(res.user.name)
})

// Creating an user
router.post('/', async (req, res) => {
  const user = new Users({
    serial: req.body.serial,
    name: req.body.name,
    dateAdded: req.body.dateAdded,
  })

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating an user
router.patch('/:id', getUser, (req, res) => {})

// Removing an user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'User was removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware to get user by serial
async function getUser(req, res, next) {
  let user
  try {
    user = await Users.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.user = user
  next()
}

module.exports = router
