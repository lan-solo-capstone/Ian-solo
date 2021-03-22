// const router = require('express').Router()
// const Item = require('../db/models/item')
// const ItemPhoto = require('../db/models/itemPhoto')
// module.exports = router

// // mounted on /api/users/post

// // TODO: only users should be allowed to do this
// // TODO: add photos

// // TODO: look into multer:  YF 03.21.21  Currently using express-fileupload middleware

// router.post('/', async (req, res, next) => {
//   try {
//     const {
//       itemListName,
//       description,
//       itemType,
//       itemCondition,
//       deliveryOption,
//       userId,
//       // status,
//       // dateListed,
//     } = req.body

//     //create new item data in item table -- working as of 3.20.21
//     const newItem = await Item.create({
//       itemListName,
//       description,
//       itemType,
//       itemCondition,
//       deliveryOption,
//       userId,
//     })

//     // imageFiles upload to DB  -- working as of 3.20.21
//     if (req.files) {
//       //** */ the yellow lines are from : eslint-disable-next-line guard-for-in >>need to discuss with team
//       for (let key in req.files) {
//         await ItemPhoto.create({
//           photoTitle: req.files[key].name,
//           photoFile: req.files[key].data,
//         })
//       }
//     }

//     /**  THIS STILL NEEDS TO WORK - CURRENTLY NO ITEM AND ITEMPHOTO ASSOCIATION 03/21/21 */
//     // using magic method to associate the photo with the item
//     // createItem and setItem are not valid methods
//     //await newItem.addItemPhoto()

//     res.status(201).send(newItem)
//   } catch (err) {
//     next(err)
//   }
// })
