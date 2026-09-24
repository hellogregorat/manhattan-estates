import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Is registration free?',
    a: 'Yes. Creating an account as a buyer or an owner is completely free — there are no listing fees or subscription costs on the platform.'
  },
  {
    q: "What's the difference between a buyer and an owner account?",
    a: 'A buyer account lets you browse, save favorites, and message sellers. An owner account additionally lets you list your own property with photos, and see every inquiry buyers send you in your profile.'
  },
  {
    q: 'How do I list my property?',
    a: 'Register (or log in) as an owner, then go to "List Property" from the menu. Fill in the details — price, size, neighborhood, condition, description — and upload up to six photos. It appears in the main catalog immediately.'
  },
  {
    q: 'How do I contact a seller?',
    a: "Open any listing's page — you'll find the seller's name, email, and phone, plus a message form. If you're logged in, your message is also saved to the owner's profile so they see it even if they miss the email."
  },
  {
    q: 'Can I edit or remove a listing after publishing it?',
    a: 'Yes — from your profile, under "My Listings," every property you own has Edit and Delete controls.'
  },
  {
    q: 'How does the price range filter work?',
    a: 'The filters on the homepage narrow the catalog by neighborhood, property type, price range, and minimum bedrooms — combine as many as you like, and sort by newest or price.'
  },
  {
    q: 'Is there a fee for using the support chat?',
    a: "No — the chat assistant in the bottom-right corner is free to use and can answer questions about how the site works."
  }
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-medium text-white">{item.q}</span>
        <ChevronDown className={`w-5 h-5 text-[#d4af37] transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="px-6 pb-5 text-gray-400 leading-relaxed"
        >
          {item.a}
        </motion.div>
      )}
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h1>
        <p className="text-gray-400">Can't find what you need? Use the support chat or the contact page.</p>
      </motion.div>

      <div className="space-y-4">
        {FAQS.map((item, i) => (
          <FAQItem key={item.q} item={item} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
        ))}
      </div>
    </div>
  )
}
