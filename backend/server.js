require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')

const seed = require('./seed')
const authRoutes = require('./routes/auth')
const propertyRoutes = require('./routes/properties')
const chatRoutes = require('./routes/chat')
const contactRoutes = require('./routes/contact')

const app = express()

const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'
app.use(cors({ origin: allowedOrigin }))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/contact', contactRoutes)

app.get('/api/health', (req, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 5000

seed()
  .then(() => {
    app.listen(PORT, () => console.log(`Manhattan Estates API запущен на http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('Ошибка при запуске (проверка/сид базы данных):', err)
    process.exit(1)
  })
