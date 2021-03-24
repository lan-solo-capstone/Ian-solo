'use strict'

const db = require('../server/db')
const {User, Item, ItemPhoto} = require('../server/db/models')

//userData
const users = [
  {
    firstName: `Diego`,
    middleName: ``,
    lastName: `Abreu`,
    email: `diego@mail.com`,
    admin: true,
    password: `password`,
    street1: `3328 Tiemann Ave`,
    street2: ``,
    city: `Bronx`,
    state: 'NY',
    zip: `10469`,
    latitude: 40.87645,
    longitude: -73.84273,
  },

  {
    firstName: `Melinda`,
    middleName: ``,
    lastName: `Armbruster`,
    email: `melinda@mail.com`,
    password: `password`,
    street1: `31 Saint Johns Pl`,
    street2: ``,
    city: `Brooklyn`,
    state: 'NY',
    zip: `11217`,
    latitude: 40.67824,
    longitude: -73.97802,
  },

  {
    firstName: `Yoshie`,
    middleName: ``,
    lastName: `Fujiwara`,
    email: `yoshie@mail.com`,
    password: `password`,
    street1: `115 Broadway`,
    street2: `3A`,
    city: `New York`,
    state: 'NY',
    zip: `10006`,
    latitude: 40.708832,
    longitude: -74.011497,
  },

  {
    firstName: `Jae`,
    middleName: ``,
    lastName: `Chung`,
    email: `Jae@mail.com`,
    admin: true,
    password: `password`,
    street1: `222 E 93rd St`,
    street2: `#APT 11C`,
    city: `New York`,
    state: 'NY',
    zip: `10002`,
    latitude: 40.78231,
    longitude: -73.94947,
  },
]

//item data
const items = [
  {
    itemListName:
      'IBIS Titanium Racing Road Bike USA SEBASTOPOL 56cm Made in California',
    description:
      'Ibis TI Bike, highly collectible, Superb titanium tube set, superb ride, 56CM top tube, semi sloping geo. 52cm seat tube. FYI, I am keeping the saddle, wheel set and pedals for my other bike.Questions welcomed.',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Closed',
    deliveryOption: 'Pickup_Only',
    userId: 1,
  },
  {
    itemListName: 'stove and pan',
    description:
      'Another band member left this in my flight case 15 years ago and does not want it back. I don’t have microphones or an AC adapter for it. I have never even tried to plug it in or turn it on.If you want it, please email me with a possible pickup time.',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 1,
  },
  {
    itemListName: 'Queen bed frame and duvet',
    description:
      "A queen metal bedframe. Also duvet + cover + pillow. No mattress. The duvet has only been lightly used and are only several months old / the duvet cover just needs a regular wash in the laundry. I would have kept them but I needed to move fast and wasn't able to take them with me.",
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 2,
  },
  {
    itemListName: 'Gucci Gold Sandals',
    description:
      'Gold Sandals in good condition. It comes with the box and a dust bag. Worn once. Size 38.',
    itemType: 'Offer',
    itemCondition: 'Gently_Used',
    status: 'Open',
    deliveryOption: 'Pickup_Only',
    userId: 4,
  },
  {
    itemListName: 'Gucci Boots',
    description:
      'ISO of Gucci Boots since I lost my pair of Gucci sandals. Size 38.',
    itemType: 'Seeking',
    itemCondition: 'New',
    status: 'Open',
    userId: 4,
  },
  {
    itemListName: 'FREE 87 REGAL AFT CABIN-NEEDS MOTOR',
    description:
      '87 REGAL 23 FT. NEEDS MOTOR. FULL V CABIN PLUS AFT CABIN! SLEEPS 6!! ,FRIDGE SINK,STOVE,FULL HEAD WITH TANK! JUST BOTTOM PAINTED 5 YR PAINT! Never got around to putting in an engine and was just going to donate to make room for my other boat. hard to work with the charitable org. during this pandemic so I figured I give it a shot to sell for same as donation. If you Know way around boats could pick up a deal. Boat is in water and would have to pick it up at nearby ramp.Very LOCAL Water delivery also possible. Thanks.',
    itemType: 'Offer',
    itemCondition: 'Used',
    status: 'Open',
    userId: 3,
  },
  {
    itemListName: 'Bike',
    description: 'ISO of Bike',
    itemType: 'Seeking',
    itemCondition: 'Used',
    status: 'Open',
    userId: 3,
  },
  {
    itemListName: 'Bike Helmet',
    description: 'ISO of Bike Helmet',
    itemType: 'Seeking',
    itemCondition: 'New',
    status: 'Open',
    userId: 3,
  },
  {
    itemListName: 'A puppy',
    description: 'ISO of cute puppy - prefer a pug',
    itemType: 'Seeking',
    itemCondition: 'New',
    status: 'Closed',
    userId: 1,
  },
]

const itemPhotos = [
  {
    photoTitle: 'default.jpeg',
    downloadURL:
      'https://images-na.ssl-images-amazon.com/images/I/81vkislowDL._AC_SL1500_.jpg',
    itemId: 9,
  },
  {
    photoTitle: 'default.jpeg',
    downloadURL: 'public/images/freeShareDefaultPic.jpeg',
    itemId: 8,
  },
  {
    photoTitle: 'default.jpeg',
    downloadURL: 'public/images/freeShareDefaultPic.jpeg',
    itemId: 7,
  },
  {
    photoTitle: 'default.jpeg',
    downloadURL: 'public/images/freeShareDefaultPic.jpeg',
    itemId: 3,
  },
  {
    photoTitle: 'boots',
    cloudREF: '/images/boots.webp',
    downloadURL:
      'https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2Fboots.webp?alt=media&token=4cc149ba-2e57-4397-8a89-3d5c79a07c99',
    itemId: 5,
  },
  {
    photoTitle: 'pan',
    cloudREF: '/images/pan.jfif',
    downloadURL:
      'https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2Fpan.jfif?alt=media&token=75c2ea85-57ac-48c2-af08-69f83b9f9f0b',
    itemId: 2,
  },
  {
    photoTitle: 'stove',
    cloudREF: '/images/stove.jpg',
    downloadURL:
      'https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2Fpan.jfif?alt=media&token=75c2ea85-57ac-48c2-af08-69f83b9f9f0b',

    itemId: 2,
  },
  {
    photoTitle: 'watch',
    cloudREF: '/images/watch.jpg',
    downloadURL:
      'https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2Fwatch.jpg?alt=media&token=cb3cfdb2-bcda-44de-a289-c6eb1b8abf82',
    itemId: 4,
  },
]
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
