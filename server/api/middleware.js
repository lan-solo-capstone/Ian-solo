// this file contains authentication middlware to secure api routes

const User = require('../db/models/user')

function ensureAdmin(req, res, next) {
  if (req.user && req.user.adminStatus) {
    next()
  } else {
    res.sendStatus(403)
  }
}

function ensureLogin(req, res, next) {
  const {id} = req.user
  const passportId = req.session.passport.user

  if (id && id === passportId) {
    next()
  } else {
    res.sendStatus(401)
  }
}

module.exports = {ensureAdmin, ensureLogin}
