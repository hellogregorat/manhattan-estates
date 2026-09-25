const express = require('express')
const router = express.Router()

const SYSTEM_PROMPT = `You are the support assistant for Manhattan Estates, a luxury NYC real estate showcase website.
Help visitors with: browsing and filtering property listings, registering as a buyer or as a property owner,
listing their own property for sale, contacting a seller, and saving properties to favorites.
Answer briefly and helpfully, in the same language the user writes in.
If a question is unrelated to the site, politely say you can only help with questions about this site.`

router.post('/', async (req, res) => {
  const { message, history } = req.body
  if (!message) return res.status(400).json({ error: 'Пустое сообщение' })

  const provider = process.env.CHAT_PROVIDER || 'anthropic'

  try {
    if (provider === 'anthropic') {
      if (!process.env.ANTHROPIC_API_KEY) {
        return res.status(500).json({ error: 'ANTHROPIC_API_KEY не задан в .env' })
      }

      const messages = [...(history || []), { role: 'user', content: message }]

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5',
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          messages
        })
      })

      const data = await response.json()
      if (!response.ok) {
        return res.status(502).json({ error: data.error?.message || 'Ошибка Anthropic API' })
      }

      const reply = (data.content || []).map((b) => b.text || '').join('\n')
      return res.json({ reply })
    }

    if (provider === 'openai') {
      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY не задан в .env' })
      }

      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...(history || []),
        { role: 'user', content: message }
      ]

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages
        })
      })

      const data = await response.json()
      if (!response.ok) {
        return res.status(502).json({ error: data.error?.message || 'Ошибка OpenAI API' })
      }

      const reply = data.choices?.[0]?.message?.content || ''
      return res.json({ reply })
    }

    if (provider === 'gemini') {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'GEMINI_API_KEY не задан в .env' })
      }

      const contents = [
        ...(history || []).map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ]

      const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents
          })
        }
      )

      const data = await response.json()
      if (!response.ok) {
        return res.status(502).json({ error: data.error?.message || 'Ошибка Gemini API' })
      }

      const reply = data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('\n') || ''
      return res.json({ reply })
    }

    return res.status(500).json({ error: 'Неизвестный CHAT_PROVIDER в .env (укажи anthropic, openai или gemini)' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Не удалось получить ответ от AI' })
  }
})

module.exports = router
