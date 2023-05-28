const router = require('express').Router()

const { User, Blog } = require('../models')

const tokenExtractor = require('../util/tokenExtractor')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.json(blog)
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    const likes = req.body.likes

    if (!likes) throw Error('missing field likes')

    req.blog.likes = likes
    await req.blog.save()
    res.json({ likes })
  } else {
    res.status(404).end()
  }
})

module.exports = router
