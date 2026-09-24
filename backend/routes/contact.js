const express = require('express')
const prisma = require('../prisma')

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Заполните все поля' })
  }

  const entry = await prisma.contactMessage.create({ data: { name, email, message } })
  res.status(201).json({ id: entry.id })
})

module.exports = router
