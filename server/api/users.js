const router = require('express').Router()
const {User, Item, ItemPhoto} = require('../db/models')
const {ensureAdmin, ensureLogin} = require('./middleware')
const axios = require('axios')

module.exports = router

// -------- all routes here are mounted on /api/users -------- /

// GET all users
// mounted on /api/users and access limited to admins
router.get('/', ensureAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'email',
        'firstName',
        'middleName',
        'lastName',
        'street1',
        'street2',
        'city',
        'state',
        'zip',
      ],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET single user
// mounted on /api/users/:userId
// any admins can access this route
// users can also access their own profile, even if they're not admin
router.get('/:userId', ensureLogin, async (req, res, next) => {
  try {
    const {userId} = req.params
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Item,
          attributes: [
            'id',
            'itemListName',
            'description',
            'itemType',
            'status',
            'dateListed',
          ],
          include: [
            {
              model: ItemPhoto,
              attributes: ['photoTitle', 'cloudREF', 'downloadURL'],
            },
          ],
        },
      ],
    })

    if (!user) {
      res.status(404).send('This user does not exist in our DB apparently!')
      return
    }

    res.json(user)
  } catch (err) {
    next(err)
  }
})

// PUT single user
// mounted on /api/users/:userId
// admins only
router.put('/:userId', ensureLogin, async (req, res, next) => {
  //resolve lat & lon
  let latitude, longitude

  try {
    const address = encodeURIComponent(
      req.body.street1 + ',' + req.body.city + ',' + req.body.zip
    )
    console.log('resolving: ', address)
    const data = (
      await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?bbox=-74.25909,40.477399,-73.7008391836855,40.917577&types=address&limit=1&access_token=${process.env.MAPBOX_PK}`
      )
    ).data

    if (
      data &&
      data.features[0] &&
      data.features[0].relevance > 0.9 &&
      data.features[0].center
    ) {
      latitude = data.features[0].center[1]
      longitude = data.features[0].center[0]
    } else {
      console.error("ERROR: Can't resolve address")
      latitude = 40.73061
      longitude = -73.935242
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
  //end resolve lat & lon

  try {
    const {userId} = req.params
    const {
      firstName,
      middleName,
      lastName,
      street1,
      street2,
      city,
      state,
      zip,
      email,
    } = req.body
    const user = await User.findByPk(userId)

    await user.update({
      firstName,
      middleName,
      lastName,
      street1,
      street2,
      city,
      state,
      zip,
      email,

      //add calculated changes to lat & lon
      latitude: latitude,
      longitude: longitude,
    })

    res.json(user)
  } catch (err) {
    next(err)
  }
})

// DELETE a single user
// mounted on /api/users/:userId
// admins only
router.delete('/:userId', ensureAdmin, async (req, res, next) => {
  try {
    const {userId} = req.params
    const deletedUser = await User.findByPk(userId)
    const associatedItems = await Item.findAll({where: {userId: userId}})

    if (!deletedUser) {
      res.status(404).send('No such user exists in our DB apparently!')
      return
    }

    // delete associated items and itemPhotos first.

    await Promise.all(
      associatedItems.map(async (itemObj) => {
        let photos = await itemObj.getItemPhotos()

        await itemObj.removeItemPhotos(photos)
      })
    )

    // find disassociated itemPhotos & delete
    let orphanPhotos = await ItemPhoto.findAll({where: {itemId: null}})

    await Promise.all(
      orphanPhotos.map(async (photo) => {
        await photo.destroy()
      })
    )

    let userItems = await deletedUser.getItems()

    await Promise.all(
      userItems.map(async (itemObj) => {
        await itemObj.destroy()
      })
    )

    await deletedUser.destroy()
    res.json(deletedUser)
  } catch (err) {
    next(err)
  }
})
