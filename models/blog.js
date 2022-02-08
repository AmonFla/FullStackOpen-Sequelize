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
      min: {
        args: 1991,
        msg: 'year must be greater than or equal to 1991'
      },
      max: {
        args: new Date().getFullYear(),
        msg: `year must be less than or equal to ${new Date().getFullYear()}`
      },
    }
  }

},{
  sequelize,
  underscored: true,
  modelName: 'blogs'
})


module.exports = Blog