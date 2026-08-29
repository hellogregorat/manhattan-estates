import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, Building2 } from 'lucide-react'
import { toggleMenu, closeMenu } from '../store'

export default function Navbar() {
  const dispatch = useDispatch()
  const menuOpen = useSelector(state => state.properties.menuOpen)
  const favorites = useSelector(state => state.properties.favorites)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Properties', href: '#properties' },
    { label: 'Featured', href: '#featured' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Building2 className="w-8 h-8 text-[#d4af37] transition-transform group-hover:rotate-12" />
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-gradient">Manhattan</span>
            <span className="text-white font-light">Estates</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d4af37] transition-all group-hover:w-full" />
            </a>
          ))}
          <button className="relative p-2 text-gray-300 hover:text-[#d4af37] transition-colors">
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d4af37] text-black text-xs font-bold rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); dispatch(toggleMenu()) }}
          className="md:hidden p-2 text-white"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => dispatch(closeMenu())}
                  className="block text-lg text-gray-300 hover:text-[#d4af37] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
