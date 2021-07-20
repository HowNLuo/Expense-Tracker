const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += parseInt(records[i].amount)
      }
      res.render('index', { records, totalAmount })
    })
    .catch((error) => console.error(error))
})

app.get('/record/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch((error) => console.error(error))
})

app.post('/record/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const date = req.body.date
  const category = req.body.category
  const amount = req.body.amount
  Record.findById(id)
    .then((record) => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

app.get('/record/new', (req, res) => {
  res.render('new')
})

app.post('/record/edit', (req, res) => {
  const name = req.body.name
  const date = req.body.date
  const category = req.body.category
  const amount = req.body.amount
  return Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

app.post('/record/:id/delete', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

app.listen(3000, () => {
  console.log('App is running http://localhost:3000')
})