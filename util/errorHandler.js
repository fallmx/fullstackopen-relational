const errorHandler = (err, req, res, next) => {
  console.error(err)
  return res.status(400).send({ error: err.message })
}

module.exports = errorHandler
