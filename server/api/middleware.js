// this file contains authentication middlware to secure api routes

// check to see if admin
function ensureAdmin(req, res, next) {
  if (req.user.admin) {
    next()
  } else {
    res.status(401).send('You are not authorized to view this page!')
  }
}

// check to see if the user is logged in at all
function ensureAnyLogin(req, res, next) {
  try {
    if (!req.user) {
      res.status(401).send('You must be logged in to perform this action.')
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

function ensureLogin(req, res, next) {
  try {
    const id = req.user.id

    // if it's an admin, let them go do whatever
    if (req.user.admin) {
      next()

      // code breaks if this return is not here. Not sure why. -- JC 3.31.21
      return
    }

    // if they're a logged in user,
    // check if req.params.userId exists.
    if (req.params.userId) {
      // if it does exist, id and req.params.userId must match
      if (id === Number(req.params.userId)) {
        next()
      } else {
        res.send('you must be authorized to view this page (from middleware)')
      }
    }

    // but if there is no req.params.userId, then at least the req.body.user.id and req.user.id have to match
    else if (req.body && id === req.body.user.id) {
      next()
    } else {
      res.status(401).send('In ensureLogin, you are not authorized!!')
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {ensureAdmin, ensureAnyLogin, ensureLogin}
