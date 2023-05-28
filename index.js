const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const express = require('express')
const app = express()

const blogsRouter = require('./controllers/blogs')

app.use(express.json())

app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

start()
