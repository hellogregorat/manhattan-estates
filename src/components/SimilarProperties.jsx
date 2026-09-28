import React from 'react'
import { useSelector } from 'react-redux'
import PropertyCard from './PropertyCard'

export default function SimilarProperties({ current }) {
  const items = useSelector((state) => state.properties.items)
  const neighborhood = current.location.split(',')[0].trim()

  const sameNeighborhood = items.filter((p) => p.id !== current.id && p.location.split(',')[0].trim() === neighborhood)
  const sameType = items.filter((p) => p.id !== current.id && p.type === current.type && !sameNeighborhood.includes(p))
  const similar = [...sameNeighborhood, ...sameType].slice(0, 3)

  if (similar.length === 0) return null

  return (
    <div className="max-w-6xl mx-auto px-6 pb-20">
      <h2 className="text-2xl font-bold mb-6">
        Similar <span className="text-gradient">Properties</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {similar.map((p, i) => (
          <PropertyCard key={p.id} property={p} index={i} />
        ))}
      </div>
    </div>
  )
}
