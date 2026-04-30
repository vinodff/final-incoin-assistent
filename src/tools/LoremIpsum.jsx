import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim est laborum'.split(' ')

const S = { input: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', muted: '#64748b' }

export default function LoremIpsum() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState('paragraphs')
  const [copied, setCopied] = useState(false)

  function generate() {
    if (type === 'paragraphs') {
      return Array.from({ length: count }, (_, i) => {
        if (i === 0) return LOREM
        const len = 40 + Math.floor(Math.random() * 30)
        return Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(' ') + '.'
      }).join('\n\n')
    }
    if (type === 'sentences') {
      return Array.from({ length: count }, () => {
        const len = 8 + Math.floor(Math.random() * 12)
        const s = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(' ')
        return s.charAt(0).toUpperCase() + s.slice(1) + '.'
      }).join(' ')
    }
    return Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(' ')
  }

  const text = generate()

  function copy() { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        <input type="number" min={1} max={50} value={count} onChange={e => setCount(Math.max(1, +e.target.value))}
          style={{ width: 70, background: S.input, border: `1px solid ${S.border}`, borderRadius: 10, padding: '10px 12px', color: '#e2e8f0', textAlign: 'center', outline: 'none' }} />
        <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: `1px solid ${S.border}` }}>
          {['paragraphs', 'sentences', 'words'].map(t => (
            <button key={t} onClick={() => setType(t)}
              style={{ padding: '10px 16px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, textTransform: 'capitalize',
                background: type === t ? '#6366f1' : 'transparent', color: type === t ? '#fff' : S.muted }}>
              {t}
            </button>
          ))}
        </div>
        <button onClick={copy} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
          {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
        </button>
      </div>
      <div style={{ padding: 20, borderRadius: 14, background: '#111120', border: `1px solid ${S.border}`, color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, maxHeight: 350, overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
        {text}
      </div>
    </div>
  )
}
