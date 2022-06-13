require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database!'))

app.use(express.json())

const usersRoute = require('./routes/users')
app.use('/users', usersRoute)

const productRoute = require('./routes/product')
app.use('/product', productRoute)

app.listen(3001, () => console.log('server started!'))
