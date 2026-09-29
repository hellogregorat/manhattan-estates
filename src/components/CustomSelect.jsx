import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'

export default function CustomSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false)
  const [rect, setRect] = useState(null)
  const buttonRef = useRef(null)
  const panelRef = useRef(null)
  const selected = options.find((o) => o.value === value) || options[0]

  const updateRect = () => {
    if (buttonRef.current) setRect(buttonRef.current.getBoundingClientRect())
  }

  useLayoutEffect(() => {
    if (open) updateRect()
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleClick = (e) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    const handleReposition = () => updateRect()

    document.addEventListener('mousedown', handleClick)
    window.addEventListener('scroll', handleReposition, true)
    window.addEventListener('resize', handleReposition)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      window.removeEventListener('scroll', handleReposition, true)
      window.removeEventListener('resize', handleReposition)
    }
  }, [open])

  return (
    <div className="relative w-full sm:w-auto">
      <button
        ref={buttonRef}
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

      {open &&
        rect &&
        createPortal(
          <div
            ref={panelRef}
            style={{
              position: 'fixed',
              top: rect.bottom + 8,
              left: rect.left,
              width: Math.max(rect.width, 190),
              maxWidth: 'calc(100vw - 2rem)'
            }}
            className="z-[9999] max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-[#141414] shadow-2xl py-1"
          >
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
          </div>,
          document.body
        )}
    </div>
  )
}
