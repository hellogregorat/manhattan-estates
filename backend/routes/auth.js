const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../prisma')
const { authRequired } = require('../middleware/auth')

const router = express.Router()

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '7d' }
  )
}

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Заполните все поля' })
  }
  if (!['buyer', 'owner'].includes(role)) {
    return res.status(400).json({ error: 'Некорректная роль' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Пароль должен быть не короче 6 символов' })
  }

  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
  if (existing) return res.status(409).json({ error: 'Пользователь с такой почтой уже существует' })

  const passwordHash = bcrypt.hashSync(password, 10)
  const user = await prisma.user.create({
    data: { name, email: email.toLowerCase(), passwordHash, role, phone: '' }
  })

  const token = signToken(user)
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone } })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email: (email || '').toLowerCase() } })

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Неверная почта или пароль' })
  }

  const token = signToken(user)
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone } })
})

router.get('/me', authRequired, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } })
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' })
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone } })
})

module.exports = router
