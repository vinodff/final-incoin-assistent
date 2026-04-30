import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const S = { input: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', muted: '#64748b' }

export default function UrlEncoder() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('encode')
  const [copied, setCopied] = useState(false)

  const output = (() => {
    try {
      return mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input)
    } catch { return 'Invalid input' }
  })()

  function copy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  return (
    <div style={{ maxWidth: 550, margin: '0 auto' }}>
      <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: `1px solid ${S.border}`, marginBottom: 16 }}>
        {['encode', 'decode'].map(m => (
          <button key={m} onClick={() => setMode(m)}
            style={{ flex: 1, padding: '10px', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, textTransform: 'capitalize',
              background: mode === m ? '#6366f1' : 'transparent', color: mode === m ? '#fff' : S.muted }}>
            {m}
          </button>
        ))}
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)}
        placeholder={mode === 'encode' ? 'Enter URL or text to encode...' : 'Enter encoded URL to decode...'}
        style={{ width: '100%', height: 100, background: S.input, border: `1px solid ${S.border}`, borderRadius: 14, padding: 16, color: '#e2e8f0', fontSize: 14, fontFamily: 'monospace', outline: 'none', resize: 'none', marginBottom: 16 }} />
      {input && (
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 12, color: S.muted, fontWeight: 600, marginBottom: 6 }}>RESULT</div>
          <div style={{ background: '#111120', border: `1px solid ${S.border}`, borderRadius: 14, padding: 16, color: '#10b981', fontSize: 14, fontFamily: 'monospace', wordBreak: 'break-all', minHeight: 60 }}>{output}</div>
          <button onClick={copy} style={{ position: 'absolute', top: 28, right: 10, background: 'rgba(99,102,241,0.2)', border: 'none', borderRadius: 8, padding: '6px 10px', color: '#a5b4fc', cursor: 'pointer' }}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      )}
    </div>
  )
}
