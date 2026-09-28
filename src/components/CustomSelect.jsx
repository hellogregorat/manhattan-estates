import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function CustomSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = options.find((o) => o.value === value) || options[0]

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative w-full sm:w-auto" ref={ref}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
        className="flex w-full items-center justify-between gap-2 pl-4 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base hover:border-white/20 focus:outline-none focus:border-[#d4af37] transition-colors sm:min-w-[150px] sm:whitespace-nowrap text-left"
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronDown className={`w-4 h-4 text-[#d4af37] transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 min-w-full sm:min-w-[190px] w-max max-w-[calc(100vw-2rem)] max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-[#141414]/95 backdrop-blur-xl shadow-2xl py-1">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                opt.value === value ? 'text-[#d4af37] bg-white/5 font-medium' : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
