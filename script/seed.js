'use strict'

const db = require('../server/db')
const {User, Item, ItemPhoto} = require('../server/db/models')

// YF.03.25.21  seed data files
const {items, users, itemPhotos} = require('./seedData/seedDataIndex')

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
  console.log(`seeded ${items.length} itemPhotos`)

  console.log('associating item to photos, then to a user')

  // function to generate randome UserId
  function getRandomUserId(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  // associating items to photos
  // find out the row counts of item table

  const {count} = await Item.findAndCountAll()
  const itemRowCount = count

  // yf 03.31.21 loop through each item and associate photos to each item, then associate item to random users

  for (let i = 1; i <= itemRowCount; i++) {
    const item = await Item.findAll({where: {itemIdTEMP: i}})

    const photos = await ItemPhoto.findAll({where: {itemIdTEMP: i}})

    await Promise.all(
      photos.map((photoObj) => {
        return photoObj.setItem(item[0])
      })
    )

    // YF 03.30.21  We are randomly assigning users to our items
    const user = await User.findByPk(getRandomUserId(1, 36))

    await item[0].setUser(user)
  }

  console.log('done seeding')
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
