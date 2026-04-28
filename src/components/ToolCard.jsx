import { Lock, Zap } from 'lucide-react'

export default function ToolCard({ tool, userCredits, onUse }) {
  const canUse = userCredits >= tool.credits
  const Icon = tool.icon

  return (
    <div
      className="relative rounded-2xl p-5 transition-all duration-300 group cursor-pointer"
      style={{
        background: '#0d0d15',
        border: '1px solid rgba(99,102,241,0.15)',
      }}
      onClick={() => canUse && onUse(tool)}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ background: `linear-gradient(135deg, ${tool.color}33, ${tool.color}11)`, border: `1px solid ${tool.color}44` }}
      >
        <Icon size={22} style={{ color: tool.color }} />
      </div>

      <h3 className="font-semibold text-white mb-1">{tool.name}</h3>
      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{tool.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Zap size={13} className="text-indigo-400" />
          <span className="text-sm text-indigo-300 font-medium">{tool.credits} credits</span>
        </div>
        {canUse ? (
          <span className="text-xs text-emerald-400 font-medium px-2 py-1 rounded-full" style={{ background: 'rgba(52,211,153,0.1)' }}>
            Available
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-slate-500 font-medium px-2 py-1 rounded-full" style={{ background: 'rgba(100,116,139,0.1)' }}>
            <Lock size={11} /> Need more credits
          </span>
        )}
      </div>

      {/* hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ border: `1px solid ${tool.color}55`, boxShadow: `0 0 20px ${tool.color}22` }}
      />
    </div>
  )
}
