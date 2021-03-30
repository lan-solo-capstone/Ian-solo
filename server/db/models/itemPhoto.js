const Sequelize = require('sequelize')
const db = require('../db')

const ItemPhoto = db.define('itemPhoto', {
  photoTitle: {type: Sequelize.STRING},
  photoFile: {
    type: Sequelize.BLOB,
  },
  cloudREF: {
    type: Sequelize.TEXT,
  },
  downloadURL: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2FfreeShareDefaultPic.jpeg?alt=media&token=5f6c8b0b-da4e-4138-b4fb-5c4fb4a4319c',
  },
  itemIdTEMP: {
    type: Sequelize.INTEGER,
  },
})

module.exports = ItemPhoto
