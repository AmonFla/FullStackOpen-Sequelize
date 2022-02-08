const router = require('express').Router()

const ActiveSession = require('../models/activeSession')

router.delete('/', async(req, res) => {
  const activeSession = await ActiveSession.findOne({ userId: req.user, token: req.token })
  activeSession.destroy()
  res.sendStatus(202)
})

module.exports = router