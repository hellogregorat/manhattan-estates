import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="pt-40 pb-20 text-center px-6">
      <h1 className="text-5xl font-bold mb-4 text-gradient">404</h1>
      <p className="text-gray-400 mb-8">This page doesn't exist.</p>
      <Link to="/" className="text-[#d4af37] hover:underline">
        Back to home
      </Link>
    </div>
  )
}
