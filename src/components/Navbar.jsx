import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Heart, Building2, User } from 'lucide-react'
import { toggleMenu, closeMenu } from '../store/uiSlice'
import { logout } from '../store/authSlice'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const menuOpen = useSelector((state) => state.ui.menuOpen)
  const favoriteIds = useSelector((state) => state.properties.favoriteIds)
  const { user, token } = useSelector((state) => state.auth)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Properties', to: '/#properties' },
    { label: 'List Property', to: token ? '/list-property' : '/register' },
    { label: 'About', to: '/about' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact', to: '/contact' }
  ]

  // Navigate away first, THEN clear auth — clearing auth while /profile is still
  // mounted makes ProtectedRoute redirect to /login at the same time this does,
  // and that race is what caused the black screen.
  const handleLogout = () => {
    navigate('/')
    dispatch(logout())
    dispatch(closeMenu())
  }

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
        <Link to="/" className="flex items-center gap-2 group">
          <Building2 className="w-8 h-8 text-[#d4af37] transition-transform group-hover:rotate-12" />
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-gradient">Manhattan</span>
            <span className="text-white font-light">Estates</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d4af37] transition-all group-hover:w-full" />
            </Link>
          ))}

          {token ? (
            <>
              <Link to="/profile" className="relative p-2 text-gray-300 hover:text-[#d4af37] transition-colors">
                <Heart className="w-5 h-5" />
                {favoriteIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d4af37] text-black text-xs font-bold rounded-full flex items-center justify-center">
                    {favoriteIds.length}
                  </span>
                )}
              </Link>
              <Link to="/profile" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                <User className="w-4 h-4" /> {user?.name?.split(' ')[0]}
              </Link>
              <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white transition-colors">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black text-sm font-semibold rounded-full whitespace-nowrap"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            dispatch(toggleMenu())
          }}
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
                <motion.div
                  key={link.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => dispatch(closeMenu())}
                    className="block text-lg text-gray-300 hover:text-[#d4af37] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                {token ? (
                  <>
                    <Link to="/profile" onClick={() => dispatch(closeMenu())} className="text-gray-300 hover:text-[#d4af37]">
                      Profile ({user?.name?.split(' ')[0]})
                    </Link>
                    <button onClick={handleLogout} className="text-left text-gray-400 hover:text-white">
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => dispatch(closeMenu())} className="text-gray-300 hover:text-[#d4af37]">
                      Log In
                    </Link>
                    <Link to="/register" onClick={() => dispatch(closeMenu())} className="text-gray-300 hover:text-[#d4af37]">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
