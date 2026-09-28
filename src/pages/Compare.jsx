import React, { useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'lucide-react'
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
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Compare <span className="text-gradient">Properties</span>
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-3 text-gray-500 text-sm w-40"></th>
              {properties.map((p) => (
                <th key={p.id} className="p-3 align-top">
                  <div className="glass rounded-xl overflow-hidden relative">
                    <button
                      onClick={() => dispatch(toggleCompare(p.id))}
                      className="absolute top-2 right-2 z-10 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <img src={resolveImage(p.images?.[0])} alt={p.title} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <Link to={`/property/${p.id}`} className="text-sm font-semibold text-white hover:text-[#d4af37]">
                        {p.title}
                      </Link>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-white/10">
                <td className="p-3 text-sm text-gray-500">{row.label}</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 text-sm text-white text-center">
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
