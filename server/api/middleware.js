/* eslint-disable no-warning-comments */
// this file contains authentication middlware to secure api routes

const User = require('../db/models/user')

function ensureAdmin(req, res, next) {
  console.log('hello', 'in ensureAdmin req.user', req.user)
  console.log('hello', 'hello', 'in ensureAdmin req.user.admin', req.user.admin)

  if (req.user && req.user.admin) {
    next()
  } else {
    // TODO: this is sending the 403 but the front end is still displaying
    // "Loading, or we have no users"
    // need to figure out how to get the page to render with "unauthorized" -- JC 3/22/2021
    res.sendStatus(403)
  }
}

function ensureLogin(req, res, next) {
  const id = req.user.id
  const passportId = req.session.passport.user
  console.log('hello', 'in ensureLogin', req.user, req.session.passport)
  if (id && id === passportId) {
    next()
  } else {
    res.sendStatus(401)
  }
}

module.exports = {ensureAdmin, ensureLogin}
