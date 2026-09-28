import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Scale, X } from 'lucide-react'
import PropertyCard from './PropertyCard'
import PropertiesMap from './PropertiesMap'
import Filters from './Filters'
import { fetchProperties } from '../store/propertiesSlice'
import { clearCompare } from '../store/compareSlice'
import { resolveImage } from '../config'

export default function PropertyList() {
  const dispatch = useDispatch()
  const { items, filters, status } = useSelector((state) => state.properties)
  const compareIds = useSelector((state) => state.compare.ids)
  const recentlyViewed = useSelector((state) => state.recentlyViewed.items)
  const [view, setView] = useState('list')

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
    <>
      <Filters view={view} onViewChange={setView} />

      <section className="px-4 sm:px-6 max-w-7xl mx-auto pb-24 sm:pb-20 -mt-4">
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{filtered.length}</span> properties
          </p>
        </div>

        {status === 'loading' && <p className="text-gray-500 text-center py-10">Loading properties…</p>}

        {status !== 'loading' && view === 'map' && <PropertiesMap properties={filtered} />}

        {status !== 'loading' && view === 'list' && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filtered.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {status !== 'loading' && filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-xl text-gray-500">No properties match your criteria</p>
          </motion.div>
        )}

        {recentlyViewed.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-6">Recently Viewed</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {recentlyViewed.map((p) => (
                <Link
                  key={p.id}
                  to={`/property/${p.id}`}
                  className="glass rounded-xl overflow-hidden flex-shrink-0 w-48 group"
                >
                  <div className="h-28 overflow-hidden">
                    <img
                      src={resolveImage(p.image)}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-white font-medium truncate">{p.title}</p>
                    <p className="text-xs text-gray-500 truncate">{p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <AnimatePresence>
        {compareIds.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="print:hidden fixed left-1/2 -translate-x-1/2 z-[300] w-max max-w-[calc(100vw-2rem)] bg-[#141414]/95 backdrop-blur-xl rounded-2xl border border-white/10 px-4 sm:px-5 py-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4 shadow-2xl"
            style={{ bottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))' }}
          >
            <span className="text-sm text-gray-300 flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#d4af37]" /> {compareIds.length} selected to compare
            </span>
            <Link
              to={`/compare?ids=${compareIds.join(',')}`}
              className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black text-sm font-semibold rounded-xl"
            >
              Compare
            </Link>
            <button onClick={() => dispatch(clearCompare())} className="text-gray-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
