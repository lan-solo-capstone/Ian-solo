const router = require('express').Router()
const Item = require('../db/models/item')
const ItemPhoto = require('../db/models/ItemPhoto')
module.exports = router

// mounted on /api/users/post
// TODO: only users should be allowed to do this
// TODO: add photos

// TODO: look into multer

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

    console.log('req.body in api', req.body)

    //create new item data in item table -- working as of 3.20.21
    const newItem = await Item.create({
      itemListName,
      description,
      itemType,
      itemCondition,
      deliveryOption,
    })

    // imageFiles upload to DB  -- working as of 3.20.21
    console.log('newItemId', newItem.id)
    const {name, data} = req.files.file
    const newPhoto = await ItemPhoto.create({
      photoTitle: name,
      photoFile: data,
      itemId: newItem.id,
    })

    // console.log('newPhoto', newPhoto)

    // using magic method to associate the photo with the item
    // createItem and setItem are not valid methods
    //await ItemPhoto.setItem(newItem)

    // res.status(201).send(newItem)
    res.send(newPhoto)
  } catch (err) {
    next(err)
  }
})
