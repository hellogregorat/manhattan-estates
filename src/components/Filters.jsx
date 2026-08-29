import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { setFilter } from '../store'

export default function Filters() {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.properties.filters)

  const types = ['all', 'penthouse', 'loft', 'apartment', 'townhouse', 'duplex']
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $5M', value: '0-5000000' },
    { label: '$5M - $10M', value: '5000000-10000000' },
    { label: 'Over $10M', value: '10000000-999999999' }
  ]

  return (
    <section id="properties" className="py-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient">Curated</span> Properties
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Hand-selected luxury residences representing the finest addresses in New York City
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass rounded-2xl p-6 mb-12"
      >
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by location or keyword..."
              value={filters.search}
              onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <select
              value={filters.type}
              onChange={(e) => dispatch(setFilter({ type: e.target.value }))}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
            >
              {types.map(t => (
                <option key={t} value={t} className="bg-[#141414]">
                  {t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => dispatch(setFilter({ priceRange: e.target.value }))}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
            >
              {priceRanges.map(r => (
                <option key={r.value} value={r.value} className="bg-[#141414]">{r.label}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
