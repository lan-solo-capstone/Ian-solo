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
  console.log(`seeded ${itemPhotos.length} itemPhotos`)

  console.log('associating item to photos')

  // associating items to photos
  // find out the row counts of item table

  const itemRowCount = await Item.count()

  // yf 03.31.21 loop through each item and associate photos to each item, then associate item to random users

  for (let i = 1; i <= itemRowCount; i++) {
    const item = await Item.findAll({where: {itemIdTEMP: i}})

    const photos = await ItemPhoto.findAll({where: {itemIdTEMP: i}})

    await Promise.all(
      photos.map((photoObj) => {
        return photoObj.setItem(item[0])
      })
    )
  }
  console.log('associating user to items')
  // associating user to items
  // find out the row counts of user table
  const userRowCount = await User.count()

  // for each user, associate all the items belong to the user
  for (let i = 1; i <= userRowCount; i++) {
    const user = await User.findAll({where: {userIdTEMP: i}})

    const userItems = await Item.findAll({where: {userIdTEMP: i}})

    await Promise.all(
      userItems.map((itemObj) => {
        return itemObj.setUser(user[0])
      })
    )
  }

  // end of seeding code
}
// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
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
