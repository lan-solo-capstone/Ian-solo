const router = require('express').Router()
const {Item, User} = require('../db/models')
const ItemPhoto = require('../db/models/itemPhoto')
const {ensureAdmin, ensureLogin} = require('./middleware')
module.exports = router

// /api/items

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

// api/items POST a new item
router.post('/', ensureLogin, async (req, res, next) => {
  try {
    const {
      itemListName,
      description,
      itemType,
      itemCondition,
      deliveryOption,
      userId,
      // status,
      // dateListed,
    } = req.body

    //create new item data in item table -- working as of 3.20.21
    const newItem = await Item.create({
      itemListName,
      description,
      itemType,
      itemCondition,
      deliveryOption,
      userId,
    })

    // imageFiles upload to DB  -- working as of 3.20.21
    if (req.files) {
      //** */ the yellow lines are from : eslint-disable-next-line guard-for-in >>need to discuss with team
      for (let key in req.files) {
        await ItemPhoto.create({
          photoTitle: req.files[key].name,
          photoFile: req.files[key].data,
        })
      }
    }

    /**  THIS STILL NEEDS TO WORK - CURRENTLY NO ITEM AND ITEMPHOTO ASSOCIATION 03/21/21 */
    // using magic method to associate the photo with the item
    // createItem and setItem are not valid methods
    //await newItem.addItemPhoto()

    res.status(201).send(newItem)
  } catch (err) {
    next(err)
  }
})
