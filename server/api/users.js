/* eslint-disable no-warning-comments */
const router = require('express').Router()
const {User, Item} = require('../db/models')
module.exports = router

// all routes here are mounted on /api/users

// /api/users/post will be sent to newItemForm.js
// TODO: change the capitalization
router.use('/post', require('./newitemform.js'))

// GET all users
// TODO: limit access to admins only
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
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
// mounted on api/users/:userId
// TODO: limit access to this route to admins only
router.get('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    console.log('hello', 'typeof userId', typeof userId)
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Item,
          attributes: [
            'id',
            'itemListName',
            'description',
            'itemType',
            'dateListed',
          ],
        },
      ],
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// PUT single user
// mounted on api/users/:userId
// TODO: limit access to admins only
router.put('/:userId', async (req, res, next) => {
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
    })

    res.json(user)
  } catch (err) {
    next(err)
  }
})

// DELETE a single user
// TODO: limit access to admins only

router.delete('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    const deletedUser = await User.findByPk(userId)
    await deletedUser.destroy()
    res.json(deletedUser)
  } catch (err) {
    next(err)
  }
})
