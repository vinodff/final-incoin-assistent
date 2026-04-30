import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TOOLS } from '../lib/tools';
import { ToolRegistry } from '../lib/toolComponents';
import Navbar from '../components/Navbar';

export default function ToolRunner() {
  const { id } = useParams();
  const toolInfo = TOOLS.find(t => t.id === id);
  const ToolComponent = ToolRegistry[id];

  if (!toolInfo || !ToolComponent) {
    return <Navigate to="/dashboard" replace />;
  }

  const Icon = toolInfo.icon;

  return (
    <div style={{ background: '#050507', minHeight: '100vh' }} className="flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Link to="/dashboard" className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${toolInfo.color}22`, border: `1px solid ${toolInfo.color}44` }}
            >
              <Icon size={24} style={{ color: toolInfo.color }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{toolInfo.name}</h1>
              <p className="text-slate-400 text-sm">{toolInfo.desc}</p>
            </div>
          </div>
        </div>

        {/* Tool container */}
        <div className="glass rounded-3xl p-8 border border-slate-800" style={{ minHeight: '600px' }}>
          <ToolComponent />
        </div>
      </main>
    </div>
  );
}
