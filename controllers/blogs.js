const router = require('express').Router()
const middleware = require('../util/middleware')

const { Blog, User } = require('../models')

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
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include:{
      model: User,
      attributes: ['name']
    }
  })
  res.json(blogs)
})

router.get('/:id',getBlog, async(req, res) => {
  res.json(req.blog)
})

router.post('/', middleware.userExtractor, async(req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user })
  res.json(blog)
})

router.delete('/:id', getBlog, middleware.userExtractor, async(req, res) => {
  if(req.blog.userId === req.user){
    req.blog.destroy()
    res.sendStatus(202)
  }else{
    res.sendStatus(401)
  }

})

router.put('/:id', getBlog, async(req,res) => {

  req.blog.likes = req.body.likes
  req.blog.save()
  res.json(req.blog)
})

module.exports = router