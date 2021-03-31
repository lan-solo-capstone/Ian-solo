/* eslint-disable complexity */
/* eslint-disable no-warning-comments */
// this file contains authentication middlware to secure api routes

// check to see if admin
function ensureAdmin(req, res, next) {
  // console.log('hello', 'in ensureAdmin req.user', req.user)
  // console.log('hello', 'hello', 'in ensureAdmin req.user.admin', req.user.admin)
  // if (req.user) {
  //   res.status(403).send('you are not logged in!')
  // } else

  if (req.user.admin) {
    console.log('in ensureAdmin', 'hello', 'user is an admin')
    next()
  } else {
    console.log(
      'in ensureAdmin, passing to res.redirect',
      'hello',
      'hello',
      'hello'
    )
    res.status(401).send('You are not authorized to view this page!')
  }
}

function ensureAnyLogin(req, res, next) {
  try {
    if (!req.user.id) {
      console.log('in ensureAnyLogin. You are not logged in!')
      res.status(401).send('You must be logged in to perform this action.')
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

// check to see if user or admin
function ensureLogin(req, res, next) {
  try {
    // console.log('hello', 'in ensureLogin', 'req.user.id', req.user.id)
    console.log('hello', 'hello', 'req.params.userId', req.params.userId)
    // if you're not logged in, you can't do anything

    if (!req.user.id) {
      console.log('hello', 'you are not logged in!!!')
      res.send('you must log in first!!!')
    }
    console.log('hello', req.user)

    // console.log('hello', 'req.body', req.body)

    const id = req.user.id

    // if it's an admin, let them go do whatever
    if (req.user.admin) {
      console.log('hello', 'hello', 'admin, let them go!!!')
      next()
      return
    }
    // if they're a logged in user,
    // check if req.params.userId exists.
    if (req.params.userId) {
      // if it does exist, id and req.params.userId must match
      if (id === Number(req.params.userId)) {
        console.log(
          'hello',
          'hello',
          'found a req.params.userId that match!',
          'id',
          id,
          'req.params.userId',
          req.params.userId
        )
        next()
      } else {
        console.log(
          'there was a req.params but the id did not match',
          'id',
          id,
          'req.params.userId',
          req.params.userId
        )
        res.send('you must be authorized to view this page (from middleware)')
      }
    }
    // but if there is no req.params.userId, then at least the req.body.user.id and req.user.id have to match
    else if (req.body.user && id === req.body.user.id) {
      console.log('hello', 'req.body matches')
      next()
    } else {
      console.log('should not be authorized via middleware', 'hello', 'hello')
      res.status(401).send('In ensureLogin, you are not authorized!!')
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {ensureAdmin, ensureAnyLogin, ensureLogin}
