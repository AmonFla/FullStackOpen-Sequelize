const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const ActiveSession = require('./../models/activeSession')

const errorHundler = (error, req, res, next) => {

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

const getTokenFrom = async (req, resp,next) => {
  const authorization = req.get('authorization')
  req.token = null
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    const token = authorization.substring(7)
    const activeSession = await ActiveSession.findOne({ token })
    if(activeSession)
      req.token = token
    else{
      return resp.status(401).json({ error: 'token invalid' })
    }
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