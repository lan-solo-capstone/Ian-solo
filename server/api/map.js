const router = require('express').Router()
module.exports = router

//already mounted on /api/map
router.get('/key', async (req, res, next) => {
  try {
    res.send(process.env.MAPBOX_PK)
  } catch (err) {
    next(err)
  }
})
