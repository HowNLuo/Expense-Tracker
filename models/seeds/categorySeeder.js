const Category = require('../category')
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker')

db.once('open', () => {
  Category.create([
    {
      name: '家居物業',
      icon: 'fas fa-home'
    },
    {
      name: '交通出行',
      icon: 'fas fa-shuttle-van'
    },
    {
      name: '休閒娛樂',
      icon: 'fas fa-grin-beam'
    },
    {
      name: '餐飲食品',
      icon: 'fas fa-utensils'
    },
    {
      name: '其他',
      icon: 'fas fa-pen'
    }
  ])
  console.log('Add category seeder.')
})