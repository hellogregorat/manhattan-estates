import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Heart, Bed, Bath, Maximize, MapPin, ArrowUpRight } from 'lucide-react'
import { selectProperty, toggleFavorite } from '../store'

export default function PropertyCard({ property, index }) {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.properties.favorites)
  const isFav = favorites.includes(property.id)

  const formatPrice = (price) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
    return `$${(price / 1000).toFixed(0)}K`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative glass rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => dispatch(selectProperty(property))}
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {property.featured && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-[#d4af37] text-black text-xs font-bold rounded-full">
            Featured
          </span>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(property.id)) }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
            isFav ? 'bg-[#d4af37] text-black' : 'bg-black/50 text-white hover:bg-black/70'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{property.title}</h3>
          <div className="flex items-center gap-1 text-gray-300 text-sm">
            <MapPin className="w-3 h-3" />
            {property.location}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gradient">{formatPrice(property.price)}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wider">{property.type}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            {property.beds}
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            {property.baths}
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            {property.sqft.toLocaleString()} sqft
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-sm text-gray-500">View Details</span>
          <ArrowUpRight className="w-5 h-5 text-[#d4af37] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </motion.div>
  )
}
