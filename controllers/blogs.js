const router = require('express').Router()

const { User, Blog } = require('../models')

const tokenExtractor = require('../util/tokenExtractor')

const { Op } = require('sequelize')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    const searchOp = { [Op.iLike]: `%${req.query.search}%` }

    where = {
      [Op.or]: [{ title: searchOp }, { author: searchOp }]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [['likes', 'DESC']]
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.json(blog)
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  if (req.blog) {
    if (req.blog.userId !== req.decodedToken.id){
      return res.status(401).json({ error: 'not the owner' })
    } 

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
