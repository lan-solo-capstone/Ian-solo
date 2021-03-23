const router = require('express').Router()
const Item = require('../db/models/item')
const ItemPhoto = require('../db/models/itemPhoto')
module.exports = router

// mounted on /api/users/post

// TODO: only users should be allowed to do this

// TODO: look into multer:  YF 03.21.21  Currently using express-fileupload middleware

router.post('/', async (req, res, next) => {
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

    //create new item data in item table
    const newItem = await Item.create({
      itemListName,
      description,
      itemType,
      itemCondition,
      deliveryOption,
      userId,
    })

    // yf 03.22.21 imageFiles upload to DB

    if (req.files) {
      //** */ the yellow lines are from : eslint-disable-next-line guard-for-in >>need to discuss with team
      // eslint-disable-next-line guard-for-in
      for (let key in req.files) {
        const itemPic = await ItemPhoto.create({
          photoTitle: req.files[key].name,
          photoFile: req.files[key].data,
        })
        //yf 03.22.21  associating pic to newItem
        await itemPic.setItem(newItem)
      }
    }

    res.status(201).send(newItem)
  } catch (err) {
    next(err)
  }
})
