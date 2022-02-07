
const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./util/config')
const { connectToDb } = require('./util/db')
const middleware = require('./util/middleware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')

app.use(express.json())
app.use(middleware.getTokenFrom)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)





app.use(middleware.unknownEndpoint)
app.use(middleware.errorHundler)

const start = async() => {
  await connectToDb()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()