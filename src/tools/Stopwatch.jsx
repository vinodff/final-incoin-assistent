import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Flag } from 'lucide-react'

export default function Stopwatch() {
  const [ms, setMs] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState([])
  const ref = useRef(null)

  useEffect(() => {
    if (running) ref.current = setInterval(() => setMs(m => m + 10), 10)
    else clearInterval(ref.current)
    return () => clearInterval(ref.current)
  }, [running])

  const fmt = (n) => {
    const m = String(Math.floor(n / 60000)).padStart(2, '0')
    const s = String(Math.floor((n % 60000) / 1000)).padStart(2, '0')
    const c = String(Math.floor((n % 1000) / 10)).padStart(2, '0')
    return `${m}:${s}.${c}`
  }

  return (
    <div style={{ textAlign: 'center', maxWidth: 420, margin: '0 auto' }}>
      {/* Display */}
      <div style={{ padding: '48px 24px', borderRadius: 24, background: '#111120', border: '1px solid rgba(99,102,241,0.2)', marginBottom: 24 }}>
        <div style={{ fontSize: 56, fontWeight: 700, color: '#e2e8f0', letterSpacing: '-2px', fontVariantNumeric: 'tabular-nums' }}>
          {fmt(ms)}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
        <button onClick={() => { setRunning(false); setMs(0); setLaps([]) }}
          style={{ background: 'rgba(99,102,241,0.15)', border: 'none', borderRadius: 12, padding: '12px 20px', color: '#a5b4fc', cursor: 'pointer' }}>
          <RotateCcw size={20} />
        </button>
        <button onClick={() => setRunning(!running)}
          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: 12, padding: '12px 40px', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
          {running ? <><Pause size={18} style={{ display: 'inline', marginRight: 8 }} />Pause</> : <><Play size={18} style={{ display: 'inline', marginRight: 8 }} />Start</>}
        </button>
        <button onClick={() => running && setLaps([...laps, ms])}
          style={{ background: 'rgba(99,102,241,0.15)', border: 'none', borderRadius: 12, padding: '12px 20px', color: running ? '#a5b4fc' : '#334155', cursor: running ? 'pointer' : 'default' }}>
          <Flag size={20} />
        </button>
      </div>

      {/* Laps */}
      {laps.length > 0 && (
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(99,102,241,0.15)' }}>
          {[...laps].reverse().map((lap, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', background: i % 2 ? '#0d0d15' : '#111120', borderBottom: '1px solid rgba(99,102,241,0.08)' }}>
              <span style={{ color: '#64748b', fontSize: 13 }}>Lap {laps.length - i}</span>
              <span style={{ color: '#e2e8f0', fontVariantNumeric: 'tabular-nums', fontSize: 14 }}>{fmt(lap)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
