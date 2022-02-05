/* eslint-disable no-undef */
const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions:{
    ssl:{
      require: true,
      rejectUnauthorized: false
    }
  }
})

const connectToDb = async () => {

  try{
    await sequelize.authenticate()
    console.log('Connected to DDBB')
  }catch(error) {
    console.log('Fail to connecto to DDBB', error)
    return process.exit(1)

  }
  return null
}

module.exports = { connectToDb, sequelize }