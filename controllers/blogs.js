const router = require('express').Router()

const { Blog } = require('../models')


router.get('/', async(req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.get('/:id', async(req, res) => {
  try{
    const blog = await Blog.findByPk(req.params.id)
    res.json(blog)
  }catch(error){
    return res.status(400).json({ error })
  }
})
router.post('/', async(req, res) => {
  try{
    const blog = await Blog.create(req.body)
    res.json(blog)
  }catch(error){
    return res.status(400).json({ error })
  }
})

router.delete('/:id', async(req, res) => {
  try{
    await Blog.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(202)
  }catch(error){
    return res.status(400).json({ error })
  }
})

module.exports = router