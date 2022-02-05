/* eslint-disable no-undef */
require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions:{
    ssl:{
      require: true,
      rejectUnauthorized: false
    }
  }
})

const cli = async() => {
  try{
    await sequelize.authenticate()
    const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT })
    blogs.map(blog => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    })
    sequelize.close()
  }catch(error){
    console.log('Error:', error)
  }
}

cli()



