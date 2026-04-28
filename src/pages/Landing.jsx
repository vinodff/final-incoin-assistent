import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PricingCard from '../components/PricingCard'
import { useAuth } from '../context/AuthContext'
import { PLANS } from '../lib/plans'
import {
  ArrowRight, Zap, FileText, Image, Youtube, RefreshCw, Brain,
  Users, Star, Shield, Cpu, TrendingUp
} from 'lucide-react'

const features = [
  { icon: Brain, title: 'AI-Powered Tools', desc: 'Cutting-edge AI models to assist your work', color: '#6366f1' },
  { icon: FileText, title: 'Resume Builder', desc: 'Create professional resumes in minutes', color: '#8b5cf6' },
  { icon: Image, title: 'Image Tools', desc: 'Edit, resize, and convert images instantly', color: '#3b82f6' },
  { icon: Youtube, title: 'YouTube Tools', desc: 'Download, transcript, and analyze videos', color: '#ef4444' },
  { icon: RefreshCw, title: 'Converters', desc: 'Convert files, units, and formats easily', color: '#10b981' },
  { icon: Shield, title: 'Secure Platform', desc: 'Your data is encrypted and always safe', color: '#f59e0b' },
]

const stats = [
  { value: '50+', label: 'Tools Available' },
  { value: '10K+', label: 'Happy Users' },
  { value: '1M+', label: 'Tasks Completed' },
  { value: '99.9%', label: 'Uptime' },
]

export default function Landing() {
  const { user } = useAuth()

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

      {/* Features */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-white">
              Everything You <span className="gradient-text">Need</span>
            </h2>
            <p className="section-sub">Powerful tools designed to boost your productivity</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className="card group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${f.color}22`, border: `1px solid ${f.color}44` }}
                  >
                    <Icon size={22} style={{ color: f.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm">{f.desc}</p>
                </div>
              )
            })}
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
