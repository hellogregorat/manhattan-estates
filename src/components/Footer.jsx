import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, Instagram, Twitter, Linkedin, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const quickLinks = [
    { label: 'Properties', to: '/#properties' },
    { label: 'List Property', to: '/list-property' },
    { label: 'About', to: '/about' },
    { label: 'FAQ', to: '/faq' }
  ]

  return (
    <footer className="relative border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#050505]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-8 h-8 text-[#d4af37]" />
              <span className="text-2xl font-bold">
                <span className="text-gradient">Manhattan</span>
                <span className="text-white font-light">Estates</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed mb-6">
              Connecting discerning clients with the most exceptional properties in New York City.
              Over 20 years of luxury real estate expertise.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 glass rounded-full text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37]/30 transition-colors border border-white/10"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-400 hover:text-[#d4af37] transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-6">
              <Link to="/contact" className="hover:text-[#d4af37] transition-colors">
                Contact
              </Link>
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>432 Park Avenue, Suite 1500</li>
              <li>New York, NY 10022</li>
              <li className="pt-2">+1 (212) 555-0199</li>
              <li>hello@manhattanestates.com</li>
            </ul>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Manhattan Estates. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
