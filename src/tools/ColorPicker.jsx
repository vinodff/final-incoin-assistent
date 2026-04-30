import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function ColorPicker() {
  const [color, setColor] = useState('#6366f1')
  const [copied, setCopied] = useState('')

  const hexToRgb = (h) => { const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16); return { r, g, b } }
  const rgbToHsl = ({ r, g, b }) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2
    let h = 0, s = 0
    if (max !== min) {
      const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
      else if (max === g) h = ((b - r) / d + 2) / 6
      else h = ((r - g) / d + 4) / 6
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const rgb = hexToRgb(color)
  const hsl = rgbToHsl(rgb)

  const formats = [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'RGBA', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
  ]

  function copy(val, label) { navigator.clipboard.writeText(val); setCopied(label); setTimeout(() => setCopied(''), 1500) }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      {/* Picker */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
        <div style={{ position: 'relative' }}>
          <input type="color" value={color} onChange={e => setColor(e.target.value)}
            style={{ width: 120, height: 120, border: 'none', cursor: 'pointer', borderRadius: 16, background: 'transparent' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 16, border: '2px solid rgba(99,102,241,0.3)', pointerEvents: 'none' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 40, fontWeight: 700, color: color, marginBottom: 4 }}>{color.toUpperCase()}</div>
          <div style={{ width: '100%', height: 24, borderRadius: 8, background: `linear-gradient(to right, ${color}00, ${color})` }} />
        </div>
      </div>

      {/* Color values */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {formats.map(f => (
          <div key={f.label} onClick={() => copy(f.value, f.label)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 12, background: '#111120', border: '1px solid rgba(99,102,241,0.2)', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: 11, color: '#64748b', marginBottom: 2 }}>{f.label}</div>
              <div style={{ fontSize: 14, color: '#e2e8f0', fontFamily: 'monospace' }}>{f.value}</div>
            </div>
            {copied === f.label ? <Check size={14} color="#10b981" /> : <Copy size={14} color="#64748b" />}
          </div>
        ))}
      </div>

      {/* Shades */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8, fontWeight: 600 }}>SHADES</div>
        <div style={{ display: 'flex', gap: 4, borderRadius: 10, overflow: 'hidden' }}>
          {[0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 0.9, 1].map((opacity, i) => (
            <div key={i} style={{ flex: 1, height: 40, background: color, opacity }} />
          ))}
        </div>
      </div>
    </div>
  )
}
