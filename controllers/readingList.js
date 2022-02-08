const router = require('express').Router()
const middleware = require('../util/middleware')

const { ReadingList } = require('../models')

router.post('/', async(req, res) => {
  const reading = await ReadingList.create({ ...req.body })
  res.json(reading)
})

router.put('/:id', middleware.userExtractor, async(req,res) => {

  const reading = await ReadingList.findByPk(req.params.id)
  if (reading.userId === req.user){
    reading.read = req.body.read
    reading.save()
    res.sendStatus(202)
  }else{
    res.sendStatus(401)
  }
})

module.exports = router