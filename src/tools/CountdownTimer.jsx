import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

const S = { border: 'rgba(99,102,241,0.2)', input: 'rgba(99,102,241,0.08)', muted: '#64748b' }

export default function CountdownTimer() {
  const [h, setH] = useState(0); const [m, setM] = useState(25); const [s, setS] = useState(0)
  const [total, setTotal] = useState(0); const [left, setLeft] = useState(0); const [running, setRunning] = useState(false)
  const ref = useRef(null)

  const totalSecs = h * 3600 + m * 60 + s

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setLeft(l => {
          if (l <= 1) { clearInterval(ref.current); setRunning(false); try { new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play() } catch {} return 0 }
          return l - 1
        })
      }, 1000)
    } else clearInterval(ref.current)
    return () => clearInterval(ref.current)
  }, [running])

  function start() { const t = totalSecs; if (!t) return; setTotal(t); setLeft(t); setRunning(true) }
  function reset() { setRunning(false); clearInterval(ref.current); setLeft(0); setTotal(0) }

  const displayH = String(Math.floor(left / 3600)).padStart(2, '0')
  const displayM = String(Math.floor((left % 3600) / 60)).padStart(2, '0')
  const displayS = String(left % 60).padStart(2, '0')
  const pct = total ? left / total : 0

  const inp = (val, set, max) => (
    <input type="number" min={0} max={max} value={val}
      onChange={e => set(Math.max(0, Math.min(max, +e.target.value)))}
      style={{ width: 64, background: S.input, border: `1px solid ${S.border}`, borderRadius: 10, padding: '10px 8px', color: '#e2e8f0', textAlign: 'center', fontSize: 20, fontWeight: 600, outline: 'none' }}
    />
  )

  return (
    <div style={{ textAlign: 'center', maxWidth: 400, margin: '0 auto' }}>
      {!running && left === 0 ? (
        <div>
          <p style={{ color: '#64748b', marginBottom: 20 }}>Set your countdown time</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
            {inp(h, setH, 23)} <span style={{ color: '#64748b', fontSize: 20 }}>:</span>
            {inp(m, setM, 59)} <span style={{ color: '#64748b', fontSize: 20 }}>:</span>
            {inp(s, setS, 59)}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {[[0, 5, 0, '5 min'], [0, 15, 0, '15 min'], [0, 25, 0, '25 min'], [1, 0, 0, '1 hr']].map(([hh, mm, ss, l]) => (
              <button key={l} onClick={() => { setH(hh); setM(mm); setS(ss) }}
                style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc', cursor: 'pointer', fontSize: 13 }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto 24px' }}>
            <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="8" />
              <circle cx="100" cy="100" r="85" fill="none" stroke={left > 0 ? '#6366f1' : '#10b981'} strokeWidth="8"
                strokeDasharray={2 * Math.PI * 85} strokeDashoffset={2 * Math.PI * 85 * (1 - pct)}
                strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              {left === 0
                ? <span style={{ fontSize: 24, fontWeight: 700, color: '#10b981' }}>Done! 🎉</span>
                : <span style={{ fontSize: 40, fontWeight: 700, color: '#e2e8f0', letterSpacing: '-1px' }}>{displayH}:{displayM}:{displayS}</span>
              }
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
        {left === 0 && !running ? (
          <button onClick={start} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: 12, padding: '12px 40px', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
            <Play size={18} style={{ display: 'inline', marginRight: 8 }} />Start
          </button>
        ) : (
          <>
            <button onClick={reset} style={{ background: 'rgba(99,102,241,0.15)', border: 'none', borderRadius: 12, padding: '12px 20px', color: '#a5b4fc', cursor: 'pointer' }}>
              <RotateCcw size={20} />
            </button>
            <button onClick={() => setRunning(!running)} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: 12, padding: '12px 32px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
              {running ? <><Pause size={18} style={{ display: 'inline', marginRight: 6 }} />Pause</> : <><Play size={18} style={{ display: 'inline', marginRight: 6 }} />Resume</>}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
