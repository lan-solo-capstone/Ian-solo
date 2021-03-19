const router = require('express').Router()
const {Item, User} = require('../db/models')
module.exports = router

// /api/allItems

router.get('/', async (req, res, next) => {
  try {
    const allItems = await Item.findAll({
      attributes: [
        'id',
        'itemListName',
        'description',
        'itemType',
        'dateListed',
      ],
      include: [
        {model: User, attributes: ['firstName', 'latitude', 'longitude']},
      ],
    })
    res.json(allItems)
  } catch (err) {
    next(err)
  }
})
