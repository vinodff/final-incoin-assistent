import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', background: '#050507', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ maxWidth: '600px', background: '#0d0d15', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '16px', padding: '2rem' }}>
            <h2 style={{ color: '#f87171', marginBottom: '1rem', fontSize: '1.25rem', fontFamily: 'Inter, sans-serif' }}>Something went wrong</h2>
            <pre style={{ color: '#94a3b8', fontSize: '0.8rem', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              {this.state.error.message}
              {'\n'}
              {this.state.error.stack}
            </pre>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#0d0d15',
          color: '#e2e8f0',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '12px',
        },
        success: {
          iconTheme: { primary: '#6366f1', secondary: '#fff' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#fff' },
        },
      }}
    />
  </React.StrictMode>,
)
