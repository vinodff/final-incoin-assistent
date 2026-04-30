import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const S = { input: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', muted: '#64748b' }

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function format() {
    try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); setError('') }
    catch (e) { setError(e.message); setOutput('') }
  }
  function minify() {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError('') }
    catch (e) { setError(e.message); setOutput('') }
  }
  function copy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='Paste JSON here...\n{"key": "value"}'
        style={{ width: '100%', height: 160, background: S.input, border: `1px solid ${S.border}`, borderRadius: 14, padding: 16, color: '#e2e8f0', fontSize: 13, fontFamily: 'monospace', lineHeight: 1.6, outline: 'none', resize: 'none', marginBottom: 12 }} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={format} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Format</button>
        <button onClick={minify} style={{ padding: '10px 20px', borderRadius: 10, border: `1px solid ${S.border}`, background: 'transparent', color: '#a5b4fc', cursor: 'pointer' }}>Minify</button>
        {output && <button onClick={copy} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 10, border: 'none', background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', cursor: 'pointer', fontSize: 13 }}>
          {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
        </button>}
      </div>
      {error && <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', fontSize: 13, marginBottom: 12 }}>{error}</div>}
      {output && (
        <pre style={{ background: '#111120', border: `1px solid ${S.border}`, borderRadius: 14, padding: 16, color: '#10b981', fontSize: 13, lineHeight: 1.6, overflow: 'auto', maxHeight: 300 }}>{output}</pre>
      )}
    </div>
  )
}
