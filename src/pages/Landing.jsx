import { Link } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PricingCard from '../components/PricingCard'
import { useAuth } from '../context/AuthContext'
import { PLANS } from '../lib/plans'
import { TOOLS, CATEGORIES } from '../lib/tools'
import {
  ArrowRight, Zap, FileText, Image, Youtube, RefreshCw, Brain,
  Users, Star, Shield, Cpu, TrendingUp
} from 'lucide-react'

const stats = [
  { value: '50+', label: 'Tools Available' },
  { value: '10K+', label: 'Happy Users' },
  { value: '1M+', label: 'Tasks Completed' },
  { value: '99.9%', label: 'Uptime' },
]

export default function Landing() {
  const { user } = useAuth()
  const [activeCategory, setActiveCategory] = useState('All')

  // Filter tools: exclude 'comingSoon' tools from landing page preview
  const displayTools = TOOLS.filter(t => !t.comingSoon && (activeCategory === 'All' || t.category === activeCategory))

  return (
    <div style={{ background: '#050507', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background blobs */}
        <div className="glow-blob w-96 h-96 top-20 -left-20" style={{ background: '#6366f1' }} />
        <div className="glow-blob w-80 h-80 bottom-20 right-0" style={{ background: '#8b5cf6', animationDelay: '2s' }} />
        <div className="glow-blob w-64 h-64 top-1/2 left-1/2" style={{ background: '#3b82f6', animationDelay: '4s' }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-up"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
            <Zap size={14} />
            50+ Productivity Tools in One Place
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 animate-fade-up-delay-1 leading-tight">
            <span className="text-white">All Productivity</span><br />
            <span className="gradient-text">Tools in One Place</span>
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-up-delay-2">
            Access powerful AI tools, resume builders, image editors, converters, and more — all with a simple credit system.
            Work smarter, not harder.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-3">
            {user ? (
              <Link to="/dashboard" className="btn-primary text-lg px-8 py-4">
                Open Dashboard <ArrowRight size={20} />
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                  Get Started Free <ArrowRight size={20} />
                </Link>
                <Link to="/pricing" className="btn-outline text-lg px-8 py-4">
                  View Pricing
                </Link>
              </>
            )}
          </div>

          {/* Hero stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 animate-fade-up-delay-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Interactive Tool Library */}
      <section className="py-24 relative" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-white">
              <span className="gradient-text">20+ Productivity</span> Tools
            </h2>
            <p className="section-sub">Everything you need to work faster and smarter, beautifully organized.</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.filter(c => c !== 'Professional' && c !== 'AI Tools').map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20'
                }`}
                style={{ border: activeCategory === cat ? '1px solid #8b5cf6' : '1px solid rgba(99,102,241,0.2)' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayTools.slice(0, 24).map((tool) => {
              const Icon = tool.icon
              return (
                <div key={tool.id} className="card group p-5 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${tool.color}22`, border: `1px solid ${tool.color}44` }}
                    >
                      <Icon size={18} style={{ color: tool.color }} />
                    </div>
                    <h3 className="text-md font-semibold text-white">{tool.name}</h3>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2">{tool.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-400 mb-6">And many more tools arriving soon...</p>
            <Link to="/dashboard" className="btn-outline text-indigo-400 px-8 py-3">
              Explore All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24" style={{ background: '#080810' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-white">How It <span className="gradient-text">Works</span></h2>
            <p className="section-sub">Get started in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up with your email and get started instantly. No credit card required for registration.' },
              { step: '02', title: 'Buy Credits', desc: 'Choose a plan that fits your needs. Start with ₹100 and scale up as you grow.' },
              { step: '03', title: 'Use Tools', desc: 'Access all productivity tools. Each tool deducts a small amount of credits per use.' },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="text-6xl font-black gradient-text opacity-20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 relative overflow-hidden">
        <div className="glow-blob w-96 h-96 -bottom-20 left-1/2" style={{ background: '#6366f1' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-white">Simple <span className="gradient-text">Pricing</span></h2>
            <p className="section-sub">No hidden fees. Buy credits once, use them whenever you want.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <PricingCard key={plan.id} plan={plan} onBuy={() => {}} loading={false} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/pricing" className="btn-primary px-8 py-3 text-lg">
              View All Plans <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ background: '#080810' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="rounded-3xl p-12" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.3)' }}>
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to <span className="gradient-text">Boost Your Productivity?</span>
            </h2>
            <p className="text-slate-400 mb-8 text-lg">Join thousands of professionals using Incoin Assistant every day.</p>
            <Link to="/signup" className="btn-primary text-lg px-10 py-4" style={{ animation: 'pulseGlow 2s ease-in-out infinite' }}>
              Start for Free <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
