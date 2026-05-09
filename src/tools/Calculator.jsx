import { useState } from 'react'

const btn = (label, type) => ({ label, type })
const BTNS = [
  [btn('C','clear'), btn('+/-','sign'), btn('%','pct'), btn('÷','op')],
  [btn('7','num'),   btn('8','num'),   btn('9','num'),  btn('×','op')],
  [btn('4','num'),   btn('5','num'),   btn('6','num'),  btn('-','op')],
  [btn('1','num'),   btn('2','num'),   btn('3','num'),  btn('+','op')],
  [btn('0','zero'),  btn('.','dot'),                    btn('=','eq')],
]

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState(null)
  const [op, setOp] = useState(null)
  const [fresh, setFresh] = useState(true)

  function press(b) {
    if (b.type === 'num' || b.type === 'zero') {
      if (fresh) { setDisplay(b.label); setFresh(false) }
      else setDisplay(d => d === '0' ? b.label : d + b.label)
    } else if (b.type === 'dot') {
      if (fresh) { setDisplay('0.'); setFresh(false) }
      else if (!display.includes('.')) setDisplay(d => d + '.')
    } else if (b.type === 'clear') {
      setDisplay('0'); setPrev(null); setOp(null); setFresh(true)
    } else if (b.type === 'sign') {
      setDisplay(d => String(-parseFloat(d)))
    } else if (b.type === 'pct') {
      setDisplay(d => String(parseFloat(d) / 100))
    } else if (b.type === 'op') {
      setPrev(parseFloat(display)); setOp(b.label); setFresh(true)
    } else if (b.type === 'eq') {
      if (op && prev !== null) {
        const cur = parseFloat(display)
        const ops = { '÷': prev / cur, '×': prev * cur, '-': prev - cur, '+': prev + cur }
        const r = ops[op]
        setDisplay(String(parseFloat(r.toFixed(10))))
        setPrev(null); setOp(null); setFresh(true)
      }
    }
  }

  const btnStyle = (b) => ({
    padding: b.type === 'zero' ? '20px' : '20px',
    borderRadius: 16, border: 'none', cursor: 'pointer', fontSize: 22, fontWeight: 500,
    gridColumn: b.type === 'zero' ? 'span 2' : 'span 1',
    background: b.type === 'op' ? '#6366f1' : b.type === 'eq' ? '#8b5cf6' : b.type === 'clear' || b.type === 'sign' || b.type === 'pct' ? '#334155' : '#1e293b',
    color: '#fff', transition: 'opacity 0.15s',
  })

  return (
    <div style={{ maxWidth: 340, margin: '0 auto' }}>
      <div style={{ background: '#111120', borderRadius: 20, padding: '20px 20px 8px', marginBottom: 8, textAlign: 'right' }}>
        {op && <div style={{ color: '#64748b', fontSize: 14, marginBottom: 4 }}>{prev} {op}</div>}
        <div style={{ fontSize: 48, fontWeight: 300, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {display.length > 9 ? parseFloat(display).toExponential(3) : display}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {BTNS.flat().map((b, i) => (
          <button key={i} onClick={() => press(b)} style={btnStyle(b)}
            onMouseDown={e => e.currentTarget.style.opacity = '0.7'}
            onMouseUp={e => e.currentTarget.style.opacity = '1'}>
            {b.label}
          </button>
        ))}
      </div>
    </div>
  )
}
