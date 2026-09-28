import React, { useState, useMemo } from 'react'
import { Calculator } from 'lucide-react'

export default function MortgageCalculator({ price }) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [rate, setRate] = useState(6.5)
  const [termYears, setTermYears] = useState(30)

  const { monthlyPayment, loanAmount, downPaymentAmount } = useMemo(() => {
    const downPaymentAmount = Math.round((price * downPaymentPercent) / 100)
    const loanAmount = price - downPaymentAmount
    const monthlyRate = rate / 100 / 12
    const numPayments = termYears * 12
    const monthlyPayment =
      monthlyRate === 0
        ? loanAmount / numPayments
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    return { monthlyPayment, loanAmount, downPaymentAmount }
  }, [price, downPaymentPercent, rate, termYears])

  return (
    <div className="glass rounded-2xl p-5 mb-6">
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Calculator className="w-4 h-4 text-[#d4af37]" /> Mortgage Calculator
      </p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Down payment</label>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={100}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Math.min(100, Math.max(0, Number(e.target.value))))}
              className="w-full pl-3 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#d4af37]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Interest rate</label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              min={0}
              value={rate}
              onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
              className="w-full pl-3 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#d4af37]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Term</label>
          <div className="relative">
            <input
              type="number"
              min={1}
              max={40}
              value={termYears}
              onChange={(e) => setTermYears(Math.min(40, Math.max(1, Number(e.target.value))))}
              className="w-full pl-3 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#d4af37]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">yrs</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div>
          <p className="text-xs text-gray-500">Down payment: ${downPaymentAmount.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Loan amount: ${loanAmount.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gradient">${Math.round(monthlyPayment).toLocaleString()}</p>
          <p className="text-xs text-gray-500">estimated / month</p>
        </div>
      </div>
      <p className="text-[11px] text-gray-600 mt-3">
        Estimate only — excludes property tax, insurance, and HOA/common charges. Not a loan offer.
      </p>
    </div>
  )
}
