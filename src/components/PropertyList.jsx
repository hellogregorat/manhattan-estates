import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import PropertyCard from './PropertyCard'
import { fetchProperties } from '../store/propertiesSlice'

export default function PropertyList() {
  const dispatch = useDispatch()
  const { items, filters, status } = useSelector((state) => state.properties)

  useEffect(() => {
    dispatch(fetchProperties())
  }, [dispatch])

  let filtered = items.filter((p) => {
    if (filters.type !== 'all' && p.type !== filters.type) return false
    if (filters.neighborhood !== 'all' && p.location.split(',')[0].trim() !== filters.neighborhood) return false
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number)
      if (p.price < min || p.price > max) return false
    }
    if (filters.beds !== 'all' && p.beds < Number(filters.beds)) return false
    if (filters.search) {
      const s = filters.search.toLowerCase()
      if (!p.title.toLowerCase().includes(s) && !p.location.toLowerCase().includes(s)) return false
    }
    return true
  })

  if (filters.sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (filters.sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (filters.sort === 'newest') {
    filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return (
    <section className="px-6 max-w-7xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-400">
          Showing <span className="text-white font-semibold">{filtered.length}</span> properties
        </p>
      </div>

      {status === 'loading' && <p className="text-gray-500 text-center py-10">Loading properties…</p>}

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filtered.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {status !== 'loading' && filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <p className="text-xl text-gray-500">No properties match your criteria</p>
        </motion.div>
      )}
    </section>
  )
}
