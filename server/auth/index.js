const router = require('express').Router()
const User = require('../db/models/user')
const axios = require('axios')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, (err) => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const formData = req.body
    const address = encodeURIComponent(
      formData.street1 +
        ',' +
        formData.street2 +
        ',' +
        formData.city +
        ',' +
        formData.zip
    )
    const data = (
      await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&limit=1&access_token=${process.env.MAPBOX_PK}`
      )
    ).data
    if (data && data.features[0] && data.features[0].center) {
      formData.latitude = data.features[0].center[1]
      formData.longitude = data.features[0].center[0]
    } else {
      console.log(
        "ERROR: Can't resolve geoData for address, defaulting to NY area"
      )
      formData.latitude = 40.73061
      formData.longitude = -73.935242
    }

    const user = await User.create(formData)
    req.login(user, (err) => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
