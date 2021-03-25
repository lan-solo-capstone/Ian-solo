const User = require('./user')
const Item = require('./item')
const ItemPhoto = require('./itemPhoto')
const Message = require('./message')
const Channel = require('./channel')
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

// tentative schema for chat -- JC 03/24/21
// currently this schema implies that if Abby and Babs are chatting w/ each other,
// if Babs clicks on a second item offered by Abby and starts another chat with Abby,
// that chat will be on the same channel as the first chat

// Many-to-Many self-referencing association to create chat channel
User.belongsToMany(User, {
  through: Channel,
  as: 'conversationStarter',
  // as: 'conversations',
  foreignKey: 'firstUser',
  otherKey: 'secondUser',
})

// One-to-many User-to-Message
User.hasMany(Message)
Message.belongsTo(User)

Channel.hasMany(Message)
Message.belongsTo(Channel)

module.exports = {
  User,
  Item,
  ItemPhoto,
  Message,
  Channel,
}
