import React from 'react'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import PropertyCard from './PropertyCard'

export default function PropertyList() {
  const { items, filters } = useSelector(state => state.properties)

  const filtered = items.filter(p => {
    if (filters.type !== 'all' && p.type !== filters.type) return false
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number)
      if (p.price < min || p.price > max) return false
    }
    if (filters.search) {
      const s = filters.search.toLowerCase()
      return p.title.toLowerCase().includes(s) || p.location.toLowerCase().includes(s)
    }
    return true
  })

  return (
    <section className="px-6 max-w-7xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-400">
          Showing <span className="text-white font-semibold">{filtered.length}</span> properties
        </p>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filtered.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-xl text-gray-500">No properties match your criteria</p>
        </motion.div>
      )}
    </section>
  )
}
