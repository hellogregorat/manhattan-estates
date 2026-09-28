import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getCoordinates } from '../data/neighborhoods'
import { resolveImage } from '../config'

// Leaflet's default marker icon references local image paths that don't
// resolve correctly once bundled — rebuild it from the package's own CDN copy.
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

function formatPrice(price) {
  return price >= 1000000 ? `$${(price / 1000000).toFixed(1)}M` : `$${(price / 1000).toFixed(0)}K`
}

export default function PropertiesMap({ properties }) {
  const center = [40.7549, -73.984]

  return (
    <div className="rounded-2xl overflow-hidden h-[420px] md:h-[600px] border border-white/10 relative z-0">
      <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((p) => (
          <Marker key={p.id} position={getCoordinates(p)} icon={markerIcon}>
            <Popup>
              <div style={{ minWidth: 170 }}>
                {p.images?.[0] && (
                  <img
                    src={resolveImage(p.images[0])}
                    alt={p.title}
                    style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 6, marginBottom: 6 }}
                  />
                )}
                <p style={{ fontWeight: 600, marginBottom: 2 }}>{p.title}</p>
                <p style={{ marginBottom: 6, color: '#b8941f', fontWeight: 600 }}>{formatPrice(p.price)}</p>
                <Link to={`/property/${p.id}`} style={{ color: '#0066cc' }}>
                  View listing →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
