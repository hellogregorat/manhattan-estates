const express = require('express')
const prisma = require('../prisma')
const { authRequired, requireRole } = require('../middleware/auth')
const upload = require('../middleware/upload')

const router = express.Router()

function withSeller(property) {
  let seller = { name: 'Manhattan Estates', email: 'hello@manhattanestates.com', phone: '+1 (212) 555-0199' }
  if (property.owner) {
    seller = { name: property.owner.name, email: property.owner.email, phone: property.owner.phone || 'not provided' }
  }
  const { owner, ...rest } = property
  return { ...rest, seller }
}

// ВАЖНО: конкретные пути объявлены раньше '/:id', иначе Express примет их за id

router.get('/', async (req, res) => {
  const properties = await prisma.property.findMany({
    include: { owner: true },
    orderBy: { createdAt: 'desc' }
  })
  res.json(properties.map(withSeller))
})

router.get('/mine', authRequired, requireRole('owner'), async (req, res) => {
  const properties = await prisma.property.findMany({
    where: { ownerId: req.user.id },
    include: { owner: true },
    orderBy: { createdAt: 'desc' }
  })
  res.json(properties.map(withSeller))
})

router.get('/mine/inquiries', authRequired, requireRole('owner'), async (req, res) => {
  const inquiries = await prisma.inquiry.findMany({
    where: { property: { ownerId: req.user.id } },
    include: { buyer: true, property: true },
    orderBy: { createdAt: 'desc' }
  })

  res.json(
    inquiries.map((i) => ({
      id: i.id,
      propertyId: i.propertyId,
      propertyTitle: i.property.title,
      buyerName: i.buyer.name,
      buyerEmail: i.buyer.email,
      message: i.message,
      createdAt: i.createdAt
    }))
  )
})

router.get('/favorites/mine', authRequired, async (req, res) => {
  const favorites = await prisma.favorite.findMany({
    where: { userId: req.user.id },
    include: { property: { include: { owner: true } } }
  })
  res.json(favorites.map((f) => withSeller(f.property)))
})

router.get('/:id', async (req, res) => {
  const property = await prisma.property.findUnique({
    where: { id: Number(req.params.id) },
    include: { owner: true }
  })
  if (!property) return res.status(404).json({ error: 'Объект не найден' })
  res.json(withSeller(property))
})

router.post('/', authRequired, requireRole('owner'), upload.array('images', 6), async (req, res) => {
  const { title, price, beds, baths, sqft, location, type, condition, description } = req.body

  if (!title || !price || !location || !type) {
    return res.status(400).json({ error: 'Заполните обязательные поля: название, цена, локация, тип' })
  }

  const images = (req.files || []).map((f) => `/uploads/${f.filename}`)

  const property = await prisma.property.create({
    data: {
      ownerId: req.user.id,
      title,
      price: Number(price),
      beds: Number(beds) || 0,
      baths: Number(baths) || 0,
      sqft: Number(sqft) || 0,
      location,
      type,
      condition: condition || 'Excellent',
      description: description || '',
      images: images.length ? images : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
      featured: false
    },
    include: { owner: true }
  })

  res.status(201).json(withSeller(property))
})

router.put('/:id', authRequired, requireRole('owner'), upload.array('images', 6), async (req, res) => {
  const id = Number(req.params.id)
  const existing = await prisma.property.findUnique({ where: { id } })
  if (!existing) return res.status(404).json({ error: 'Объект не найден' })
  if (existing.ownerId !== req.user.id) return res.status(403).json({ error: 'Это не ваш объект' })

  const { title, price, beds, baths, sqft, location, type, condition, description } = req.body
  const newImages = (req.files || []).map((f) => `/uploads/${f.filename}`)

  const property = await prisma.property.update({
    where: { id },
    data: {
      title: title ?? existing.title,
      price: price !== undefined ? Number(price) : existing.price,
      beds: beds !== undefined ? Number(beds) : existing.beds,
      baths: baths !== undefined ? Number(baths) : existing.baths,
      sqft: sqft !== undefined ? Number(sqft) : existing.sqft,
      location: location ?? existing.location,
      type: type ?? existing.type,
      condition: condition ?? existing.condition,
      description: description ?? existing.description,
      images: newImages.length ? newImages : existing.images
    },
    include: { owner: true }
  })

  res.json(withSeller(property))
})

router.delete('/:id', authRequired, requireRole('owner'), async (req, res) => {
  const id = Number(req.params.id)
  const existing = await prisma.property.findUnique({ where: { id } })
  if (!existing) return res.status(404).json({ error: 'Объект не найден' })
  if (existing.ownerId !== req.user.id) return res.status(403).json({ error: 'Это не ваш объект' })

  await prisma.favorite.deleteMany({ where: { propertyId: id } })
  await prisma.inquiry.deleteMany({ where: { propertyId: id } })
  await prisma.property.delete({ where: { id } })

  res.json({ deleted: true })
})

router.post('/:id/favorite', authRequired, async (req, res) => {
  const propertyId = Number(req.params.id)
  const existing = await prisma.favorite.findUnique({
    where: { userId_propertyId: { userId: req.user.id, propertyId } }
  })

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } })
    return res.json({ favorited: false })
  }

  await prisma.favorite.create({ data: { userId: req.user.id, propertyId } })
  res.json({ favorited: true })
})

router.post('/:id/inquire', authRequired, async (req, res) => {
  const propertyId = Number(req.params.id)
  const property = await prisma.property.findUnique({ where: { id: propertyId } })
  if (!property) return res.status(404).json({ error: 'Объект не найден' })

  const { message } = req.body
  const inquiry = await prisma.inquiry.create({
    data: { propertyId, buyerId: req.user.id, message: message || '' }
  })

  res.status(201).json({
    id: inquiry.id,
    propertyId,
    propertyTitle: property.title,
    buyerName: req.user.name,
    buyerEmail: req.user.email,
    message: inquiry.message,
    createdAt: inquiry.createdAt
  })
})

module.exports = router
