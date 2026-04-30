import { useState, useEffect } from 'react'
import { Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react'

const S = { bg: '#111120', border: 'rgba(99,102,241,0.2)', input: 'rgba(99,102,241,0.08)', muted: '#64748b' }

export default function BudgetTracker() {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('ic_budget') || '[]'))
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')

  useEffect(() => { localStorage.setItem('ic_budget', JSON.stringify(items)) }, [items])

  function add() {
    if (!desc.trim() || !amount) return
    setItems([{ id: Date.now(), desc: desc.trim(), amount: +amount, type, date: new Date().toLocaleDateString() }, ...items])
    setDesc(''); setAmount('')
  }

  const income = items.filter(i => i.type === 'income').reduce((s, i) => s + i.amount, 0)
  const expense = items.filter(i => i.type === 'expense').reduce((s, i) => s + i.amount, 0)
  const balance = income - expense

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Balance', val: balance, color: balance >= 0 ? '#10b981' : '#ef4444' },
          { label: 'Income', val: income, color: '#10b981' },
          { label: 'Expense', val: expense, color: '#ef4444' },
        ].map(s => (
          <div key={s.label} style={{ padding: 16, borderRadius: 12, background: S.bg, border: `1px solid ${S.border}`, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: S.muted, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>₹{s.val.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Add */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: `1px solid ${S.border}` }}>
          {['income', 'expense'].map(t => (
            <button key={t} onClick={() => setType(t)}
              style={{ padding: '8px 14px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, textTransform: 'capitalize',
                background: type === t ? (t === 'income' ? '#10b981' : '#ef4444') : 'transparent',
                color: type === t ? '#fff' : S.muted }}>
              {t}
            </button>
          ))}
        </div>
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description"
          style={{ flex: 1, minWidth: 120, background: S.input, border: `1px solid ${S.border}`, borderRadius: 10, padding: '8px 12px', color: '#e2e8f0', outline: 'none' }} />
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="₹ Amount"
          style={{ width: 100, background: S.input, border: `1px solid ${S.border}`, borderRadius: 10, padding: '8px 12px', color: '#e2e8f0', outline: 'none' }} />
        <button onClick={add} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: 10, padding: '8px 16px', color: '#fff', cursor: 'pointer' }}>
          <Plus size={18} />
        </button>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: S.muted }}>No transactions yet.</div>}
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, background: S.bg, border: `1px solid ${S.border}` }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: item.type === 'income' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)' }}>
              {item.type === 'income' ? <TrendingUp size={16} color="#10b981" /> : <TrendingDown size={16} color="#ef4444" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#e2e8f0', fontSize: 14 }}>{item.desc}</div>
              <div style={{ color: S.muted, fontSize: 11 }}>{item.date}</div>
            </div>
            <span style={{ fontWeight: 600, color: item.type === 'income' ? '#10b981' : '#ef4444' }}>
              {item.type === 'income' ? '+' : '-'}₹{item.amount.toLocaleString()}
            </span>
            <button onClick={() => setItems(items.filter(i => i.id !== item.id))} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer' }}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
