const Sequelize = require('sequelize')
const db = require('../db')

const ItemPhoto = db.define('itemPhoto', {
  photoTitle: {type: Sequelize.STRING},
  photoFile: {
    type: Sequelize.BLOB,
  },
  photoURL: {
    type: Sequelize.TEXT,
    defaultValue: 'public/images/freeShareDefaultPic.jpeg',
  },
})

module.exports = ItemPhoto
