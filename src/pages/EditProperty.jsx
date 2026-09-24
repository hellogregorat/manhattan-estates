import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPropertyById, updateProperty } from '../store/propertiesSlice'

export default function EditProperty() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const property = useSelector((state) => state.properties.current)
  const [form, setForm] = useState(null)
  const [files, setFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    dispatch(fetchPropertyById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (property && String(property.id) === id) {
      setForm({
        title: property.title,
        type: property.type,
        price: property.price,
        beds: property.beds,
        baths: property.baths,
        sqft: property.sqft,
        location: property.location,
        condition: property.condition,
        description: property.description
      })
    }
  }, [property, id])

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => formData.append(key, value))
      files.forEach((file) => formData.append('images', file))

      const result = await dispatch(updateProperty({ id, formData }))
      if (updateProperty.fulfilled.match(result)) {
        navigate(`/property/${id}`)
      } else {
        setError(result.payload || 'Failed to update listing')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (!form) {
    return <div className="pt-32 pb-20 text-center text-gray-500">Loading…</div>
  }

  return (
    <div className="pt-28 pb-20 px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Edit <span className="text-gradient">Property</span>
      </h1>
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
        <input
          type="text"
          placeholder="Title"
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
          placeholder="Location"
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
          <label className="block text-sm text-gray-400 mb-2">Replace photos (optional, up to 6)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files).slice(0, 6))}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#d4af37] file:text-black file:font-semibold"
          />
          <p className="text-xs text-gray-500 mt-1">Leave empty to keep current photos.</p>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-shadow disabled:opacity-50"
        >
          {submitting ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
