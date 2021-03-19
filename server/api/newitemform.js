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
      // uploadPhoto,
    } = req.body

    // const newItem = await Item.create({
    //   itemListName,
    //   description,
    //   itemType,
    //   itemCondition,
    //   deliveryOption,
    // })

    // yf 03.19.21 image file saving action
    // imageFiles
    console.log('hello', 'in api route req.files', req.files)
    const {name, data} = req.files.uploadPhoto
    // console.log('hello', 'photo name and data', name, data)
    // saving to DB - itemPhoto
    const newPhoto = await ItemPhoto.create({
      photoTitle: name,
      photoFile: data,
    })

    // using magic method to associate the photo with the item
    // createItem and setItem are not valid methods
    // await newPhoto.createItem(newItem)

    // res.status(201).send(newItem)
    res.send(newPhoto)
  } catch (err) {
    next(err)
  }
})
