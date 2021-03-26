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
        'status',
        'dateListed',
      ],
      include: [
        {model: User, attributes: ['id', 'firstName', 'latitude', 'longitude']},
        {
          model: ItemPhoto,
          attributes: ['photoTitle', 'cloudREF', 'downloadURL'],
        },
      ],
    })
    res.json(allItems)
  } catch (err) {
    next(err)
  }
})

// GET single item
// this may be necessary to re-route the user after they create a new post
router.get('/:itemId', async (req, res, next) => {
  const {itemId} = req.params
  try {
    const item = await Item.findByPk(itemId)
    res.json(item)
  } catch (err) {
    next(err)
  }
})

// api/items POST a new item
router.post(
  '/',

  // commenting out authentication for ease of development and testing -- JC
  // ensureLogin,

  async (req, res, next) => {
    try {
      const {
        itemListName,
        description,
        itemType,
        itemCondition,
        deliveryOption,
        userId,
        imageArr,
        // status,
        // dateListed,
      } = req.body

      console.log('req.body.image', imageArr)

      //create new item data in item table -- working as of 3.20.21
      const newItem = await Item.create({
        itemListName,
        description,
        itemType,
        itemCondition,
        deliveryOption,
        userId,
      })

      console.log(newItem)

      imageArr.forEach(async (element) => {
        console.log(element)

        const itemPhotos = await ItemPhoto.create({
          photoTitle: element.photoTitle,
          cloudREF: element.cloudRef,
          downloadURL: element.downloadUrl,
        })

        await itemPhotos.setItem(newItem)
      })

      res.status(201).send(newItem)
    } catch (err) {
      next(err)
    }
  }
)

router.put('/:itemId', async (req, res, next) => {
  try {
    const {itemId} = req.params
    const status = req.body.status
    const item = await Item.findByPk(itemId)

    if (!item) {
      res.sendStatus(404)
      return
    }

    await item.update({status: status})
    res.json(item)
  } catch (err) {
    next(err)
  }
})
