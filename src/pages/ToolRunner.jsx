import { useEffect, useState } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, Zap } from 'lucide-react'
import { TOOLS } from '../lib/tools'
import { ToolRegistry } from '../lib/toolComponents'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'

export default function ToolRunner() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, profile, refreshProfile } = useAuth()
  const [ready, setReady] = useState(false)

  const toolInfo = TOOLS.find(t => t.id === id)
  const ToolComponent = ToolRegistry[id]

  useEffect(() => {
    if (!toolInfo || !ToolComponent || !user || !profile) return

    const cost = toolInfo.credits ?? 1
    const current = profile.credits ?? 0

    if (current < cost) {
      toast.error(`Not enough credits. You need ${cost} credits to use ${toolInfo.name}.`)
      navigate('/dashboard')
      return
    }

    // Deduct credits immediately
    supabase
      .from('profiles')
      .update({ credits: current - cost })
      .eq('id', user.id)
      .then(async ({ error }) => {
        if (error) {
          toast.error('Failed to deduct credits. Please try again.')
          navigate('/dashboard')
          return
        }
        await refreshProfile()
        setReady(true)
      })
  }, [user, profile])

  if (!toolInfo || !ToolComponent) return <Navigate to="/dashboard" replace />

  const Icon = toolInfo.icon

  return (
    <div style={{ background: '#050507', minHeight: '100vh' }} className="flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${toolInfo.color}22`, border: `1px solid ${toolInfo.color}44` }}
              >
                <Icon size={24} style={{ color: toolInfo.color }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{toolInfo.name}</h1>
                <p className="text-slate-400 text-sm">{toolInfo.desc}</p>
              </div>
            </div>
          </div>

          {/* Credits cost badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
            <Zap size={14} className="text-indigo-400" />
            {toolInfo.credits} credit{toolInfo.credits !== 1 ? 's' : ''} used
          </div>
        </div>

        {!ready ? (
          <div className="flex items-center justify-center" style={{ minHeight: '400px' }}>
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-transparent border-t-indigo-500 animate-spin" />
              <p className="text-slate-400 text-sm">Deducting credits…</p>
            </div>
          </div>
        ) : (
          <div className="glass rounded-3xl p-8 border border-slate-800" style={{ minHeight: '600px' }}>
            <ToolComponent />
          </div>
        )}
      </main>
    </div>
  )
}
