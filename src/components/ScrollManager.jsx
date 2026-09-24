import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Runs on every route/hash change. React Router doesn't scroll to hash targets
// on its own, and plain <a> tags used to force a full page reload (which reset
// scroll to the top before anything could jump to the section). This fixes both:
// SPA navigation via <Link> now lands on the right section, on any page.
export default function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 80)
        return () => clearTimeout(timer)
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [location.pathname, location.hash])

  return null
}
