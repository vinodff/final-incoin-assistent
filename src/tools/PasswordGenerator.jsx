import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function PasswordGenerator() {
  const [len, setLen] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [nums, setNums] = useState(true)
  const [syms, setSyms] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  function generate() {
    let chars = ''
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (nums) chars += '0123456789'
    if (syms) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (!chars) { chars = 'abcdefghijklmnopqrstuvwxyz' }
    const arr = new Uint32Array(len)
    crypto.getRandomValues(arr)
    setPassword(Array.from(arr, v => chars[v % chars.length]).join(''))
    setCopied(false)
  }

  function copy() { navigator.clipboard.writeText(password); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  if (!password) generate()

  const strength = len >= 20 && syms ? 4 : len >= 14 ? 3 : len >= 8 ? 2 : 1
  const strengthLabel = ['', 'Weak', 'Fair', 'Strong', 'Very Strong'][strength]
  const strengthColor = ['', '#ef4444', '#f59e0b', '#10b981', '#6366f1'][strength]

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      {/* Result */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 16, borderRadius: 14, background: '#111120', border: '1px solid rgba(99,102,241,0.2)', marginBottom: 20 }}>
        <div style={{ flex: 1, fontFamily: 'monospace', fontSize: 18, color: '#e2e8f0', wordBreak: 'break-all', letterSpacing: '1px' }}>{password}</div>
        <button onClick={copy} style={{ background: 'none', border: 'none', color: copied ? '#10b981' : '#6366f1', cursor: 'pointer', flexShrink: 0 }}>
          {copied ? <Check size={20} /> : <Copy size={20} />}
        </button>
      </div>

      {/* Strength */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= strength ? strengthColor : 'rgba(99,102,241,0.1)' }} />
        ))}
      </div>
      <div style={{ fontSize: 12, color: strengthColor, marginBottom: 20, textAlign: 'right' }}>{strengthLabel}</div>

      {/* Length */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: '#94a3b8', fontSize: 14 }}>Length</span>
          <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{len}</span>
        </div>
        <input type="range" min={4} max={64} value={len} onChange={e => { setLen(+e.target.value); generate() }}
          style={{ width: '100%', accentColor: '#6366f1' }} />
      </div>

      {/* Options */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
        {[
          ['Uppercase (A-Z)', upper, setUpper],
          ['Lowercase (a-z)', lower, setLower],
          ['Numbers (0-9)', nums, setNums],
          ['Symbols (!@#)', syms, setSyms],
        ].map(([label, val, set]) => (
          <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
            background: val ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.05)', border: `1px solid ${val ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.1)'}` }}>
            <input type="checkbox" checked={val} onChange={() => set(!val)} style={{ accentColor: '#6366f1' }} />
            <span style={{ color: '#e2e8f0', fontSize: 13 }}>{label}</span>
          </label>
        ))}
      </div>

      <button onClick={generate}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>
        <RefreshCw size={18} /> Generate Password
      </button>
    </div>
  )
}
