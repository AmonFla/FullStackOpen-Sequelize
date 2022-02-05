
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
module.exports = { errorHundler,unknownEndpoint  }