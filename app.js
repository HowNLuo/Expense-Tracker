const express = require('express')
const app = express()

const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(3000, () => {
  console.log('App is running http://localhost:3000')
})