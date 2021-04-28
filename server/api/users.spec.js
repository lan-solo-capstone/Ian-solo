/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    const zip = '11111'
    const firstName = 'Cody'
    const lastName = 'Rodriguez'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        zip,
        firstName,
        lastName,
      })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
