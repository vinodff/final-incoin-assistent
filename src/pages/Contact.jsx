import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Mail, MessageSquare, Clock, Send, CheckCircle } from 'lucide-react'

const topics = [
  'Payment / Billing Issue',
  'Refund Request',
  'Bug Report',
  'Feature Request',
  'Account Problem',
  'General Question',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    // Simulate submission — replace with your actual endpoint / Supabase insert
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen" style={{ background: '#050507' }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-32 pb-20">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Have a question, a bug to report, or just want to say hi? We typically reply within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                title: 'Email Support',
                desc: 'support@incoinassistant.tech',
                sub: 'For billing, refunds & account issues',
              },
              {
                icon: MessageSquare,
                title: 'General Enquiries',
                desc: 'hello@incoinassistant.tech',
                sub: 'For feedback and partnerships',
              },
              {
                icon: Clock,
                title: 'Response Time',
                desc: 'Within 24 hours',
                sub: 'Monday – Saturday, 10am–7pm IST',
              },
            ].map(card => (
              <div key={card.title} className="rounded-xl p-5 border"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(99,102,241,0.12)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: 'rgba(99,102,241,0.15)' }}>
                  <card.icon size={18} className="text-indigo-400" />
                </div>
                <div className="text-white font-medium text-sm mb-0.5">{card.title}</div>
                <div className="text-indigo-300 text-sm mb-1">{card.desc}</div>
                <div className="text-slate-500 text-xs">{card.sub}</div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <div className="rounded-2xl p-8 border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(99,102,241,0.12)' }}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: 'rgba(99,102,241,0.15)' }}>
                    <CheckCircle size={32} className="text-indigo-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Message Sent!</h2>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Thanks for reaching out, {form.name.split(' ')[0]}. We'll get back to you at <span className="text-indigo-300">{form.email}</span> within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-slate-300 text-sm mb-1.5 font-medium">Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.2)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm mb-1.5 font-medium">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.2)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm mb-1.5 font-medium">Topic</label>
                    <select
                      name="topic"
                      value={form.topic}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500 transition appearance-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.2)' }}
                    >
                      <option value="" className="bg-gray-900">Select a topic</option>
                      {topics.map(t => (
                        <option key={t} value={t} className="bg-gray-900">{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm mb-1.5 font-medium">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Describe your issue or question in detail…"
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.2)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                  >
                    {loading ? (
                      <div className="w-5 h-5 rounded-full border-2 border-transparent border-t-white animate-spin" />
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
