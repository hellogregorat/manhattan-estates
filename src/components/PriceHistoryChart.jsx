import React from 'react'
import { TrendingUp } from 'lucide-react'
import { generatePriceHistory } from '../data/neighborhoods'

export default function PriceHistoryChart({ property }) {
  const history = generatePriceHistory(property)
  const prices = history.map((h) => h.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const range = max - min || 1

  const width = 100
  const height = 40
  const points = history.map((h, i) => {
    const x = (i / (history.length - 1)) * width
    const y = height - ((h.price - min) / range) * height
    return `${x},${y}`
  })

  const monthLabel = (date) => date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })

  return (
    <div className="glass rounded-2xl p-5 mb-6">
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-[#d4af37]" /> Price History
      </p>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20" preserveAspectRatio="none">
        <polyline points={points.join(' ')} fill="none" stroke="#d4af37" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="flex justify-between mt-2">
        {history.map((h, i) => (
          <div key={i} className="text-center">
            <p className="text-[11px] text-gray-500">{monthLabel(h.date)}</p>
            <p className="text-xs text-gray-300 font-medium">${(h.price / 1000000).toFixed(2)}M</p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-gray-600 mt-3">Illustrative trend, not a verified transaction record.</p>
    </div>
  )
}
