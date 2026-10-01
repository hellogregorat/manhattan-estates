import React, { useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { X, ArrowLeftRight } from 'lucide-react'
import { fetchProperties } from '../store/propertiesSlice'
import { toggleCompare } from '../store/compareSlice'
import { resolveImage } from '../config'

export default function Compare() {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.properties)

  const ids = (searchParams.get('ids') || '')
    .split(',')
    .filter(Boolean)
    .map(Number)

  useEffect(() => {
    if (items.length === 0) dispatch(fetchProperties())
  }, [dispatch, items.length])

  const properties = ids.map((id) => items.find((p) => p.id === id)).filter(Boolean)

  if (status === 'loading' && properties.length === 0) {
    return <div className="pt-32 pb-20 text-center text-gray-500">Loading…</div>
  }

  if (properties.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center px-6">
        <p className="text-gray-400 mb-4">No properties selected to compare.</p>
        <Link to="/" className="text-[#d4af37] hover:underline">
          Back to listings
        </Link>
      </div>
    )
  }

  const rows = [
    { label: 'Price', render: (p) => `$${p.price.toLocaleString()}` },
    { label: 'Price / sqft', render: (p) => `$${Math.round(p.price / (p.sqft || 1)).toLocaleString()}` },
    { label: 'Neighborhood', render: (p) => p.location.split(',')[0].trim() },
    { label: 'Type', render: (p) => p.type },
    { label: 'Condition', render: (p) => p.condition },
    { label: 'Bedrooms', render: (p) => p.beds },
    { label: 'Bathrooms', render: (p) => p.baths },
    { label: 'Square footage', render: (p) => `${p.sqft.toLocaleString()} sqft` }
  ]

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        Compare <span className="text-gradient">Listings</span>
      </h1>
      <div className="mb-8">
        {properties.length > 1 && (
          <p className="flex items-center gap-2 text-sm text-gray-500 sm:hidden">
            <ArrowLeftRight className="w-4 h-4" /> Swipe sideways to see every listing
          </p>
        )}
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="border-collapse table-fixed">
            <colgroup>
              <col className="w-32 sm:w-44" />
              {properties.map((p) => (
                <col key={p.id} className="w-40 sm:w-52" />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-[#141414] p-4 text-left align-bottom"></th>
                {properties.map((p) => (
                  <th key={p.id} className="p-4 align-top">
                    <div className="rounded-xl overflow-hidden relative bg-white/5">
                      <button
                        onClick={() => dispatch(toggleCompare(p.id))}
                        className="absolute top-2 right-2 z-10 p-1.5 bg-black/60 rounded-full text-white hover:bg-black/80"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <img src={resolveImage(p.images?.[0])} alt={p.title} className="w-full h-28 sm:h-32 object-cover" />
                      <div className="p-3">
                        <Link
                          to={`/property/${p.id}`}
                          className="block text-sm font-semibold text-white hover:text-[#d4af37] leading-snug line-clamp-2"
                        >
                          {p.title}
                        </Link>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                  <td className="sticky left-0 z-10 bg-[#141414] p-4 text-sm text-gray-500 whitespace-nowrap">{row.label}</td>
                  {properties.map((p) => (
                    <td key={p.id} className="p-4 text-sm text-white text-center">
                      {row.render(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
