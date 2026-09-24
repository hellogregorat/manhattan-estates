import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Heart, Home as HomeIcon, MessageSquare, Pencil, Trash2 } from 'lucide-react'
import { logout } from '../store/authSlice'
import { fetchFavorites, fetchMyListings, fetchMyInquiries, deleteProperty } from '../store/propertiesSlice'
import PropertyCard from '../components/PropertyCard'

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { favorites, myListings, inquiries } = useSelector((state) => state.properties)

  useEffect(() => {
    if (user?.role === 'buyer') dispatch(fetchFavorites())
    if (user?.role === 'owner') {
      dispatch(fetchMyListings())
      dispatch(fetchMyInquiries())
    }
  }, [dispatch, user])

  const handleLogout = () => {
    navigate('/')
    dispatch(logout())
  }

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"? This can't be undone.`)) {
      dispatch(deleteProperty(id))
    }
  }

  return (
    <div className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
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

      {user?.role === 'buyer' && (
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
      )}

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
