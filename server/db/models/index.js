const User = require('./user')
const Item = require('./item')
const ItemPhoto = require('./itemPhoto')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Item)
Item.belongsTo(User)

ItemPhoto.belongsTo(Item)
Item.hasMany(ItemPhoto)

module.exports = {
  User,
  Item,
  ItemPhoto,
}
