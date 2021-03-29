const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('channel', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
})
