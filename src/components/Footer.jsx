import { Link } from 'react-router-dom'
import { Zap, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#0d0d15', borderTop: '1px solid rgba(99,102,241,0.15)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <Zap size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="gradient-text">Incoin</span>
                <span className="text-white"> Assistant</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs">
              Your All-in-One Productivity Hub. Access 50+ AI-powered tools to supercharge your workflow.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Home</Link></li>
              <li><Link to="/pricing" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Pricing</Link></li>
              <li><Link to="/dashboard" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Login</Link></li>
              <li><Link to="/signup" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Sign Up</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2024 Incoin Assistant. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors"><Github size={18} /></a>
            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors"><Twitter size={18} /></a>
            <a href="mailto:support@incoinassistant.com" className="text-slate-500 hover:text-indigo-400 transition-colors"><Mail size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
