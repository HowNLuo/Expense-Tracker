const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const category = req.query.category
  const filter = []
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      //Total Amount
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += parseInt(records[i].amount)
      }
      //篩選
      for (let j = 0; j < records.length; j++) {
        if (category == "全部" || !category) {
          filter.push(...records)
          break
        } else if (records[j].category == category) {
          filter.push(records[j])
        }
      }
      for (k = 0; k < records.length; k++) {
        switch (records[k].category) {
          case '家居物業':
            records[k].category = 'fas fa-home'
            break
          case '交通出行':
            records[k].category = 'fas fa-shuttle-van'
            break
          case '休閒娛樂':
            records[k].category = 'fas fa-grin-beam'
            break
          case '餐飲食品':
            records[k].category = 'fas fa-utensils'
            break
          case '其他':
            records[k].category = 'fas fa-pen'
            break
        }
      }

      //轉換日期格式
      for (let l = 0; l < records.length; l++) {
        let date = records[l].date
        let YYYY = date.getFullYear()
        let MM = date.getMonth() + 1
        let DD = date.getDate()
        records[l].date = `${YYYY}` + '-' + `${MM}` + '-' + `${DD}`
      }

      //轉換Icon
      Category.find()
        .lean()
        .then((category) => {
          res.render('index', { records: filter, totalAmount, category })
        })
    })
    .catch((error) => console.error(error))
})

module.exports = router