import { useState } from 'react'

const S = { input: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', muted: '#64748b' }

function toHtml(md) {
  return md
    .replace(/^### (.+)$/gm, '<h3 style="color:#a5b4fc;margin:12px 0 6px">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="color:#a5b4fc;margin:16px 0 8px">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="color:#e2e8f0;margin:20px 0 10px">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e2e8f0">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:rgba(99,102,241,0.2);padding:2px 6px;border-radius:4px;font-size:13px">$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#6366f1" target="_blank">$1</a>')
    .replace(/^- (.+)$/gm, '<li style="margin-left:20px">$1</li>')
    .replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid #6366f1;padding-left:12px;color:#94a3b8;margin:8px 0">$1</blockquote>')
    .replace(/\n/g, '<br/>')
}

export default function MarkdownEditor() {
  const [md, setMd] = useState('# Hello World\n\nThis is a **markdown** editor with *live preview*.\n\n## Features\n- Bold text with **double asterisks**\n- Italic with *single asterisks*\n- `Inline code` with backticks\n- [Links](https://example.com)\n\n> Blockquotes work too!\n\n### Try editing this text')

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, minHeight: 400 }}>
      <div>
        <div style={{ fontSize: 12, color: S.muted, marginBottom: 8, fontWeight: 600 }}>MARKDOWN</div>
        <textarea value={md} onChange={e => setMd(e.target.value)}
          style={{ width: '100%', height: 380, background: S.input, border: `1px solid ${S.border}`, borderRadius: 14, padding: 16, color: '#e2e8f0', fontSize: 14, lineHeight: 1.7, outline: 'none', resize: 'none', fontFamily: 'monospace' }} />
      </div>
      <div>
        <div style={{ fontSize: 12, color: S.muted, marginBottom: 8, fontWeight: 600 }}>PREVIEW</div>
        <div style={{ height: 380, background: '#111120', border: `1px solid ${S.border}`, borderRadius: 14, padding: 16, overflowY: 'auto', color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: toHtml(md) }} />
      </div>
    </div>
  )
}
