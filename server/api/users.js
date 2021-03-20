const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// all routes here are mounted on /api/users

// /api/users/post will be sent to newItemForm.js
router.use('/post', require('./newitemform.js'))

// GET all users
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
