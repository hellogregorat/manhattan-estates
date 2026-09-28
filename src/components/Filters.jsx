import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Search, BookmarkPlus, List, Map as MapIcon } from 'lucide-react'
import { setFilter } from '../store/propertiesSlice'
import { addSavedSearch } from '../store/savedSearchesSlice'
import CustomSelect from './CustomSelect'

export default function Filters({ view, onViewChange }) {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.properties.filters)
  const items = useSelector((state) => state.properties.items)
  const [searchName, setSearchName] = useState('')
  const [showSaveInput, setShowSaveInput] = useState(false)

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

  const handleSaveSearch = () => {
    if (!searchName.trim()) return
    dispatch(addSavedSearch({ name: searchName.trim(), filters }))
    setSearchName('')
    setShowSaveInput(false)
  }

  return (
    <section id="properties" className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
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
        className="glass rounded-2xl p-4 sm:p-6 mb-8"
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

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto lg:flex lg:flex-wrap">
            <CustomSelect
              value={filters.neighborhood}
              onChange={(value) => dispatch(setFilter({ neighborhood: value }))}
              options={neighborhoodOptions}
            />
            <CustomSelect value={filters.type} onChange={(value) => dispatch(setFilter({ type: value }))} options={typeOptions} />
            <CustomSelect
              value={filters.priceRange}
              onChange={(value) => dispatch(setFilter({ priceRange: value }))}
              options={priceOptions}
            />
            <CustomSelect value={filters.beds} onChange={(value) => dispatch(setFilter({ beds: value }))} options={bedsOptions} />
            <CustomSelect value={filters.sort} onChange={(value) => dispatch(setFilter({ sort: value }))} options={sortOptions} />
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          {showSaveInput ? (
            <div className="flex gap-2">
              <input
                type="text"
                autoFocus
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveSearch()}
                placeholder="Name this search…"
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
              />
              <button
                onClick={handleSaveSearch}
                className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black text-sm font-semibold rounded-xl"
              >
                Save
              </button>
              <button onClick={() => setShowSaveInput(false)} className="px-3 py-2 text-sm text-gray-400 hover:text-white">
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSaveInput(true)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#d4af37] transition-colors"
            >
              <BookmarkPlus className="w-4 h-4" /> Save this search
            </button>
          )}
        </div>

        {onViewChange && (
          <div className="flex gap-1 p-1 glass rounded-xl">
            <button
              onClick={() => onViewChange('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                view === 'list' ? 'bg-[#d4af37] text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" /> List
            </button>
            <button
              onClick={() => onViewChange('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                view === 'map' ? 'bg-[#d4af37] text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-4 h-4" /> Map
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
