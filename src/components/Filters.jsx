import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { setFilter } from '../store/propertiesSlice'
import CustomSelect from './CustomSelect'

export default function Filters() {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.properties.filters)
  const items = useSelector((state) => state.properties.items)

  const neighborhoodOptions = useMemo(() => {
    const unique = Array.from(new Set(items.map((p) => p.location.split(',')[0].trim()))).sort()
    return [{ value: 'all', label: 'All Neighborhoods' }, ...unique.map((n) => ({ value: n, label: n }))]
  }, [items])

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'loft', label: 'Loft' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'house', label: 'House' },
    { value: 'penthouse', label: 'Penthouse' }
  ]

  const priceOptions = [
    { value: 'all', label: 'All Prices' },
    { value: '0-1000000', label: 'Under $1M' },
    { value: '1000000-2000000', label: '$1M – $2M' },
    { value: '2000000-4000000', label: '$2M – $4M' },
    { value: '4000000-8000000', label: '$4M – $8M' },
    { value: '8000000-999999999', label: 'Over $8M' }
  ]

  const bedsOptions = [
    { value: 'all', label: 'Any Beds' },
    { value: '1', label: '1+ Beds' },
    { value: '2', label: '2+ Beds' },
    { value: '3', label: '3+ Beds' },
    { value: '4', label: '4+ Beds' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' }
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
          Manhattan homes across every neighborhood, from move-in-ready condos to landmark residences
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass rounded-2xl p-6 mb-12"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
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
            <CustomSelect
              value={filters.neighborhood}
              onChange={(e) => dispatch(setFilter({ neighborhood: e.target.value }))}
              options={neighborhoodOptions}
            />
            <CustomSelect
              value={filters.type}
              onChange={(e) => dispatch(setFilter({ type: e.target.value }))}
              options={typeOptions}
            />
            <CustomSelect
              value={filters.priceRange}
              onChange={(e) => dispatch(setFilter({ priceRange: e.target.value }))}
              options={priceOptions}
            />
            <CustomSelect
              value={filters.beds}
              onChange={(e) => dispatch(setFilter({ beds: e.target.value }))}
              options={bedsOptions}
            />
            <CustomSelect
              value={filters.sort}
              onChange={(e) => dispatch(setFilter({ sort: e.target.value }))}
              options={sortOptions}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
