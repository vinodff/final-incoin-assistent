import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PricingCard from '../components/PricingCard'
import { useAuth } from '../context/AuthContext'
import { PLANS } from '../lib/plans'
import { initiatePayment } from '../lib/razorpay'
import { Check, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

const faqs = [
  { q: 'Do credits expire?', a: 'No! Credits never expire. Buy once, use whenever you want.' },
  { q: 'Can I buy multiple plans?', a: 'Yes, credits are cumulative. Buy multiple plans and they stack up.' },
  { q: 'What payment methods are accepted?', a: 'We accept UPI, debit/credit cards, net banking, and wallets via Razorpay.' },
  { q: 'Is my payment data secure?', a: 'All payments are processed by Razorpay — India\'s most trusted payment gateway. We never store card details.' },
]

export default function Pricing() {
  const { user, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [loadingPlan, setLoadingPlan] = useState(null)

  async function handleBuy(plan) {
    if (!user) {
      toast.error('Please sign in to purchase credits')
      navigate('/login')
      return
    }

    setLoadingPlan(plan.id)

    await initiatePayment({
      plan,
      user,
      onSuccess: async ({ totalCredits }) => {
        await refreshProfile()
        toast.success(`🎉 ${totalCredits} credits added to your account!`)
        setLoadingPlan(null)
      },
      onError: (msg) => {
        toast.error(msg)
        setLoadingPlan(null)
      },
    })

    setLoadingPlan(null)
  }

  return (
    <div style={{ background: '#050507', minHeight: '100vh' }}>
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
            <Zap size={14} />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            Choose Your <span className="gradient-text">Plan</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-xl mx-auto">
            No subscriptions. No monthly fees. Buy credits once and use them whenever you need.
          </p>
        </div>

        {/* Plans */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {PLANS.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                onBuy={handleBuy}
                loading={loadingPlan === plan.id}
              />
            ))}
          </div>
        </div>

        {/* Credit usage table */}
        <div className="max-w-3xl mx-auto px-4 mb-20">
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
            <div className="px-6 py-4" style={{ background: 'rgba(99,102,241,0.1)' }}>
              <h3 className="font-semibold text-white">Credit Usage per Tool</h3>
            </div>
            {[
              { tool: 'Resume Builder', credits: 10, category: 'Professional' },
              { tool: 'AI Text Generator', credits: 5, category: 'AI Tools' },
              { tool: 'Image Editor', credits: 8, category: 'Image' },
              { tool: 'YouTube Downloader', credits: 6, category: 'YouTube' },
              { tool: 'File Converter', credits: 3, category: 'Converter' },
              { tool: 'AI Writer', credits: 15, category: 'AI Tools' },
              { tool: 'PDF Tools', credits: 4, category: 'Documents' },
              { tool: 'QR Generator', credits: 2, category: 'Utilities' },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4 transition-colors"
                style={{
                  background: i % 2 === 0 ? '#0d0d15' : 'rgba(13,13,21,0.5)',
                  borderTop: '1px solid rgba(99,102,241,0.1)',
                }}
              >
                <div>
                  <span className="text-white font-medium">{row.tool}</span>
                  <span className="ml-2 text-xs text-slate-500">{row.category}</span>
                </div>
                <div className="flex items-center gap-1 text-indigo-400 font-semibold">
                  <Zap size={14} />
                  {row.credits} credits
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card">
                <h4 className="font-semibold text-white mb-2">{faq.q}</h4>
                <p className="text-slate-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
