import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../store/authSlice'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error } = useSelector((state) => state.auth)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(registerUser(form))
    if (registerUser.fulfilled.match(result)) navigate('/profile')
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Create <span className="text-gradient">Account</span>
      </h1>
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setForm({ ...form, role: 'buyer' })}
            className={`py-3 rounded-xl border transition-colors ${
              form.role === 'buyer' ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'border-white/10 text-gray-300'
            }`}
          >
            I'm a Buyer
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, role: 'owner' })}
            className={`py-3 rounded-xl border transition-colors ${
              form.role === 'owner' ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'border-white/10 text-gray-300'
            }`}
          >
            I'm an Owner
          </button>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={update('name')}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={update('email')}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={update('password')}
          required
          minLength={6}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-shadow disabled:opacity-50"
        >
          {status === 'loading' ? 'Creating account…' : 'Create Account'}
        </button>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-[#d4af37] hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}
