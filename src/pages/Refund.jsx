import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="text-slate-400 leading-relaxed space-y-3 text-sm">{children}</div>
    </div>
  )
}

const eligible = [
  'You were charged but credits were not added to your account',
  'You were charged twice for the same transaction',
  'Technical errors on our side prevented you from using the service entirely',
  'You contact us within 7 days of the transaction',
]

const notEligible = [
  'Credits were added but you changed your mind about the purchase',
  'Credits have already been used (partially or fully)',
  'Account was suspended for violating our Terms of Service',
  'Refund requested more than 7 days after the transaction',
]

export default function Refund() {
  return (
    <div className="min-h-screen" style={{ background: '#050507' }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-32 pb-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <RefreshCw size={20} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Refund & Return Policy</h1>
        </div>
        <p className="text-slate-500 text-sm mb-10">Last updated: May 9, 2026</p>

        {/* Quick note banner */}
        <div className="rounded-xl p-4 flex gap-3 mb-10 border"
          style={{ background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.2)' }}>
          <AlertCircle size={20} className="text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-slate-300 text-sm">
            Incoin Assistant sells digital credits — not physical goods. As such, this policy covers credit purchase
            refunds only. There are no physical returns.
          </p>
        </div>

        <div className="rounded-2xl p-8 border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(99,102,241,0.12)' }}>

          <Section title="1. Our Refund Philosophy">
            <p>
              We want every user to be happy with their purchase. If something went wrong on our end — a failed
              credit top-up, a duplicate charge, or a technical error — we will make it right without question.
            </p>
            <p>
              Because credits are a digital product that are consumed instantly, we cannot offer refunds for
              credits that have already been used or for change-of-mind cancellations.
            </p>
          </Section>

          <Section title="2. Eligible Refund Scenarios">
            <div className="space-y-2">
              {eligible.map(item => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="3. Non-Eligible Scenarios">
            <div className="space-y-2">
              {notEligible.map(item => (
                <div key={item} className="flex items-start gap-2">
                  <XCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="4. How to Request a Refund">
            <p>To request a refund, email us at <strong className="text-slate-300">support@incoinassistant.tech</strong> with the subject line <em>"Refund Request"</em> and include:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your registered email address</li>
              <li>The Cashfree transaction/payment ID</li>
              <li>Date of the transaction</li>
              <li>Reason for the refund request</li>
            </ul>
            <p>We will acknowledge your request within <strong className="text-slate-300">24 hours</strong> and resolve it within <strong className="text-slate-300">5–7 business days</strong>.</p>
          </Section>

          <Section title="5. Refund Method">
            <p>Approved refunds are returned to the original payment method used at the time of purchase (credit card, debit card, UPI, or net banking via Cashfree).</p>
            <p>Processing times after approval:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-slate-300">UPI:</strong> 1–2 business days</li>
              <li><strong className="text-slate-300">Debit/Credit Card:</strong> 5–7 business days</li>
              <li><strong className="text-slate-300">Net Banking:</strong> 3–5 business days</li>
            </ul>
          </Section>

          <Section title="6. Duplicate Charges">
            <p>If you notice a duplicate charge, contact us immediately at <strong className="text-slate-300">support@incoinassistant.tech</strong>. We will investigate and issue a full refund for the duplicate charge, typically within 2 business days.</p>
          </Section>

          <Section title="7. Failed Transactions">
            <p>If a payment failed but your bank or card was still charged, the amount is typically auto-reversed by your bank within 5–7 business days. If it isn't, contact us and we'll raise a dispute with Cashfree on your behalf.</p>
          </Section>

          <Section title="8. Contact Us">
            <p>Questions about this policy? Reach out via:</p>
            <p className="text-slate-300">Email: support@incoinassistant.tech</p>
            <p>Or use our <Link to="/contact" className="text-indigo-400 hover:underline">Contact page</Link>.</p>
          </Section>

        </div>
      </div>

      <Footer />
    </div>
  )
}
