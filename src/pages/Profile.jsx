import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Heart, Home as HomeIcon, MessageSquare, Pencil, Trash2, Bookmark, Search } from 'lucide-react'
import { logout } from '../store/authSlice'
import { fetchFavorites, fetchMyListings, fetchMyInquiries, deleteProperty, setFilter } from '../store/propertiesSlice'
import { removeSavedSearch } from '../store/savedSearchesSlice'
import PropertyCard from '../components/PropertyCard'

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { favorites, myListings, inquiries } = useSelector((state) => state.properties)
  const savedSearches = useSelector((state) => state.savedSearches.items)

  useEffect(() => {
    if (user) dispatch(fetchFavorites())
    if (user?.role === 'owner') {
      dispatch(fetchMyListings())
      dispatch(fetchMyInquiries())
    }
  }, [dispatch, user])

  const handleLogout = () => {
    navigate('/')
    dispatch(logout())
  }

  const handleApplySearch = (filters) => {
    dispatch(setFilter(filters))
    navigate('/#properties')
  }

  const describeFilters = (f) => {
    const parts = []
    if (f.neighborhood && f.neighborhood !== 'all') parts.push(f.neighborhood)
    if (f.type && f.type !== 'all') parts.push(f.type)
    if (f.priceRange && f.priceRange !== 'all') {
      const [min, max] = f.priceRange.split('-').map(Number)
      const fmt = (n) => (n >= 1000000 ? `$${n / 1000000}M` : `$${n / 1000}K`)
      parts.push(max >= 999999999 ? `over ${fmt(min)}` : min === 0 ? `under ${fmt(max)}` : `${fmt(min)}–${fmt(max)}`)
    }
    if (f.beds && f.beds !== 'all') parts.push(`${f.beds}+ beds`)
    if (f.search) parts.push(`"${f.search}"`)
    return parts.length ? parts.join(' · ') : 'All properties'
  }

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"? This can't be undone.`)) {
      dispatch(deleteProperty(id))
    }
  }

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="glass rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <User className="w-6 h-6 text-[#d4af37]" />
            <h1 className="text-2xl font-bold">{user?.name}</h1>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <Mail className="w-4 h-4" /> {user?.email}
          </div>
          <span className="inline-block mt-2 px-3 py-1 bg-[#d4af37]/20 text-[#d4af37] text-xs rounded-full uppercase tracking-wider">
            {user?.role === 'owner' ? 'Property Owner' : 'Buyer'}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="px-5 py-2 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:border-[#d4af37]/50 transition-colors"
        >
          Log Out
        </button>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-[#d4af37]" /> Saved Searches
        </h2>
        {savedSearches.length === 0 ? (
          <p className="text-gray-500">
            No saved searches yet. Set some filters on the homepage and tap "Save this search" to keep them here.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedSearches.map((s) => (
              <div key={s.id} className="glass rounded-xl p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-white truncate">{s.name}</p>
                  <p className="text-xs text-gray-500 truncate">{describeFilters(s.filters)}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleApplySearch(s.filters)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black text-xs font-semibold rounded-lg"
                  >
                    <Search className="w-3.5 h-3.5" /> Run
                  </button>
                  <button
                    onClick={() => dispatch(removeSavedSearch(s.id))}
                    className="p-2 border border-white/10 rounded-lg text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                    title="Delete saved search"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#d4af37]" /> Saved Properties
          </h2>
          {favorites.length === 0 ? (
            <p className="text-gray-500">No saved properties yet. Browse listings and tap the heart icon to save one.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          )}
        </div>

      {user?.role === 'owner' && (
        <div className="space-y-12">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <HomeIcon className="w-5 h-5 text-[#d4af37]" /> My Listings
              </h2>
              <Link
                to="/list-property"
                className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black font-semibold rounded-xl text-sm"
              >
                + Add Listing
              </Link>
            </div>
            {myListings.length === 0 ? (
              <p className="text-gray-500">You haven't listed any properties yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {myListings.map((p, i) => (
                  <div key={p.id} className="space-y-3">
                    <PropertyCard property={p} index={i} />
                    <div className="flex gap-3">
                      <Link
                        to={`/property/${p.id}/edit`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:border-[#d4af37]/50 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 border border-red-500/30 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#d4af37]" /> Buyer Inquiries
            </h2>
            {inquiries.length === 0 ? (
              <p className="text-gray-500">No inquiries yet.</p>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="glass rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-white">{inq.propertyTitle}</p>
                      <span className="text-xs text-gray-500">{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">
                      From {inq.buyerName} · {inq.buyerEmail}
                    </p>
                    <p className="text-gray-300">{inq.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
