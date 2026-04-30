import { useState } from 'react'

const S = { input: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', muted: '#64748b' }

export default function WordCounter() {
  const [text, setText] = useState('')
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const chars = text.length
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0
  const readTime = Math.max(1, Math.ceil(words / 200))

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste or type your text here..."
        style={{ width: '100%', height: 220, background: S.input, border: `1px solid ${S.border}`, borderRadius: 14, padding: 16, color: '#e2e8f0', fontSize: 15, lineHeight: 1.7, outline: 'none', resize: 'none', marginBottom: 20 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { label: 'Words', val: words, color: '#6366f1' },
          { label: 'Characters', val: chars, color: '#8b5cf6' },
          { label: 'Sentences', val: sentences, color: '#10b981' },
          { label: 'Read Time', val: `${readTime} min`, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={{ padding: 16, borderRadius: 12, background: '#111120', border: `1px solid ${S.border}`, textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 12, color: S.muted }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
