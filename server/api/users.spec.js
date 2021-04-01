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

    // cannot run this test any more because it requires admin rights
    // disabling until I figure out how to run it with admin rights -- JC 3.31.21
    // xit('GET /api/users', async () => {
    //   const res = await request(app).get('/api/users').expect(200)

    //   expect(res.body).to.be.an('array')
    //   expect(res.body[0].email).to.be.equal(codysEmail)
    // })
  }) // end describe('/api/users')
}) // end describe('User routes')
