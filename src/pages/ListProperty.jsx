import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProperty } from '../store/propertiesSlice'

export default function ListProperty() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    type: 'apartment',
    price: '',
    beds: '',
    baths: '',
    sqft: '',
    location: '',
    condition: 'Excellent',
    description: ''
  })
  const [files, setFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => formData.append(key, value))
      files.forEach((file) => formData.append('images', file))

      const result = await dispatch(createProperty(formData))
      if (createProperty.fulfilled.match(result)) {
        navigate(`/property/${result.payload.id}`)
      } else {
        setError(result.payload || 'Failed to create listing')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-28 pb-20 px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        List Your <span className="text-gradient">Property</span>
      </h1>
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
        <input
          type="text"
          placeholder="Title (e.g. Sunny SoHo Loft)"
          value={form.title}
          onChange={update('title')}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
        />

        <div className="grid grid-cols-2 gap-3">
          <select
            value={form.type}
            onChange={update('type')}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
          >
            {['apartment', 'penthouse', 'loft', 'townhouse', 'duplex', 'house', 'condo'].map((t) => (
              <option key={t} value={t} className="bg-[#141414]">
                {t}
              </option>
            ))}
          </select>
          <select
            value={form.condition}
            onChange={update('condition')}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
          >
            {['Excellent', 'Renovated', 'Newly Built', 'Needs Renovation'].map((c) => (
              <option key={c} value={c} className="bg-[#141414]">
                {c}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Location (e.g. SoHo, Manhattan)"
          value={form.location}
          onChange={update('location')}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Price ($)"
            value={form.price}
            onChange={update('price')}
            required
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
          />
          <input
            type="number"
            placeholder="Sqft"
            value={form.sqft}
            onChange={update('sqft')}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Bedrooms"
            value={form.beds}
            onChange={update('beds')}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
          />
          <input
            type="number"
            placeholder="Bathrooms"
            value={form.baths}
            onChange={update('baths')}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={update('description')}
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
        />

        <div>
          <label className="block text-sm text-gray-400 mb-2">Photos (up to 6)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files).slice(0, 6))}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#d4af37] file:text-black file:font-semibold"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-shadow disabled:opacity-50"
        >
          {submitting ? 'Publishing…' : 'Publish Listing'}
        </button>
      </form>
    </div>
  )
}
