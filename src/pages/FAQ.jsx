import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    category: 'Credits & Billing',
    items: [
      {
        q: 'What are credits?',
        a: 'Credits are the currency used to access tools on Incoin Assistant. Each tool deducts a small number of credits per use. You purchase credits in bundles — Starter (₹100), Popular (₹200), or Value (₹500).',
      },
      {
        q: 'Do credits expire?',
        a: 'No. Credits never expire as long as your account remains active. There are no monthly fees or forced renewals.',
      },
      {
        q: 'Can I buy credits multiple times?',
        a: 'Yes. You can purchase any plan as many times as you like. Credits stack — each purchase adds to your existing balance.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major payment methods via Cashfree: UPI (Google Pay, PhonePe, Paytm), debit/credit cards (Visa, Mastercard, RuPay), and net banking.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely. All payments are processed by Cashfree, a PCI-DSS compliant payment gateway. We never store your card or banking details on our servers.',
      },
      {
        q: 'Can I get a refund if credits are not added after payment?',
        a: 'Yes. If you were charged but credits were not added to your account, contact us at support@incoinassistant.tech with your payment ID and we will resolve it within 24 hours. See our full Refund Policy for details.',
      },
    ],
  },
  {
    category: 'Tools & Usage',
    items: [
      {
        q: 'How many tools are available?',
        a: 'Incoin Assistant currently has 50+ tools across Productivity, Text, Developer, Calculator, and Media categories. More tools are added regularly.',
      },
      {
        q: 'How many credits does each tool cost?',
        a: 'Credit costs vary by tool complexity — simple tools cost 1–2 credits, while advanced tools cost 3–5 credits. The credit cost is always shown on the tool card before you open a tool.',
      },
      {
        q: 'Do I get charged if a tool crashes or has an error?',
        a: 'Credits are deducted when a tool session starts. If you experience a technical error on our side, contact us and we will refund the credits to your account.',
      },
      {
        q: 'Can I use tools without creating an account?',
        a: 'You can browse the tool library on the homepage, but using tools requires a free account and credits.',
      },
      {
        q: 'What are "Coming Soon" tools?',
        a: 'These are tools we are actively building — including AI text generation, PDF tools, image background remover, and more. They will become available in future updates.',
      },
    ],
  },
  {
    category: 'Account & Security',
    items: [
      {
        q: 'Is my data stored on your servers?',
        a: 'Tool inputs are processed in your browser and are not stored on our servers. Your account information (name, email, credit balance) is securely stored in our Supabase database.',
      },
      {
        q: 'How do I delete my account?',
        a: 'You can request account deletion by emailing privacy@incoinassistant.tech. We will delete your personal data within 30 days. Unused credits are forfeited upon deletion.',
      },
      {
        q: 'I forgot my password. What do I do?',
        a: 'Click "Forgot password?" on the login page and we will send a reset link to your registered email address.',
      },
      {
        q: 'Can I share my account?',
        a: 'No. Accounts are for individual use only. Sharing accounts violates our Terms of Service and may result in suspension.',
      },
    ],
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: 'rgba(99,102,241,0.1)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="text-white text-sm font-medium group-hover:text-indigo-300 transition-colors">{q}</span>
        {open
          ? <ChevronUp size={16} className="text-indigo-400 flex-shrink-0" />
          : <ChevronDown size={16} className="text-slate-500 flex-shrink-0" />
        }
      </button>
      {open && (
        <p className="text-slate-400 text-sm leading-relaxed pb-4">{a}</p>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="min-h-screen" style={{ background: '#050507' }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-32 pb-20">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border"
            style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
            <HelpCircle size={14} />
            Frequently Asked Questions
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Got Questions?</h1>
          <p className="text-slate-400">
            Everything you need to know about Incoin Assistant. Can't find your answer?{' '}
            <Link to="/contact" className="text-indigo-400 hover:underline">Contact us</Link>.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map(group => (
            <div key={group.category}>
              <h2 className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">{group.category}</h2>
              <div className="rounded-2xl px-6 border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(99,102,241,0.12)' }}>
                {group.items.map(item => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl p-8 text-center border"
          style={{ background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.2)' }}>
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-slate-400 text-sm mb-5">Our support team typically replies within one business day.</p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            Contact Support
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
