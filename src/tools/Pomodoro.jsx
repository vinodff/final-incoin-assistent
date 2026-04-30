import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react'

const MODES = { work: { label: 'Focus', mins: 25, color: '#6366f1' }, short: { label: 'Short Break', mins: 5, color: '#10b981' }, long: { label: 'Long Break', mins: 15, color: '#f59e0b' } }
const S = { muted: '#64748b' }

export default function Pomodoro() {
  const [mode, setMode] = useState('work')
  const [seconds, setSeconds] = useState(MODES.work.mins * 60)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            clearInterval(ref.current)
            setRunning(false)
            if (mode === 'work') setSessions(n => n + 1)
            try { new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play() } catch {}
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else clearInterval(ref.current)
    return () => clearInterval(ref.current)
  }, [running, mode])

  function switchMode(m) {
    setMode(m); setRunning(false); clearInterval(ref.current)
    setSeconds(MODES[m].mins * 60)
  }

  function reset() { setRunning(false); clearInterval(ref.current); setSeconds(MODES[mode].mins * 60) }

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')
  const progress = 1 - seconds / (MODES[mode].mins * 60)
  const c = MODES[mode].color
  const r = 90, circ = 2 * Math.PI * r

  return (
    <div style={{ textAlign: 'center', maxWidth: 400, margin: '0 auto' }}>
      {/* Mode tabs */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
        {Object.entries(MODES).map(([key, val]) => (
          <button key={key} onClick={() => switchMode(key)}
            style={{ padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
              background: mode === key ? c : 'rgba(99,102,241,0.1)', color: mode === key ? '#fff' : S.muted }}>
            {val.label}
          </button>
        ))}
      </div>

      {/* Ring */}
      <div style={{ position: 'relative', width: 220, height: 220, margin: '0 auto 32px' }}>
        <svg width="220" height="220" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="110" cy="110" r={r} fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="8" />
          <circle cx="110" cy="110" r={r} fill="none" stroke={c} strokeWidth="8"
            strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 48, fontWeight: 700, color: '#e2e8f0', letterSpacing: '-2px' }}>{mins}:{secs}</span>
          <span style={{ fontSize: 13, color: S.muted }}>{MODES[mode].label}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
        <button onClick={reset} style={{ background: 'rgba(99,102,241,0.15)', border: 'none', borderRadius: 12, padding: '12px 20px', color: '#a5b4fc', cursor: 'pointer' }}>
          <RotateCcw size={20} />
        </button>
        <button onClick={() => setRunning(!running)}
          style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)`, border: 'none', borderRadius: 12, padding: '12px 40px', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: `0 0 20px ${c}66` }}>
          {running ? <><Pause size={18} style={{ display: 'inline', marginRight: 8 }} />Pause</> : <><Play size={18} style={{ display: 'inline', marginRight: 8 }} />Start</>}
        </button>
      </div>

      {/* Sessions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Brain size={16} style={{ color: c }} />
        <span style={{ color: S.muted, fontSize: 14 }}>Sessions completed: <strong style={{ color: '#e2e8f0' }}>{sessions}</strong></span>
      </div>
      {sessions > 0 && sessions % 4 === 0 && (
        <p style={{ marginTop: 8, color: '#f59e0b', fontSize: 13 }}><Coffee size={14} style={{ display: 'inline', marginRight: 4 }} />Take a long break!</p>
      )}
    </div>
  )
}
