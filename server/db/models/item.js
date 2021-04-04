const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  itemListName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  itemType: {
    type: Sequelize.ENUM,
    values: ['Offer', 'Seeking'],
    allowNull: true,
  },

  itemCondition: {
    type: Sequelize.ENUM,
    values: ['New', 'Gently Used', 'Used'],
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM,
    values: ['Open', 'OnHold', 'Closed'],
    allowNull: true,
    defaultValue: 'Open',
  },
  deliveryOption: {
    type: Sequelize.ENUM,
    values: ['Pickup_Only', 'Will_Deliver', 'No_Contact_Pickup'],
    allowNull: true,
    defaultValue: 'Pickup_Only',
  },
  dateListed: {
    type: Sequelize.DATE,
    defaultValue: Date.now(),
  },
  dateClosed: {
    type: Sequelize.DATE,
  },
  dateOnHold: {
    type: Sequelize.DATE,
  },
  itemIdTEMP: {
    type: Sequelize.INTEGER,
  },

  userIdTEMP: {
    type: Sequelize.INTEGER,
  },
})

module.exports = Item
