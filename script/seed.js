'use strict'

const db = require('../server/db')
const {User, Item, ItemPhoto, Channel, Message} = require('../server/db/models')

// YF.03.25.21  seed data files
const {
  items,
  users,
  itemPhotos,
  channels,
  messages,
} = require('./seedData/seedDataIndex')

// seed function

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    users.map((user) => {
      return User.create(user)
    })
  )
  console.log(`seeded ${users.length} users`)

  await Promise.all(
    items.map((item) => {
      return Item.create(item)
    })
  )
  console.log(`seeded ${items.length} items`)

  await Promise.all(
    itemPhotos.map((photo) => {
      return ItemPhoto.create(photo)
    })
  )
  console.log(`seeded ${items.length} items`)

  await Promise.all(
    channels.map((channel) => {
      return Channel.create(channel)
    })
  )
  console.log(`seeded ${channels.length} items`)

  await Promise.all(
    messages.map((message) => {
      return Message.create(message)
    })
  )
  console.log(`seeded ${messages.length} items`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  // await db.sync({force: true})
  console.log('seeding...')
  try {
    await seed()
    console.log(`seeded successfully`)
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
