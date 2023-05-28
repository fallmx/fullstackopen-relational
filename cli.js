require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to Postgres')

    const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT })
    
    blogs.forEach(({ author, title, likes }) => {
      console.log(`${author}: \'${title}\', ${likes} likes`)
    })

    sequelize.close()
  } catch (error) {
    console.error('Connection to Postgres failed:', error)
  }
}

main()
