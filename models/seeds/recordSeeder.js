const Record = require('../record')
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const recordData = [
  {
    name: '早餐',
    date: '2021/07/19',
    category: '餐飲食品',
    amount: 50
  },
  {
    name: '冰箱',
    date: '2021/07/19',
    category: '家居物業',
    amount: 20000
  },
  {
    name: '油錢',
    date: '2021/07/19',
    category: '交通出行',
    amount: 800
  },
  {
    name: '儲值遊戲點數',
    date: '2021/07/19',
    category: '休閒娛樂',
    amount: 2000
  },
  {
    name: '繳保險費',
    date: '2021/07/19',
    category: '其他',
    amount: 3000
  }
]

db.once('open', () => {
  Record.create(recordData)
    .then(() => {
      console.log('Add record seeder.')
      return db.close()
    }).then(() => {
      console.log('database connection close.')
    })
})