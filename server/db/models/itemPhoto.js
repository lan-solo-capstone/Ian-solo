const Sequelize = require('sequelize')
const db = require('../db')

const ItemPhoto = db.define('itemPhoto', {
  photoTitle: {type: Sequelize.STRING},
  photoFile: {
    type: Sequelize.BLOB,
  },
})

module.exports = ItemPhoto
