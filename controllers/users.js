const router = require('express').Router()

const { User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })

  if (user) {
    const newUsername = req.body.username

    if (!newUsername) throw Error('missing field username')

    user.username = newUsername
    await user.save()
    res.json({ username: newUsername })
  } else {
    res.status(404).end()
  }
})

module.exports = router
