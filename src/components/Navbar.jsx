import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Zap, Menu, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function handleSignOut() {
    await signOut()
    toast.success('Signed out successfully')
    navigate('/')
  }

  const isDashboard = location.pathname === '/dashboard'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg">
              <span className="gradient-text">Incoin</span>
              <span className="text-white"> Assistant</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
            <Link to="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
            {user && (
              <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {profile && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
                    <Zap size={14} className="text-indigo-400" />
                    <span className="text-sm font-semibold text-indigo-300">{profile.credits ?? 0} Credits</span>
                  </div>
                )}
                <button onClick={handleSignOut} className="btn-outline text-sm px-4 py-2">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline text-sm px-4 py-2">Login</Link>
                <Link to="/signup" className="btn-primary text-sm px-4 py-2">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-indigo-500/10">
          <div className="px-4 py-4 flex flex-col gap-3">
            <Link to="/" className="text-slate-300 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/pricing" className="text-slate-300 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Pricing</Link>
            {user && (
              <Link to="/dashboard" className="text-slate-300 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            )}
            <div className="border-t border-indigo-500/10 pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  {profile && (
                    <div className="flex items-center gap-2 py-2">
                      <Zap size={14} className="text-indigo-400" />
                      <span className="text-sm text-indigo-300">{profile.credits ?? 0} Credits</span>
                    </div>
                  )}
                  <button onClick={handleSignOut} className="btn-outline text-sm text-center">Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-outline text-sm text-center" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/signup" className="btn-primary text-sm text-center" onClick={() => setMenuOpen(false)}>Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
