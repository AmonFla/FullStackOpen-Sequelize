const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, Blog } = require('../models')


router.get('/', async(req, res) => {
  const users = await User.findAll({
    include:{
      model: Blog,
      attributes: ['title']
    }
  })
  res.json(users)
})

router.get('/:id', async(req, res) => {
  const user = await User.findByPk(req.params.id,{
    attributes: ['name', 'username'],
    include:{
      model: Blog,
      as: 'readings',
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId']
      },
      through: {
        attributes: ['read','id']
      },
    }
  })
  res.json(user)
})

router.post('/', async(req, res) => {
  const user = await User.create({ ...req.body, password: await bcrypt.hash(req.body.password, 10) })
  res.json(user)
})


router.put('/:username', async(req,res) => {

  const user = await User.findOne({ where:{ username: req.params.username } })
  user.username = req.body.username
  user.save()
  res.json(user)
})

module.exports = router