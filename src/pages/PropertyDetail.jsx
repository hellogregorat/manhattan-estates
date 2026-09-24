import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Heart, Bed, Bath, Maximize, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react'
import { fetchPropertyById, toggleFavorite, sendInquiry } from '../store/propertiesSlice'
import { resolveImage } from '../config'

export default function PropertyDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const property = useSelector((state) => state.properties.current)
  const { user, token } = useSelector((state) => state.auth)
  const favoriteIds = useSelector((state) => state.properties.favoriteIds)
  const [activeImage, setActiveImage] = useState(0)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    dispatch(fetchPropertyById(id))
    setActiveImage(0)
    setSent(false)
  }, [dispatch, id])

  if (!property || String(property.id) !== id) {
    return <div className="pt-32 pb-20 text-center text-gray-500">Loading…</div>
  }

  const isFav = favoriteIds.includes(property.id)
  const images = property.images?.length ? property.images : []

  const handleInquiry = async (e) => {
    e.preventDefault()
    if (!token) return
    await dispatch(sendInquiry({ id: property.id, message }))
    setSent(true)
    setMessage('')
  }

  return (
    <div className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#d4af37] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to listings
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
            {images[activeImage] && (
              <img src={resolveImage(images[activeImage])} alt={property.title} className="w-full h-full object-cover" />
            )}
            {user && (
              <button
                onClick={() => dispatch(toggleFavorite(property.id))}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all ${
                  isFav ? 'bg-[#d4af37] text-black' : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                    i === activeImage ? 'border-[#d4af37]' : 'border-transparent'
                  }`}
                >
                  <img src={resolveImage(img)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm text-gray-400">{property.location}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
          <p className="text-3xl font-bold text-gradient mb-6">${property.price.toLocaleString()}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="glass rounded-xl p-4 text-center">
              <Bed className="w-5 h-5 text-[#d4af37] mx-auto mb-2" />
              <p className="text-lg font-semibold">{property.beds}</p>
              <p className="text-xs text-gray-500">Bedrooms</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <Bath className="w-5 h-5 text-[#d4af37] mx-auto mb-2" />
              <p className="text-lg font-semibold">{property.baths}</p>
              <p className="text-xs text-gray-500">Bathrooms</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <Maximize className="w-5 h-5 text-[#d4af37] mx-auto mb-2" />
              <p className="text-lg font-semibold">{property.sqft.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Sq Ft</p>
            </div>
          </div>

          <div className="glass rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Condition</p>
            <p className="text-white font-medium">{property.condition}</p>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8">{property.description}</p>

          <div className="glass rounded-xl p-5 mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Seller</p>
            <p className="text-white font-semibold mb-2">{property.seller?.name}</p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <a href={`mailto:${property.seller?.email}`} className="flex items-center gap-2 hover:text-[#d4af37]">
                <Mail className="w-4 h-4" /> {property.seller?.email}
              </a>
              <a href={`tel:${property.seller?.phone}`} className="flex items-center gap-2 hover:text-[#d4af37]">
                <Phone className="w-4 h-4" /> {property.seller?.phone}
              </a>
            </div>
          </div>

          {token ? (
            sent ? (
              <p className="text-[#d4af37]">Your message has been sent to the seller.</p>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a message to the seller…"
                  rows={3}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-shadow"
                >
                  Contact Seller
                </button>
              </form>
            )
          ) : (
            <p className="text-gray-400 text-sm">
              <Link to="/login" className="text-[#d4af37] hover:underline">
                Log in
              </Link>{' '}
              to contact the seller or save this property.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
