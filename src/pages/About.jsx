import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Zap, Target, Users, Shield, Award, Heart } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Simplicity First',
    desc: 'Every tool is designed to be intuitive. No steep learning curves — just open and use.',
  },
  {
    icon: Shield,
    title: 'Privacy by Default',
    desc: 'Your data stays yours. We never sell, share, or monetize your personal information.',
  },
  {
    icon: Award,
    title: 'Quality Over Quantity',
    desc: 'We ship fewer tools that work perfectly rather than hundreds that barely function.',
  },
  {
    icon: Heart,
    title: 'Built for Everyone',
    desc: 'Students, developers, freelancers, and teams — Incoin Assistant works for all of them.',
  },
]

const stats = [
  { value: '50+', label: 'Productivity Tools' },
  { value: '10K+', label: 'Active Users' },
  { value: '1M+', label: 'Tasks Completed' },
  { value: '99.9%', label: 'Uptime' },
]

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: '#050507' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: '#6366f1' }} />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: '#8b5cf6' }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border"
            style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
            <Users size={14} />
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Building the Future of{' '}
            <span className="gradient-text">Productivity</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Incoin Assistant was born from a simple frustration — why do you need 20 different apps to get
            your work done? We set out to build one place where every tool you need just works.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 border-y" style={{ borderColor: 'rgba(99,102,241,0.1)', background: 'rgba(99,102,241,0.03)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold gradient-text mb-1">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 sm:p-12 border" style={{ background: 'rgba(99,102,241,0.05)', borderColor: 'rgba(99,102,241,0.15)' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <Zap size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              We believe productivity tools should be <strong className="text-white">accessible, affordable, and powerful</strong>.
              Too many SaaS products charge ₹1,000+ per month for features most users barely touch.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Incoin Assistant flips that model. You buy only the credits you need, use only the tools you
              want, and never pay for features gathering dust. Whether you're a student on a tight budget
              or a professional who needs advanced tools, there's a plan for you.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(v => (
              <div key={v.title} className="rounded-xl p-6 border transition-colors hover:border-indigo-500/40"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(99,102,241,0.1)' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(99,102,241,0.15)' }}>
                  <v.icon size={20} className="text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team note */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Made with ♥ in India</h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            We're a small, passionate team based in India. We built Incoin Assistant because we wanted it
            ourselves. Every feature, every tool, every design decision is made with the end-user in mind.
            We're constantly listening to feedback and shipping improvements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/pricing"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              Get Started
            </Link>
            <Link to="/contact"
              className="px-6 py-3 rounded-xl font-semibold border transition-colors"
              style={{ borderColor: 'rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
