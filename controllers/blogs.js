const router = require('express').Router()

const { Blog } = require('../models')

const getBlog = async(req,res,next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async(req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.get('/:id',getBlog, async(req, res) => {
  if(req.blog){
    res.json(req.blog)
  }else{
    return res.status(404).end()
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

router.delete('/:id', getBlog, async(req, res) => {
  if(req.blog){
    req.blog.destroy()
    res.sendStatus(202)
  }else{
    res.sendStatus(404)
  }
})

router.put('/:id', getBlog, async(req,res) => {

  if(req.blog){
    req.blog.likes = req.body.likes
    req.blog.save()
    res.json(req.blog)
  }else{
    console.log(1)
    res.sendStatus(404)
  }
})

module.exports = router