import React from 'react'
import { useSelector } from 'react-redux'
import { Gauge } from 'lucide-react'
import { estimateValue } from '../data/neighborhoods'

export default function EstimatedValue({ property }) {
  const items = useSelector((state) => state.properties.items)
  const estimate = estimateValue(property, items)

  if (!estimate) return null

  const diff = estimate - property.price
  const diffPercent = ((diff / property.price) * 100).toFixed(1)

  return (
    <div className="glass rounded-2xl p-5 mb-6">
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
        <Gauge className="w-4 h-4 text-[#d4af37]" /> Estimated Market Value
      </p>
      <p className="text-2xl font-bold text-gradient mb-1">${estimate.toLocaleString()}</p>
      <p className={`text-xs ${diff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {diff >= 0 ? 'Listed below estimate by' : 'Listed above estimate by'} {Math.abs(diffPercent)}%
      </p>
      <p className="text-[11px] text-gray-600 mt-3">
        Automated estimate based on nearby listings — not an appraisal. Actual value may differ.
      </p>
    </div>
  )
}
