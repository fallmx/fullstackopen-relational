const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to Postgres')
  } catch (error) {
    console.error('Connection to Postgres failed:', error)
    return process.exit(1)
  }
}

module.exports = { connectToDatabase, sequelize }
