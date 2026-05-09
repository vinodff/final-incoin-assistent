import { useState } from 'react'
import { Download } from 'lucide-react'

const S = { input: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', muted: '#64748b' }

export default function QrGenerator() {
  const [text, setText] = useState('https://incoinassistant.tech')
  const [size, setSize] = useState(200)

  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=0d0d15&color=ffffff&margin=10`

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Enter URL or text..."
        style={{ width: '100%', background: S.input, border: `1px solid ${S.border}`, borderRadius: 14, padding: '14px 16px', color: '#e2e8f0', fontSize: 15, outline: 'none', marginBottom: 16 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
        <span style={{ color: S.muted, fontSize: 14 }}>Size:</span>
        {[150, 200, 300].map(s => (
          <button key={s} onClick={() => setSize(s)}
            style={{ padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
              background: size === s ? '#6366f1' : S.input, color: size === s ? '#fff' : S.muted }}>
            {s}px
          </button>
        ))}
      </div>
      {text && (
        <div>
          <div style={{ display: 'inline-block', padding: 20, borderRadius: 20, background: '#111120', border: `1px solid ${S.border}`, marginBottom: 16 }}>
            <img src={url} alt="QR Code" width={size} height={size} style={{ borderRadius: 8, display: 'block' }} />
          </div>
          <br />
          <a href={url} download="qrcode.png"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
            <Download size={18} /> Download QR Code
          </a>
        </div>
      )}
    </div>
  )
}
