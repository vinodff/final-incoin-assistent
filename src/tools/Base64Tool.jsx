import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const S = { input: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', muted: '#64748b' }

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  function convert() {
    try {
      setError('')
      if (mode === 'encode') setOutput(btoa(unescape(encodeURIComponent(input))))
      else setOutput(decodeURIComponent(escape(atob(input))))
    } catch { setError('Invalid input for ' + mode) }
  }

  function copy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  return (
    <div style={{ maxWidth: 550, margin: '0 auto' }}>
      <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: `1px solid ${S.border}`, marginBottom: 16 }}>
        {['encode', 'decode'].map(m => (
          <button key={m} onClick={() => { setMode(m); setOutput(''); setError('') }}
            style={{ flex: 1, padding: '10px 16px', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, textTransform: 'capitalize',
              background: mode === m ? '#6366f1' : 'transparent', color: mode === m ? '#fff' : S.muted }}>
            {m}
          </button>
        ))}
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)}
        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
        style={{ width: '100%', height: 120, background: S.input, border: `1px solid ${S.border}`, borderRadius: 14, padding: 16, color: '#e2e8f0', fontSize: 14, fontFamily: 'monospace', outline: 'none', resize: 'none', marginBottom: 12 }} />
      <button onClick={convert} style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontWeight: 600, cursor: 'pointer', marginBottom: 12 }}>
        {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
      </button>
      {error && <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', color: '#fca5a5', fontSize: 13, marginBottom: 12 }}>{error}</div>}
      {output && (
        <div style={{ position: 'relative' }}>
          <pre style={{ background: '#111120', border: `1px solid ${S.border}`, borderRadius: 14, padding: 16, color: '#10b981', fontSize: 13, wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>{output}</pre>
          <button onClick={copy} style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(99,102,241,0.2)', border: 'none', borderRadius: 8, padding: '6px 10px', color: '#a5b4fc', cursor: 'pointer' }}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      )}
    </div>
  )
}
