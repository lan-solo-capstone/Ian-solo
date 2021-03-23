const router = require('express').Router()
const {Item, ItemPhoto} = require('../db/models')
module.exports = router

/*** YF 03.21.21 THIS API File is to test out the blob image display - will not be a part of final product */

// /api/view_images

router.get('/:id', async (req, res, next) => {
  try {
    const rawImage = await ItemPhoto.findByPk(req.params.id)
    console.log('row image', rawImage)

    const pic = rawImage.photoFile.decode('utf-8')
    console.log(pic)

    // const reader = new FileReader()
    // console.log('reader', reader)
    // reader.readAsDataUrl(rawImage.photoFile)

    // reader.onloadend = function () {
    //   const base64data = reader.result
    //   console.log(base64data)
    // }

    // encoding blob
    // `<img src="data:image/jpg;base64,${Buffer.from(
    //     rawImage.photoFile
    //   ).toString('base64')}/>`

    res.send('hello!  i am testing db blob image...')
  } catch (err) {
    next(err)
  }
})
