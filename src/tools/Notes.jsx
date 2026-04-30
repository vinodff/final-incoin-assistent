import { useState, useEffect } from 'react'
import { Save, Trash2, Plus, FileText } from 'lucide-react'

const S = { bg: '#111120', border: 'rgba(99,102,241,0.2)', input: 'rgba(99,102,241,0.08)', muted: '#64748b' }

export default function Notes() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('ic_notes') || '[]'))
  const [active, setActive] = useState(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => { localStorage.setItem('ic_notes', JSON.stringify(notes)) }, [notes])

  function newNote() { const n = { id: Date.now(), title: 'Untitled', body: '', date: new Date().toLocaleDateString() }; setNotes([n, ...notes]); select(n) }
  function select(n) { setActive(n.id); setTitle(n.title); setBody(n.body) }
  function save() { if (!active) return; setNotes(notes.map(n => n.id === active ? { ...n, title, body, date: new Date().toLocaleDateString() } : n)) }
  function remove(id) { setNotes(notes.filter(n => n.id !== id)); if (active === id) { setActive(null); setTitle(''); setBody('') } }

  return (
    <div style={{ display: 'flex', gap: 16, minHeight: 400 }}>
      {/* Sidebar */}
      <div style={{ width: 200, flexShrink: 0 }}>
        <button onClick={newNote} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
          <Plus size={16} /> New Note
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 340, overflowY: 'auto' }}>
          {notes.map(n => (
            <div key={n.id} onClick={() => select(n)}
              style={{ padding: '10px 12px', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: active === n.id ? 'rgba(99,102,241,0.2)' : 'transparent', border: active === n.id ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent' }}>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.title || 'Untitled'}</div>
                <div style={{ color: S.muted, fontSize: 11 }}>{n.date}</div>
              </div>
              <button onClick={e => { e.stopPropagation(); remove(n.id) }} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer', flexShrink: 0 }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div style={{ flex: 1 }}>
        {active ? (
          <>
            <input value={title} onChange={e => setTitle(e.target.value)} onBlur={save} placeholder="Note title..."
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#e2e8f0', fontSize: 20, fontWeight: 600, outline: 'none', marginBottom: 12 }} />
            <textarea value={body} onChange={e => setBody(e.target.value)} onBlur={save} placeholder="Start writing..."
              style={{ width: '100%', height: 300, background: S.input, border: `1px solid ${S.border}`, borderRadius: 12, padding: 16, color: '#e2e8f0', fontSize: 14, lineHeight: 1.7, outline: 'none', resize: 'none' }} />
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: S.muted }}>
            <FileText size={48} style={{ marginBottom: 12, opacity: 0.3 }} />
            <p>Select a note or create a new one</p>
          </div>
        )}
      </div>
    </div>
  )
}
