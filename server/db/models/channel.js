const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

module.exports = db.define(
  'channel',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  }

  // {
  //   userId01: {},
  //   userId02: {},
  // },
  // {
  //   defaultScope: {
  //     include: [{model: User}],
  //   },
  // }
)
