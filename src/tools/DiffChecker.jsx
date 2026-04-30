import { useState } from 'react'

const S = { input: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', muted: '#64748b' }

export default function DiffChecker() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')

  const leftLines = left.split('\n')
  const rightLines = right.split('\n')
  const maxLen = Math.max(leftLines.length, rightLines.length)

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: S.muted, marginBottom: 8, fontWeight: 600 }}>ORIGINAL</div>
          <textarea value={left} onChange={e => setLeft(e.target.value)} placeholder="Paste original text..."
            style={{ width: '100%', height: 150, background: S.input, border: `1px solid ${S.border}`, borderRadius: 12, padding: 14, color: '#e2e8f0', fontSize: 13, lineHeight: 1.6, outline: 'none', resize: 'none', fontFamily: 'monospace' }} />
        </div>
        <div>
          <div style={{ fontSize: 12, color: S.muted, marginBottom: 8, fontWeight: 600 }}>MODIFIED</div>
          <textarea value={right} onChange={e => setRight(e.target.value)} placeholder="Paste modified text..."
            style={{ width: '100%', height: 150, background: S.input, border: `1px solid ${S.border}`, borderRadius: 12, padding: 14, color: '#e2e8f0', fontSize: 13, lineHeight: 1.6, outline: 'none', resize: 'none', fontFamily: 'monospace' }} />
        </div>
      </div>

      {(left || right) && (
        <div style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${S.border}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#0d0d15', padding: '8px 14px', borderBottom: `1px solid ${S.border}` }}>
            <span style={{ fontSize: 12, color: S.muted, fontWeight: 600 }}>Original</span>
            <span style={{ fontSize: 12, color: S.muted, fontWeight: 600 }}>Modified</span>
          </div>
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {Array.from({ length: maxLen }, (_, i) => {
              const l = leftLines[i] || ''
              const r = rightLines[i] || ''
              const same = l === r
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid rgba(99,102,241,0.06)' }}>
                  <div style={{ padding: '6px 14px', fontSize: 13, fontFamily: 'monospace', background: same ? 'transparent' : 'rgba(239,68,68,0.08)', color: same ? '#94a3b8' : '#fca5a5', borderRight: `1px solid ${S.border}` }}>
                    <span style={{ color: '#475569', marginRight: 12, fontSize: 11 }}>{i + 1}</span>{l}
                  </div>
                  <div style={{ padding: '6px 14px', fontSize: 13, fontFamily: 'monospace', background: same ? 'transparent' : 'rgba(16,185,129,0.08)', color: same ? '#94a3b8' : '#86efac' }}>
                    <span style={{ color: '#475569', marginRight: 12, fontSize: 11 }}>{i + 1}</span>{r}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {left && right && (
        <div style={{ marginTop: 12, textAlign: 'center', color: S.muted, fontSize: 13 }}>
          {leftLines.filter((l, i) => l !== (rightLines[i] || '')).length} of {maxLen} lines differ
        </div>
      )}
    </div>
  )
}
