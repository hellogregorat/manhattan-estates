import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Bed, Bath, Maximize, MapPin, Phone, Mail, Calendar } from 'lucide-react'
import { closeModal, toggleFavorite } from '../store'

export default function PropertyModal() {
  const dispatch = useDispatch()
  const property = useSelector(state => state.properties.selectedProperty)
  const favorites = useSelector(state => state.properties.favorites)
  const isFav = property ? favorites.includes(property.id) : false

  if (!property) return null

  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        onClick={() => dispatch(closeModal())}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass rounded-3xl border border-white/10"
        >
          <button
            onClick={() => dispatch(closeModal())}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto md:min-h-[500px]">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
              
              <button
                onClick={() => dispatch(toggleFavorite(property.id))}
                className={`absolute bottom-4 left-4 p-3 rounded-full transition-all ${
                  isFav ? 'bg-[#d4af37] text-black' : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="p-8 md:p-10">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span className="text-sm text-gray-400">{property.location}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-2">{property.title}</h2>
              <p className="text-3xl font-bold text-gradient mb-6">{formatPrice(property.price)}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
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

              <p className="text-gray-300 leading-relaxed mb-8">{property.description}</p>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-shadow"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule a Viewing
                </motion.button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 glass rounded-xl flex items-center justify-center gap-2 text-gray-300 hover:text-white hover:border-[#d4af37]/50 transition-colors border border-white/10">
                    <Phone className="w-4 h-4" />
                    Call Agent
                  </button>
                  <button className="py-3 glass rounded-xl flex items-center justify-center gap-2 text-gray-300 hover:text-white hover:border-[#d4af37]/50 transition-colors border border-white/10">
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
