import React from 'react'
import { ChevronDown } from 'lucide-react'

export default function CustomSelect({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="appearance-none pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37] cursor-pointer hover:border-white/20 transition-colors min-w-[150px]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#141414] text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]" />
    </div>
  )
}
