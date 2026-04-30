import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const S = { input: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', muted: '#64748b' }

const conversions = {
  UPPERCASE: t => t.toUpperCase(),
  lowercase: t => t.toLowerCase(),
  'Title Case': t => t.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()),
  'Sentence case': t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase(),
  camelCase: t => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
  'snake_case': t => t.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''),
  'kebab-case': t => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  'aLtErNaTiNg': t => t.split('').map((c, i) => i % 2 ? c.toUpperCase() : c.toLowerCase()).join(''),
}

export default function CaseConverter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState('')

  function copy(key) {
    navigator.clipboard.writeText(conversions[key](text))
    setCopied(key); setTimeout(() => setCopied(''), 1500)
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type or paste text to convert..."
        style={{ width: '100%', height: 120, background: S.input, border: `1px solid ${S.border}`, borderRadius: 14, padding: 16, color: '#e2e8f0', fontSize: 15, lineHeight: 1.6, outline: 'none', resize: 'none', marginBottom: 16 }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {Object.keys(conversions).map(key => (
          <button key={key} onClick={() => copy(key)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: '#111120', border: `1px solid ${S.border}`, color: '#e2e8f0', cursor: 'pointer', fontSize: 13 }}>
            <span>{key}</span>
            {copied === key ? <Check size={14} color="#10b981" /> : <Copy size={14} color="#64748b" />}
          </button>
        ))}
      </div>
      {text && (
        <div style={{ marginTop: 16, padding: 16, borderRadius: 12, background: '#111120', border: `1px solid ${S.border}` }}>
          <div style={{ fontSize: 12, color: S.muted, marginBottom: 8 }}>Preview (Title Case)</div>
          <div style={{ color: '#e2e8f0', fontSize: 14 }}>{conversions['Title Case'](text)}</div>
        </div>
      )}
    </div>
  )
}
