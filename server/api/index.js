const router = require('express').Router()
module.exports = router

//this is to test the uploaded images

router.use('/users', require('./users'))
router.use('/map', require('./map'))
router.use('/items', require('./items'))
router.use('/view_images', require('./view_images'))
router.use('/channels', require('./channels'))
router.use('/messages', require('./messages'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
