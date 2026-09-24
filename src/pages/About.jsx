import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Users, MapPin, Award } from 'lucide-react'

const stats = [
  { icon: Building2, label: 'Properties listed', value: '1,200+' },
  { icon: Users, label: 'Buyers & owners served', value: '4,800+' },
  { icon: MapPin, label: 'Manhattan neighborhoods', value: '18' },
  { icon: Award, label: 'Years in business', value: '12' }
]

const team = [
  {
    name: 'Elena Ruiz',
    role: 'Founder & Broker',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80'
  },
  {
    name: 'Marcus Chen',
    role: 'Head of Listings',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80'
  },
  {
    name: 'Priya Anand',
    role: 'Client Relations',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80'
  }
]

export default function About() {
  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About <span className="text-gradient">Manhattan Estates</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          We help buyers find a home across every corner of Manhattan — from move-in-ready condos in
          Washington Heights to landmark townhouses in the West Village — and give owners a straightforward
          way to list their property and reach real buyers.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <s.icon className="w-6 h-6 text-[#d4af37] mx-auto mb-3" />
            <p className="text-2xl font-bold text-gradient mb-1">{s.value}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Our story</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Manhattan Estates started as a small brokerage focused on one idea: buying or listing a home in
          Manhattan shouldn't require an insider's address book. Today the platform covers every price point
          from starter condos to landmark residences, with listings owners can post themselves and buyers can
          search, filter by neighborhood, save, and reach out on directly.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Every listing here is verified against the owner's account, every inquiry goes straight to the
          seller, and every buyer can track saved homes from their own profile.
        </p>
      </motion.div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Meet the team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden text-center"
            >
              <img src={member.photo} alt={member.name} className="w-full h-56 object-cover" />
              <div className="p-4">
                <p className="font-semibold text-white">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
