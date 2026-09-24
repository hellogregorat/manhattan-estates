import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { api } from '../api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError(null)
    try {
      await api.post('/contact', form)
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('idle')
      setError(err.message)
    }
  }

  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get in <span className="text-gradient">Touch</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Questions about buying, listing a property, or the platform itself — reach out and we'll get back to you.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="glass rounded-2xl p-6 space-y-6 h-fit">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#d4af37] mt-0.5" />
            <div>
              <p className="text-white font-medium">Office</p>
              <p className="text-gray-400 text-sm">432 Park Avenue, Suite 1500, New York, NY 10022</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[#d4af37] mt-0.5" />
            <div>
              <p className="text-white font-medium">Phone</p>
              <a href="tel:+12125550199" className="text-gray-400 text-sm hover:text-[#d4af37]">
                +1 (212) 555-0199
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#d4af37] mt-0.5" />
            <div>
              <p className="text-white font-medium">Email</p>
              <a href="mailto:hello@manhattanestates.com" className="text-gray-400 text-sm hover:text-[#d4af37]">
                hello@manhattanestates.com
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
          {status === 'sent' ? (
            <p className="text-[#d4af37]">Thanks — your message has been sent. We'll be in touch soon.</p>
          ) : (
            <>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={update('name')}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
              />
              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={update('email')}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
              />
              <textarea
                placeholder="How can we help?"
                value={form.message}
                onChange={update('message')}
                rows={5}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-shadow disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
