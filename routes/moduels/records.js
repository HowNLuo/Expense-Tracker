const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then((record) => {
      let date = record.date
      let YYYY = date.getFullYear()
      let MM = date.getMonth() + 1
      let DD = date.getDate()
      if (MM < 10) {
        record.date = `${YYYY}` + '-' + '0' + `${MM}` + '-' + `${DD}`
      } else if (MM >= 10) {
        record.date = `${YYYY}` + '-' + `${MM}` + '-' + `${DD}`
      }
      res.render('edit', { record })
    })
    .catch((error) => console.error(error))
})

router.put('/:id', (req, res) => {
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

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const name = req.body.name
  const date = req.body.date
  const category = req.body.category
  const amount = req.body.amount
  return Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

module.exports = router