// In local dev, requests go through Vite's proxy at the relative path "/api"
// (see vite.config.js). In production the frontend and backend usually live on
// different domains, so VITE_API_URL must be set at build time to the deployed
// backend's URL, e.g. https://manhattan-estates-backend.onrender.com/api

export const API_BASE = import.meta.env.VITE_API_URL || '/api'

// Uploaded photos are served by the backend at /uploads/... — derive that
// origin from API_BASE so image URLs resolve correctly once the two are on
// separate domains. In local dev this is just an empty string (relative).
export const ASSET_BASE = API_BASE.replace(/\/api\/?$/, '')

export function resolveImage(src) {
  if (!src) return src
  if (/^https?:\/\//.test(src)) return src
  return ASSET_BASE + src
}
