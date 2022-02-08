const jwt = require('jsonwebtoken')
const router = require('express').Router()
const bcrypt = require('bcrypt')

const { SECRET } = require('../util/config')
const User = require('../models/user')
const ActiveSession = require('../models/activeSession')

router.post('/', async(req, res) => {
  const user = await User.findOne({ where:{ username: req.body.username, disabled: false } })

  if(!(user && bcrypt.compare(req.body.password, user.password))){
    return res.status(400).json({ error:'invalid credentials' })
  }

  const userTokenData = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userTokenData, SECRET)
  await ActiveSession.create({ userId: user.id, token })

  res.status(200).send({ token, username:user.username, name: user.name })

})

module.exports = router