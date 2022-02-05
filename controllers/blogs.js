const router = require('express').Router()

const { Blog } = require('../models')

const getBlog = async(req,res,next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if(req.blog){
    next()
  }else{
    const e = new Error('Blog not found')
    e.name = 'NotFound'
    throw e
  }
}

router.get('/', async(req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.get('/:id',getBlog, async(req, res) => {
  res.json(req.blog)
})

router.post('/', async(req, res) => {
  const blog = await Blog.create(req.body)
  res.json(blog)
})

router.delete('/:id', getBlog, async(req, res) => {
  req.blog.destroy()
  res.sendStatus(202)
})

router.put('/:id', getBlog, async(req,res) => {

  req.blog.likes = req.body.likes
  req.blog.save()
  res.json(req.blog)
})

module.exports = router