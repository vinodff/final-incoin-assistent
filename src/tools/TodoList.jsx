import { useState, useEffect } from 'react'
import { Plus, Trash2, CheckSquare, Square } from 'lucide-react'

const S = { bg: '#0a0a12', card: '#111120', border: 'rgba(99,102,241,0.2)', input: 'rgba(99,102,241,0.08)', text: '#e2e8f0', muted: '#64748b' }

export default function TodoList() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('ic_todos') || '[]'))
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => { localStorage.setItem('ic_todos', JSON.stringify(todos)) }, [todos])

  function add() {
    if (!text.trim()) return
    setTodos([...todos, { id: Date.now(), text: text.trim(), done: false, created: new Date().toLocaleDateString() }])
    setText('')
  }

  function toggle(id) { setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t)) }
  function remove(id) { setTodos(todos.filter(t => t.id !== id)) }
  function clearDone() { setTodos(todos.filter(t => !t.done)) }

  const filtered = todos.filter(t => filter === 'all' ? true : filter === 'active' ? !t.done : t.done)
  const doneCount = todos.filter(t => t.done).length

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      {/* Add */}
      <div className="flex gap-2 mb-6">
        <input
          value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add a task... (press Enter)"
          style={{ flex: 1, background: S.input, border: `1px solid ${S.border}`, borderRadius: 12, padding: '12px 16px', color: S.text, outline: 'none' }}
        />
        <button onClick={add} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: 12, padding: '12px 16px', color: '#fff', cursor: 'pointer' }}>
          <Plus size={20} />
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {['all', 'active', 'done'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', textTransform: 'capitalize', fontSize: 13, fontWeight: 500,
                background: filter === f ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : S.input,
                color: filter === f ? '#fff' : S.muted }}>
              {f}
            </button>
          ))}
        </div>
        {doneCount > 0 && (
          <button onClick={clearDone} style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
            Clear done ({doneCount})
          </button>
        )}
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: S.muted }}>
            {filter === 'all' ? 'No tasks yet. Add one above!' : `No ${filter} tasks.`}
          </div>
        )}
        {filtered.map(todo => (
          <div key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, background: S.card, border: `1px solid ${todo.done ? 'rgba(16,185,129,0.2)' : S.border}`, transition: 'all 0.2s' }}>
            <button onClick={() => toggle(todo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: todo.done ? '#10b981' : S.muted, flexShrink: 0 }}>
              {todo.done ? <CheckSquare size={20} /> : <Square size={20} />}
            </button>
            <span style={{ flex: 1, color: todo.done ? S.muted : S.text, textDecoration: todo.done ? 'line-through' : 'none', fontSize: 15 }}>{todo.text}</span>
            <span style={{ fontSize: 11, color: S.muted }}>{todo.created}</span>
            <button onClick={() => remove(todo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.muted }} onMouseOver={e => e.target.style.color='#ef4444'} onMouseOut={e => e.target.style.color=S.muted}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: S.muted }}>{todos.length} tasks · {doneCount} completed</p>
    </div>
  )
}
