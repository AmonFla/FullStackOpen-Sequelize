const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const errorHundler = (error, req, res, next) => {

  console.log(error)
  if (error.name === 'NotFound') {
    return res.sendStatus(404)
  }else if (error.name === 'SequelizeValidationError'){
    return res.status(400).json({ error: error.message })
  }else if(error) {
    return res.status(400).json({ error })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const getTokenFrom = (req, resp,next) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    req.token = authorization.substring(7)
  }else{
    req.token = null
  }
  next()
}

const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, SECRET)
  if(!req.token || !decodedToken.id){
    return res.status(401).json({ error: 'token mission or invalid' })
  }
  req.user = decodedToken.id
  next()
}

module.exports = { errorHundler,unknownEndpoint,getTokenFrom ,userExtractor }