import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { initiatePayment } from '../lib/razorpay'
import { PLANS } from '../lib/plans'
import ToolCard from '../components/ToolCard'
import PricingCard from '../components/PricingCard'
import toast from 'react-hot-toast'
import {
  Zap, LogOut, FileText, Image, Youtube, RefreshCw, Brain,
  FileCode, QrCode, Home, CreditCard, Grid, User, ChevronRight, X
} from 'lucide-react'

import { TOOLS, CATEGORIES } from '../lib/tools'

export default function Dashboard() {
  const { user, profile, signOut, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('tools')
  const [activeCategory, setActiveCategory] = useState('All')
  const [loadingPlan, setLoadingPlan] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const credits = profile?.credits ?? 0
  const filteredTools = activeCategory === 'All' ? TOOLS : TOOLS.filter(t => t.category === activeCategory)

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  async function handleBuyPlan(plan) {
    setLoadingPlan(plan.id)
    await initiatePayment({
      plan,
      user,
      onSuccess: async ({ totalCredits }) => {
        await refreshProfile()
        toast.success(`🎉 ${totalCredits} credits added to your account!`)
        setActiveTab('tools')
        setLoadingPlan(null)
      },
      onError: (msg) => {
        toast.error(msg)
        setLoadingPlan(null)
      },
    })
    setLoadingPlan(null)
  }

  function handleUseTool(tool) {
    if (tool.comingSoon) {
      toast('🚧 This complex tool is coming soon in v2!', { icon: '🚧' })
      return
    }
    // Note: Deduct credits logic can be added here before navigation if needed.
    // For now, we just navigate to the fully functional tool.
    navigate(`/tool/${tool.id}`)
  }

  const navItems = [
    { id: 'tools', label: 'Tools', icon: Grid },
    { id: 'buy-credits', label: 'Buy Credits', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="flex min-h-screen" style={{ background: '#050507' }}>
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: '#080810', borderRight: '1px solid rgba(99,102,241,0.15)' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid rgba(99,102,241,0.1)' }}>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-bold gradient-text">Incoin</span>
          </Link>
          <button className="lg:hidden text-slate-400" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>

        {/* Credits */}
        <div className="p-4">
          <div className="rounded-xl p-4" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.3)' }}>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-indigo-400" />
              <span className="text-sm text-slate-400">Your Credits</span>
            </div>
            <div className="text-3xl font-bold gradient-text">{credits}</div>
            <button
              onClick={() => { setActiveTab('buy-credits'); setSidebarOpen(false) }}
              className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              + Buy more credits →
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === item.id ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                style={activeTab === item.id ? { background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' } : {}}
              >
                <Icon size={18} />
                {item.label}
                {activeTab === item.id && <ChevronRight size={14} className="ml-auto" />}
              </button>
            )
          })}
        </nav>

        {/* Sign Out */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(99,102,241,0.1)' }}>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 py-4 glass">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <Grid size={22} />
            </button>
            <h1 className="text-xl font-bold text-white capitalize">
              {activeTab === 'buy-credits' ? 'Buy Credits' : activeTab === 'profile' ? 'Profile' : 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
              <Zap size={14} className="text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-300">{credits} Credits</span>
            </div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              {user?.email?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-8 overflow-auto">
          {/* TOOLS TAB */}
          {activeTab === 'tools' && (
            <div>
              {/* Welcome */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-1">Welcome back! 👋</h2>
                <p className="text-slate-400">You have <span className="text-indigo-400 font-semibold">{credits} credits</span> remaining.</p>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap mb-6">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                    style={activeCategory === cat
                      ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff' }
                      : { background: 'rgba(99,102,241,0.1)', color: '#94a3b8', border: '1px solid rgba(99,102,241,0.2)' }
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} userCredits={credits} onUse={handleUseTool} />
                ))}
              </div>

              {credits < 2 && (
                <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)' }}>
                  <p className="text-slate-300 mb-4">You're running low on credits!</p>
                  <button onClick={() => setActiveTab('buy-credits')} className="btn-primary">
                    <CreditCard size={16} /> Buy Credits
                  </button>
                </div>
              )}
            </div>
          )}

          {/* BUY CREDITS TAB */}
          {activeTab === 'buy-credits' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-1">Buy Credits</h2>
                <p className="text-slate-400">Credits never expire. Choose the plan that suits you.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl items-center">
                {PLANS.map(plan => (
                  <PricingCard key={plan.id} plan={plan} onBuy={handleBuyPlan} loading={loadingPlan === plan.id} />
                ))}
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="max-w-xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-1">Your Profile</h2>
                <p className="text-slate-400">Manage your account details</p>
              </div>

              <div className="card mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                    {user?.email?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{user?.user_metadata?.full_name || 'User'}</p>
                    <p className="text-slate-400 text-sm">{user?.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(99,102,241,0.1)' }}>
                    <span className="text-slate-400 text-sm">Email</span>
                    <span className="text-white text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(99,102,241,0.1)' }}>
                    <span className="text-slate-400 text-sm">Credits Balance</span>
                    <div className="flex items-center gap-1 text-indigo-400 font-semibold">
                      <Zap size={14} />
                      {credits}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-400 text-sm">Member Since</span>
                    <span className="text-white text-sm">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}
                    </span>
                  </div>
                </div>
              </div>

              <button onClick={handleSignOut} className="btn-outline text-sm" style={{ borderColor: 'rgba(239,68,68,0.4)', color: '#f87171' }}>
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
