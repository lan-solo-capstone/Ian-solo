const router = require('express').Router()
const Item = require('../db/models/item')
module.exports = router

// mounted on /api/users/post

router.post('/', async (req, res, next) => {
  try {
    const {
      itemListName,
      description,
      itemType,
      itemCondition,
      // status,
      deliveryOption,
      // dateListed,
    } = req.body

    const newItem = await Item.create({
      itemListName,
      description,
      itemType,
      itemCondition,
      deliveryOption,
    })

    res.status(201).send(newItem)
  } catch (err) {
    next(err)
  }
})
