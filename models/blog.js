const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author:{
    type: DataTypes.STRING(200),
    allowNull: true
  },
  url:{
    type: DataTypes.TEXT,
    allowNull: false
  },
  title:{
    type: DataTypes.STRING(200),
    allowNull: false
  },
  likes:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  year:{
    type: DataTypes.INTEGER,
    allowNull: false,
    validate:{
      min: 1991,
      max: new Date().getFullYear(),
      msg: `year mus be between 1991 and ${new Date().getFullYear()}`
    }
  }

},{
  sequelize,
  underscored: true,
  modelName: 'blogs'
})


module.exports = Blog