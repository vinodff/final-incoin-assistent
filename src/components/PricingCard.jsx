import { Check, Zap } from 'lucide-react'

export default function PricingCard({ plan, onBuy, loading }) {
  return (
    <div
      className="relative rounded-2xl p-6 transition-all duration-300 flex flex-col"
      style={{
        background: plan.popular
          ? 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))'
          : '#0d0d15',
        border: plan.popular
          ? '1px solid rgba(99,102,241,0.6)'
          : '1px solid rgba(99,102,241,0.15)',
        boxShadow: plan.popular ? '0 0 40px rgba(99,102,241,0.2)' : 'none',
        transform: plan.popular ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      {plan.popular && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          MOST POPULAR
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
        <div className="flex items-baseline gap-1 mt-3">
          <span className="text-4xl font-bold gradient-text">₹{plan.price}</span>
        </div>
      </div>

      <div
        className="rounded-xl p-4 mb-6"
        style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Zap size={16} className="text-indigo-400" />
          <span className="text-2xl font-bold text-white">{plan.credits}</span>
          <span className="text-slate-400 text-sm">credits</span>
        </div>
        <p className="text-emerald-400 text-sm font-medium">+ {plan.bonus} bonus credits free!</p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.2)' }}>
              <Check size={12} className="text-indigo-400" />
            </div>
            <span className="text-slate-300 text-sm">{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onBuy(plan)}
        disabled={loading}
        className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        style={plan.popular
          ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 25px rgba(99,102,241,0.4)' }
          : { background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }
        }
      >
        {loading ? 'Processing...' : `Buy ${plan.name}`}
      </button>
    </div>
  )
}
