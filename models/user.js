const { DataTypes, Model }= require('sequelize')
const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING(100),
    allowNull: false
  },
  username:{
    type: DataTypes.STRING,
    unique:true,
    allowNull: false,
    validate:{
      isEmail: true
    }
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  disabled:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: false
  }
},{
  sequelize,
  underscored: true,
  modelName: 'users'
})

module.exports = User