/* eslint-disable no-warning-comments */
// this file contains authentication middlware to secure api routes

// check to see if admin
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

// check to see if user or admin
function ensureLogin(req, res, next) {
  console.log('hello', 'in ensureLogin', 'req.user', req.user.id)
  console.log('hello', 'req.body', req.body)
  console.log('hello', 'req.params', req.params)

  const id = req.user.id

  // TODO: ask team if this is how they authenticated in previous projects -- JC

  // if it's an admin, let them go do whatever
  if (req.user.admin) {
    console.log('hello', 'hello', 'admin, let them go!!!')
    next()
    return
  }
  console.log('hello', 'moving on b/c not an admin')
  // if they're a logged in user,
  if (id) {
    console.log('found a req.user.id: ', id)
    // check if req.params.userId exists.
    if (req.params.userId) {
      // if it does exist, id and req.params.userId must match
      if (id === Number(req.params.userId)) {
        console.log('hello', 'hello', 'found a req.params.userId that match!')
        next()
      } else {
        console.log('there was a req.params but the id did not match')
        res.redirect('/')
      }
    }
    // but if there is no req.params.userId, then at least the req.body.user.id and req.user.id have to match
    else if (req.body.user && id === req.body.user.id) {
      console.log('hello', 'req.body matches')
      next()
    }
  } else {
    console.log('should not be authorized', 'hello', 'hello')
    res.redirect('/')
  }
}

module.exports = {ensureAdmin, ensureLogin}
