import { useState, useEffect } from 'react'
import { Plus, Trash2, Flame, Check } from 'lucide-react'

const S = { bg: '#111120', border: 'rgba(99,102,241,0.2)', input: 'rgba(99,102,241,0.08)', muted: '#64748b' }
const today = () => new Date().toISOString().split('T')[0]

export default function HabitTracker() {
  const [habits, setHabits] = useState(() => JSON.parse(localStorage.getItem('ic_habits') || '[]'))
  const [text, setText] = useState('')

  useEffect(() => { localStorage.setItem('ic_habits', JSON.stringify(habits)) }, [habits])

  function add() {
    if (!text.trim()) return
    setHabits([...habits, { id: Date.now(), name: text.trim(), log: [], streak: 0 }])
    setText('')
  }

  function toggle(id) {
    setHabits(habits.map(h => {
      if (h.id !== id) return h
      const d = today()
      const done = h.log.includes(d)
      const log = done ? h.log.filter(x => x !== d) : [...h.log, d]
      let streak = 0
      const dt = new Date()
      while (true) {
        const ds = dt.toISOString().split('T')[0]
        if (log.includes(ds)) { streak++; dt.setDate(dt.getDate() - 1) } else break
      }
      return { ...h, log, streak }
    }))
  }

  function remove(id) { setHabits(habits.filter(h => h.id !== id)) }

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i))
    return { date: d.toISOString().split('T')[0], label: d.toLocaleDateString('en', { weekday: 'short' }) }
  })

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div className="flex gap-2 mb-6">
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Add a habit..."
          style={{ flex: 1, background: S.input, border: `1px solid ${S.border}`, borderRadius: 12, padding: '12px 16px', color: '#e2e8f0', outline: 'none' }} />
        <button onClick={add} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: 12, padding: '12px 16px', color: '#fff', cursor: 'pointer' }}>
          <Plus size={20} />
        </button>
      </div>

      {habits.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: S.muted }}>No habits yet. Add one above!</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {habits.map(h => (
          <div key={h.id} style={{ padding: 16, borderRadius: 14, background: S.bg, border: `1px solid ${S.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{h.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {h.streak > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f59e0b', fontSize: 13, fontWeight: 600 }}><Flame size={14} />{h.streak}d</span>}
                <button onClick={() => remove(h.id)} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer' }}><Trash2 size={14} /></button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {last7.map(day => {
                const done = h.log.includes(day.date)
                const isToday = day.date === today()
                return (
                  <div key={day.date} onClick={() => isToday && toggle(h.id)}
                    style={{ flex: 1, textAlign: 'center', cursor: isToday ? 'pointer' : 'default' }}>
                    <div style={{ fontSize: 10, color: S.muted, marginBottom: 4 }}>{day.label}</div>
                    <div style={{ width: 32, height: 32, borderRadius: 8, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: done ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'rgba(99,102,241,0.08)',
                      border: isToday ? '2px solid #6366f1' : '1px solid rgba(99,102,241,0.15)' }}>
                      {done && <Check size={16} color="#fff" />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
