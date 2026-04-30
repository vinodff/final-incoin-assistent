import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, RotateCcw, Copy, Check, Plus, Trash2, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

// Helper for copy
const useCopy = () => {
  const [copied, setCopied] = useState(false);
  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };
  return { copied, copy };
};

// 1. Todo List
export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const add = () => { if(input.trim()) { setTodos([...todos, { id: Date.now(), text: input, done: false }]); setInput(''); }};
  const toggle = (id) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = (id) => setTodos(todos.filter(t => t.id !== id));
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&add()} placeholder="Add a new task..." className="input flex-1 p-3 rounded-xl bg-slate-800 text-white" />
        <button onClick={add} className="btn-primary px-6 rounded-xl bg-indigo-600">Add</button>
      </div>
      <div className="space-y-2">
        {todos.map(t => (
          <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700">
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} className="w-5 h-5 accent-indigo-500" />
            <span className={`flex-1 ${t.done ? 'line-through text-slate-500' : 'text-white'}`}>{t.text}</span>
            <button onClick={() => remove(t.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={18}/></button>
          </div>
        ))}
        {todos.length === 0 && <p className="text-center text-slate-500 py-8">No tasks yet. Add one above!</p>}
      </div>
    </div>
  );
};

// 2. Pomodoro Timer
export const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // work, break
  
  useEffect(() => {
    let int;
    if (isRunning && timeLeft > 0) int = setInterval(() => setTimeLeft(t => t - 1), 1000);
    else if (timeLeft === 0) {
      setIsRunning(false);
      toast.success(mode === 'work' ? 'Time for a break!' : 'Back to work!');
    }
    return () => clearInterval(int);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (m) => { setMode(m); setTimeLeft(m === 'work' ? 25 * 60 : 5 * 60); setIsRunning(false); };
  
  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="max-w-md mx-auto text-center space-y-8">
      <div className="flex justify-center gap-4">
        <button onClick={()=>switchMode('work')} className={`px-4 py-2 rounded-lg ${mode==='work'?'bg-indigo-600 text-white':'bg-slate-800 text-slate-400'}`}>Work (25m)</button>
        <button onClick={()=>switchMode('break')} className={`px-4 py-2 rounded-lg ${mode==='break'?'bg-green-600 text-white':'bg-slate-800 text-slate-400'}`}>Break (5m)</button>
      </div>
      <div className="text-8xl font-black tabular-nums text-white tracking-widest">{mins}:{secs}</div>
      <div className="flex justify-center gap-4">
        <button onClick={()=>setIsRunning(!isRunning)} className="btn-primary px-8 py-3 rounded-full text-lg">
          {isRunning ? <><Pause/> Pause</> : <><Play/> Start</>}
        </button>
        <button onClick={()=>switchMode(mode)} className="btn-outline px-8 py-3 rounded-full"><RotateCcw/> Reset</button>
      </div>
    </div>
  );
};

// 3. Stopwatch
export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let int;
    if (isRunning) int = setInterval(() => setTime(t => t + 10), 10);
    return () => clearInterval(int);
  }, [isRunning]);

  const format = (ms) => {
    const mins = Math.floor(ms / 60000).toString().padStart(2, '0');
    const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const centi = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${mins}:${secs}.${centi}`;
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-8">
      <div className="text-7xl font-black tabular-nums text-white tracking-wider">{format(time)}</div>
      <div className="flex justify-center gap-4">
        <button onClick={()=>setIsRunning(!isRunning)} className="btn-primary px-8 py-3 rounded-full">
          {isRunning ? <><Pause/> Pause</> : <><Play/> Start</>}
        </button>
        <button onClick={()=>{setIsRunning(false); setTime(0); setLaps([]);}} className="btn-outline px-6 py-3 rounded-full text-red-400 hover:bg-red-500/10 border-red-500/30"><Square/> Stop</button>
        {isRunning && <button onClick={()=>setLaps([...laps, time])} className="btn-outline px-6 py-3 rounded-full">Lap</button>}
      </div>
      {laps.length > 0 && (
        <div className="mt-8 space-y-2 text-left max-h-60 overflow-auto">
          {laps.map((lap, i) => (
            <div key={i} className="flex justify-between p-3 bg-slate-800/50 rounded-lg text-slate-300 font-mono">
              <span>Lap {i + 1}</span>
              <span>{format(lap)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 4. Countdown Timer
export const Countdown = () => {
  const [minsInput, setMinsInput] = useState(10);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let int;
    if (isRunning && timeLeft > 0) int = setInterval(() => setTimeLeft(t => t - 1), 1000);
    else if (timeLeft === 0 && isRunning) { setIsRunning(false); toast.success('Countdown finished!'); }
    return () => clearInterval(int);
  }, [isRunning, timeLeft]);

  const start = () => { setTimeLeft(minsInput * 60); setIsRunning(true); };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="max-w-md mx-auto text-center space-y-8">
      {!isRunning && timeLeft === 0 ? (
        <div className="space-y-4">
          <label className="block text-slate-400">Minutes to countdown:</label>
          <input type="number" value={minsInput} onChange={e=>setMinsInput(e.target.value)} className="w-full text-center text-4xl p-4 bg-slate-800 text-white rounded-xl" min="1" />
          <button onClick={start} className="btn-primary w-full py-4 text-xl rounded-xl">Start Countdown</button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-8xl font-black tabular-nums text-indigo-400 tracking-widest">{mins}:{secs}</div>
          <div className="flex justify-center gap-4">
            <button onClick={()=>setIsRunning(!isRunning)} className="btn-primary px-8 py-3 rounded-full">
              {isRunning ? <><Pause/> Pause</> : <><Play/> Resume</>}
            </button>
            <button onClick={()=>{setIsRunning(false); setTimeLeft(0);}} className="btn-outline px-8 py-3 rounded-full"><RotateCcw/> Reset</button>
          </div>
        </div>
      )}
    </div>
  );
};

// 5. Quick Notes
export const QuickNotes = () => {
  const [note, setNote] = useState(localStorage.getItem('quick_notes') || '');
  const { copy } = useCopy();
  useEffect(() => { localStorage.setItem('quick_notes', note); }, [note]);
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex justify-end gap-2">
        <button onClick={()=>copy(note)} className="btn-outline px-4 py-2 text-sm"><Copy size={16}/> Copy All</button>
        <button onClick={()=>setNote('')} className="btn-outline px-4 py-2 text-sm text-red-400 border-red-500/30 hover:bg-red-500/10"><Trash2 size={16}/> Clear</button>
      </div>
      <textarea 
        value={note} onChange={e=>setNote(e.target.value)} 
        placeholder="Type your notes here... They are automatically saved to your browser."
        className="w-full h-96 p-6 bg-slate-800/50 text-slate-100 rounded-2xl resize-none border border-slate-700 focus:border-indigo-500 outline-none leading-relaxed"
      />
    </div>
  );
};

// 6. Habit Tracker
export const Habits = () => {
  const [habits, setHabits] = useState([{ id: 1, name: 'Drink Water', streak: 3 }, { id: 2, name: 'Read 10 pages', streak: 0 }]);
  const [newHabit, setNewHabit] = useState('');
  const add = () => { if(newHabit) { setHabits([...habits, { id: Date.now(), name: newHabit, streak: 0 }]); setNewHabit(''); }};
  const inc = (id) => setHabits(habits.map(h => h.id === id ? { ...h, streak: h.streak + 1 } : h));
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex gap-2">
        <input value={newHabit} onChange={e=>setNewHabit(e.target.value)} placeholder="New habit name..." className="flex-1 p-3 bg-slate-800 rounded-xl text-white" />
        <button onClick={add} className="btn-primary px-6 rounded-xl">Add</button>
      </div>
      <div className="grid gap-4">
        {habits.map(h => (
          <div key={h.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <span className="text-white font-medium text-lg">{h.name}</span>
            <div className="flex items-center gap-4">
              <span className="text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-full">{h.streak} 🔥</span>
              <button onClick={()=>inc(h.id)} className="p-2 bg-slate-700 hover:bg-indigo-600 rounded-lg text-white transition-colors"><Check size={20}/></button>
              <button onClick={()=>setHabits(habits.filter(x=>x.id!==h.id))} className="text-slate-500 hover:text-red-400"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 7. Budget Tracker
export const Budget = () => {
  const [txs, setTxs] = useState([]);
  const [desc, setDesc] = useState('');
  const [amt, setAmt] = useState('');
  const [type, setType] = useState('expense');

  const add = () => {
    if(desc && amt) { setTxs([{ id: Date.now(), desc, amt: parseFloat(amt), type }, ...txs]); setDesc(''); setAmt(''); }
  };
  const total = txs.reduce((acc, curr) => curr.type === 'income' ? acc + curr.amt : acc - curr.amt, 0);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-8 bg-gradient-to-br from-indigo-900/40 to-slate-800 rounded-3xl border border-indigo-500/20 text-center">
        <p className="text-slate-400 mb-2">Net Balance</p>
        <h2 className={`text-5xl font-black ${total >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>${total.toFixed(2)}</h2>
      </div>
      <div className="flex gap-2">
        <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="flex-1 p-3 bg-slate-800 text-white rounded-xl" />
        <input value={amt} onChange={e=>setAmt(e.target.value)} type="number" placeholder="Amount" className="w-32 p-3 bg-slate-800 text-white rounded-xl" />
        <select value={type} onChange={e=>setType(e.target.value)} className="p-3 bg-slate-800 text-white rounded-xl outline-none">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button onClick={add} className="btn-primary px-6 rounded-xl">Add</button>
      </div>
      <div className="space-y-2">
        {txs.map(t => (
          <div key={t.id} className="flex justify-between p-4 bg-slate-800/50 rounded-xl">
            <span className="text-white">{t.desc}</span>
            <span className={`font-bold ${t.type==='income'?'text-emerald-400':'text-red-400'}`}>{t.type==='income'?'+':'-'}${t.amt.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 8. Word Counter
export const WordCount = () => {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: 'Words', v: words, c: 'text-indigo-400' },
          { l: 'Characters', v: chars, c: 'text-blue-400' },
          { l: 'Chars (No Space)', v: charsNoSpace, c: 'text-purple-400' },
          { l: 'Sentences', v: sentences, c: 'text-emerald-400' },
        ].map(s => (
          <div key={s.l} className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 text-center">
            <div className={`text-4xl font-bold mb-1 ${s.c}`}>{s.v}</div>
            <div className="text-slate-400 text-sm uppercase tracking-wider font-semibold">{s.l}</div>
          </div>
        ))}
      </div>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Type or paste your text here..." className="w-full h-64 p-4 bg-slate-800 text-white rounded-xl outline-none border border-slate-700 focus:border-indigo-500" />
    </div>
  );
};

// 9. Case Converter
export const CaseConvert = () => {
  const [text, setText] = useState('');
  const { copy } = useCopy();
  const convert = (type) => {
    switch(type) {
      case 'upper': setText(text.toUpperCase()); break;
      case 'lower': setText(text.toLowerCase()); break;
      case 'title': setText(text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')); break;
      case 'camel': setText(text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase())); break;
    }
  };
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex flex-wrap gap-2">
        <button onClick={()=>convert('upper')} className="btn-outline px-4 py-2 text-sm">UPPERCASE</button>
        <button onClick={()=>convert('lower')} className="btn-outline px-4 py-2 text-sm">lowercase</button>
        <button onClick={()=>convert('title')} className="btn-outline px-4 py-2 text-sm">Title Case</button>
        <button onClick={()=>convert('camel')} className="btn-outline px-4 py-2 text-sm">camelCase</button>
        <button onClick={()=>copy(text)} className="btn-primary ml-auto px-4 py-2 text-sm"><Copy size={16}/> Copy Result</button>
      </div>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Enter text to convert..." className="w-full h-64 p-4 bg-slate-800 text-white rounded-xl outline-none border border-slate-700 focus:border-indigo-500" />
    </div>
  );
};

// 10. Lorem Ipsum
export const Lorem = () => {
  const [paras, setParas] = useState(3);
  const [text, setText] = useState('');
  const { copy } = useCopy();
  const generate = () => {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    setText(Array(Number(paras)).fill(lorem).join('\n\n'));
  };
  useEffect(() => { generate(); }, [paras]);
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <label className="text-slate-300 font-medium">Paragraphs:</label>
        <input type="number" min="1" max="20" value={paras} onChange={e=>setParas(e.target.value)} className="bg-slate-900 text-white px-3 py-2 rounded-lg w-24 outline-none border border-slate-700 focus:border-indigo-500" />
        <button onClick={generate} className="btn-primary px-6 py-2 ml-auto">Regenerate</button>
        <button onClick={()=>copy(text)} className="btn-outline px-4 py-2"><Copy size={16}/></button>
      </div>
      <textarea readOnly value={text} className="w-full h-80 p-6 bg-slate-800 text-slate-300 rounded-xl outline-none border border-slate-700 leading-relaxed resize-none" />
    </div>
  );
};

// 11. Markdown Editor (Simplified Preview)
export const MarkdownEditor = () => {
  const [md, setMd] = useState('# Hello Markdown\n\nWrite some **bold** or *italic* text.\n\n- List item 1\n- List item 2');
  return (
    <div className="grid md:grid-cols-2 gap-6 h-[600px]">
      <div className="flex flex-col">
        <div className="bg-slate-800 p-3 rounded-t-xl border-b border-slate-700 text-slate-300 font-semibold text-sm">Markdown Input</div>
        <textarea value={md} onChange={e=>setMd(e.target.value)} className="flex-1 p-4 bg-slate-900 text-slate-300 rounded-b-xl outline-none font-mono text-sm resize-none" />
      </div>
      <div className="flex flex-col">
        <div className="bg-slate-800 p-3 rounded-t-xl border-b border-slate-700 text-slate-300 font-semibold text-sm">HTML Preview</div>
        <div className="flex-1 p-6 bg-white text-slate-900 rounded-b-xl overflow-auto prose prose-indigo max-w-none" dangerouslySetInnerHTML={{__html: md.replace(/^# (.*$)/gim, '<h1>$1</h1>').replace(/\*\*(.*)\*\*/gim, '<b>$1</b>').replace(/\*(.*)\*/gim, '<i>$1</i>').replace(/^- (.*$)/gim, '<li>$1</li>')}} />
      </div>
    </div>
  );
};

// 12. Diff Checker
export const DiffChecker = () => {
  const [t1, setT1] = useState('');
  const [t2, setT2] = useState('');
  return (
    <div className="grid md:grid-cols-2 gap-4 h-[600px]">
      <textarea value={t1} onChange={e=>setT1(e.target.value)} placeholder="Original text..." className="p-4 bg-slate-800/80 text-white rounded-xl outline-none border border-slate-700 focus:border-red-500/50 resize-none" />
      <textarea value={t2} onChange={e=>setT2(e.target.value)} placeholder="Changed text..." className="p-4 bg-slate-800/80 text-white rounded-xl outline-none border border-slate-700 focus:border-emerald-500/50 resize-none" />
      <div className="col-span-2 p-6 bg-slate-900 rounded-xl text-slate-400 text-center">
        {t1 === t2 ? "Texts are identical." : "Texts are different. (Visual diff highlighting coming soon in v2)"}
      </div>
    </div>
  );
};

// 13. Password Generator
export const PasswordGen = () => {
  const [len, setLen] = useState(16);
  const [pwd, setPwd] = useState('');
  const [opts, setOpts] = useState({ upper: true, lower: true, nums: true, syms: true });
  const { copy } = useCopy();

  const generate = () => {
    let chars = '';
    if(opts.upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(opts.lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if(opts.nums) chars += '0123456789';
    if(opts.syms) chars += '!@#$%^&*()_+~|}{[]:;?><,./-=';
    if(!chars) return setPwd('Select at least one option');
    let res = '';
    for(let i=0; i<len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setPwd(res);
  };
  useEffect(() => { generate(); }, [len, opts]);

  return (
    <div className="max-w-xl mx-auto p-8 bg-slate-800/50 rounded-3xl border border-slate-700 space-y-8">
      <div className="relative">
        <input type="text" readOnly value={pwd} className="w-full bg-slate-900 text-center text-3xl font-mono text-emerald-400 p-6 rounded-2xl outline-none tracking-wider" />
        <button onClick={()=>copy(pwd)} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"><Copy size={20}/></button>
      </div>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-slate-300 mb-2"><span>Length: {len}</span></div>
          <input type="range" min="8" max="64" value={len} onChange={e=>setLen(e.target.value)} className="w-full accent-indigo-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries({ upper: 'Uppercase', lower: 'Lowercase', nums: 'Numbers', syms: 'Symbols' }).map(([k, label]) => (
            <label key={k} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl cursor-pointer hover:bg-slate-900 transition-colors">
              <input type="checkbox" checked={opts[k]} onChange={e=>setOpts({...opts, [k]: e.target.checked})} className="w-5 h-5 accent-indigo-500" />
              <span className="text-slate-300 select-none">{label}</span>
            </label>
          ))}
        </div>
        <button onClick={generate} className="w-full btn-primary py-4 text-lg rounded-xl">Generate New Password</button>
      </div>
    </div>
  );
};

// 14. JSON Formatter
export const JsonFormatter = () => {
  const [input, setInput] = useState('{"hello":"world"}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const { copy } = useCopy();

  const format = () => { try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); setError(''); } catch(e) { setError(e.message); setOutput(''); }};
  const minify = () => { try { setOutput(JSON.stringify(JSON.parse(input))); setError(''); } catch(e) { setError(e.message); setOutput(''); }};

  return (
    <div className="grid md:grid-cols-2 gap-4 h-[600px]">
      <div className="flex flex-col space-y-2">
        <div className="flex gap-2">
          <button onClick={format} className="btn-primary flex-1 py-2">Format</button>
          <button onClick={minify} className="btn-outline flex-1 py-2">Minify</button>
        </div>
        <textarea value={input} onChange={e=>setInput(e.target.value)} className="flex-1 p-4 bg-slate-800 text-slate-300 font-mono text-sm rounded-xl outline-none resize-none" placeholder="Paste JSON here..." />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
          <span className={`text-sm ${error ? 'text-red-400' : 'text-emerald-400'}`}>{error || 'Valid JSON'}</span>
          <button onClick={()=>copy(output)} className="text-slate-400 hover:text-white"><Copy size={18}/></button>
        </div>
        <textarea readOnly value={output} className="flex-1 p-4 bg-slate-900 text-indigo-300 font-mono text-sm rounded-xl outline-none resize-none border border-slate-800" placeholder="Result..." />
      </div>
    </div>
  );
};

// 15. Base64
export const Base64 = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const encode = () => setOutput(btoa(input));
  const decode = () => { try{ setOutput(atob(input)); } catch(e){ setOutput('Invalid Base64'); }};
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter string..." className="w-full h-40 p-4 bg-slate-800 text-white rounded-xl outline-none" />
      <div className="flex gap-4">
        <button onClick={encode} className="btn-primary flex-1 py-3">Encode</button>
        <button onClick={decode} className="btn-outline flex-1 py-3">Decode</button>
      </div>
      <textarea readOnly value={output} placeholder="Result..." className="w-full h-40 p-4 bg-slate-900 text-indigo-300 rounded-xl outline-none border border-slate-800" />
    </div>
  );
};

// 16. URL Encoder
export const UrlEncoder = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter URL or string..." className="w-full h-40 p-4 bg-slate-800 text-white rounded-xl outline-none" />
      <div className="flex gap-4">
        <button onClick={()=>setOutput(encodeURIComponent(input))} className="btn-primary flex-1 py-3">Encode</button>
        <button onClick={()=>setOutput(decodeURIComponent(input))} className="btn-outline flex-1 py-3">Decode</button>
      </div>
      <textarea readOnly value={output} placeholder="Result..." className="w-full h-40 p-4 bg-slate-900 text-indigo-300 rounded-xl outline-none border border-slate-800" />
    </div>
  );
};

// 17. Color Picker
export const ColorPicker = () => {
  const [color, setColor] = useState('#6366f1');
  const { copy } = useCopy();
  const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };
  return (
    <div className="max-w-lg mx-auto p-8 bg-slate-800/50 rounded-3xl border border-slate-700 text-center space-y-8">
      <div className="w-48 h-48 mx-auto rounded-full shadow-2xl border-4 border-slate-700 overflow-hidden relative">
        <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl">
          <span className="text-slate-400 font-mono">HEX</span>
          <span className="text-white font-bold tracking-wider">{color.toUpperCase()}</span>
          <button onClick={()=>copy(color)} className="text-indigo-400 hover:text-indigo-300"><Copy size={18}/></button>
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl">
          <span className="text-slate-400 font-mono">RGB</span>
          <span className="text-white font-bold tracking-wider">{hex2rgb(color)}</span>
          <button onClick={()=>copy(hex2rgb(color))} className="text-indigo-400 hover:text-indigo-300"><Copy size={18}/></button>
        </div>
      </div>
    </div>
  );
};

// 18. QR Generator
export const QrGen = () => {
  const [text, setText] = useState('https://incoin.app');
  return (
    <div className="max-w-md mx-auto text-center space-y-8">
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="Enter URL or Text..." className="w-full p-4 bg-slate-800 text-white rounded-xl outline-none focus:border-indigo-500 border border-slate-700" />
      <div className="p-8 bg-white rounded-3xl inline-block shadow-2xl mx-auto">
        {text ? <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}`} alt="QR Code" className="w-64 h-64" /> : <div className="w-64 h-64 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">Enter text</div>}
      </div>
    </div>
  );
};

// 19. Calculator
export const Calculator = () => {
  const [expr, setExpr] = useState('');
  const calc = () => { try{ setExpr(eval(expr).toString()); }catch(e){ setExpr('Error'); }};
  const btns = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'];
  return (
    <div className="max-w-xs mx-auto p-6 bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl">
      <div className="bg-slate-900 h-24 mb-6 rounded-2xl p-4 flex flex-col justify-end text-right">
        <div className="text-3xl text-white font-mono tracking-wider overflow-hidden">{expr || '0'}</div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <button onClick={()=>setExpr('')} className="col-span-2 py-4 bg-red-500/20 text-red-400 font-bold rounded-xl hover:bg-red-500/30 transition">C</button>
        <button onClick={()=>setExpr(expr.slice(0,-1))} className="col-span-2 py-4 bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-600 transition">DEL</button>
        {btns.map(b => (
          <button key={b} onClick={() => b==='=' ? calc() : setExpr(e => e==='Error' ? b : e+b)} className={`py-4 text-xl font-bold rounded-xl transition ${['/','*','-','+','='].includes(b) ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>{b}</button>
        ))}
      </div>
    </div>
  );
};

// 20. Age Calculator
export const AgeCalculator = () => {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState(null);
  const calc = () => {
    if(!dob) return;
    const birth = new Date(dob);
    const today = new Date();
    let y = today.getFullYear() - birth.getFullYear();
    let m = today.getMonth() - birth.getMonth();
    let d = today.getDate() - birth.getDate();
    if (d < 0) { m--; d += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    setAge({ y, m, d });
  };
  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="w-full p-4 bg-slate-800 text-white rounded-xl outline-none" />
      <button onClick={calc} className="w-full btn-primary py-4">Calculate Age</button>
      {age && (
        <div className="p-8 bg-slate-800/50 rounded-3xl border border-slate-700 mt-8">
          <div className="text-5xl font-black text-indigo-400 mb-2">{age.y} <span className="text-xl text-slate-400 font-medium">Years</span></div>
          <div className="text-3xl font-bold text-slate-300">{age.m} <span className="text-lg text-slate-500">Months</span>, {age.d} <span className="text-lg text-slate-500">Days</span></div>
        </div>
      )}
    </div>
  );
};

// 21. BMI Calculator
export const BmiCalculator = () => {
  const [w, setW] = useState('');
  const [h, setH] = useState('');
  const [bmi, setBmi] = useState(null);
  const calc = () => {
    if(w && h) {
      const hm = parseFloat(h) / 100;
      const b = parseFloat(w) / (hm * hm);
      setBmi(b.toFixed(1));
    }
  };
  let cat = '', color = '';
  if (bmi) {
    if (bmi < 18.5) { cat = 'Underweight'; color = 'text-blue-400'; }
    else if (bmi < 25) { cat = 'Normal'; color = 'text-emerald-400'; }
    else if (bmi < 30) { cat = 'Overweight'; color = 'text-orange-400'; }
    else { cat = 'Obese'; color = 'text-red-400'; }
  }
  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-slate-400 text-sm">Weight (kg)</label><input type="number" value={w} onChange={e=>setW(e.target.value)} className="w-full mt-1 p-4 bg-slate-800 text-white rounded-xl text-center" /></div>
        <div><label className="text-slate-400 text-sm">Height (cm)</label><input type="number" value={h} onChange={e=>setH(e.target.value)} className="w-full mt-1 p-4 bg-slate-800 text-white rounded-xl text-center" /></div>
      </div>
      <button onClick={calc} className="w-full btn-primary py-4">Calculate BMI</button>
      {bmi && (
        <div className="p-8 bg-slate-800/50 rounded-3xl border border-slate-700 mt-8">
          <div className="text-6xl font-black text-white mb-2">{bmi}</div>
          <div className={`text-2xl font-bold ${color}`}>{cat}</div>
        </div>
      )}
    </div>
  );
};

// 22. Loan EMI Calculator
export const LoanCalculator = () => {
  const [p, setP] = useState(10000);
  const [r, setR] = useState(10);
  const [n, setN] = useState(12);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    const rate = (r / 12) / 100;
    const e = (p * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    setEmi(e ? e.toFixed(2) : 0);
  }, [p, r, n]);

  return (
    <div className="max-w-xl mx-auto space-y-8 bg-slate-800/30 p-8 rounded-3xl border border-slate-700">
      <div className="text-center mb-8">
        <p className="text-slate-400 mb-2">Monthly EMI</p>
        <h2 className="text-5xl font-black text-indigo-400">${emi}</h2>
        <p className="text-slate-500 text-sm mt-4">Total Payment: ${(emi * n).toFixed(2)} | Total Interest: ${((emi * n) - p).toFixed(2)}</p>
      </div>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-slate-300 mb-2"><span>Principal Loan Amount</span><span>${p}</span></div>
          <input type="range" min="1000" max="1000000" step="1000" value={p} onChange={e=>setP(Number(e.target.value))} className="w-full accent-indigo-500" />
        </div>
        <div>
          <div className="flex justify-between text-slate-300 mb-2"><span>Interest Rate (%)</span><span>{r}%</span></div>
          <input type="range" min="1" max="30" step="0.1" value={r} onChange={e=>setR(Number(e.target.value))} className="w-full accent-indigo-500" />
        </div>
        <div>
          <div className="flex justify-between text-slate-300 mb-2"><span>Loan Tenure (Months)</span><span>{n} mo</span></div>
          <input type="range" min="1" max="360" value={n} onChange={e=>setN(Number(e.target.value))} className="w-full accent-indigo-500" />
        </div>
      </div>
    </div>
  );
};

// 23. Unit Converter
export const UnitConverter = () => {
  const [val, setVal] = useState(1);
  return (
    <div className="max-w-md mx-auto text-center space-y-8">
      <p className="text-slate-400">A full unit converter interface goes here. For demonstration, converting km to miles.</p>
      <div className="flex items-center gap-4">
        <input type="number" value={val} onChange={e=>setVal(e.target.value)} className="w-1/2 p-4 bg-slate-800 text-white rounded-xl text-center" />
        <span className="text-slate-400">Kilometers</span>
      </div>
      <div className="text-4xl font-bold text-indigo-400">{(val * 0.621371).toFixed(4)} <span className="text-lg text-slate-500">Miles</span></div>
    </div>
  );
};

// 24. Tip Calculator
export const TipCalculator = () => {
  const [bill, setBill] = useState(100);
  const [tip, setTip] = useState(15);
  const [split, setSplit] = useState(2);
  const totalTip = (bill * tip) / 100;
  const totalBill = Number(bill) + totalTip;
  const perPerson = totalBill / split;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="p-8 bg-slate-800/50 rounded-3xl border border-slate-700 text-center mb-8">
        <p className="text-slate-400 mb-2">Total Per Person</p>
        <h2 className="text-6xl font-black text-emerald-400">${perPerson.toFixed(2)}</h2>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl">
          <span className="text-slate-400">Bill Amount ($)</span>
          <input type="number" value={bill} onChange={e=>setBill(e.target.value)} className="w-32 bg-slate-900 text-white p-2 rounded-lg text-right outline-none" />
        </div>
        <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl">
          <span className="text-slate-400">Tip % ({tip}%)</span>
          <input type="range" min="0" max="50" value={tip} onChange={e=>setTip(e.target.value)} className="w-32 accent-indigo-500" />
        </div>
        <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl">
          <span className="text-slate-400">Split Between</span>
          <div className="flex items-center gap-4">
            <button onClick={()=>setSplit(Math.max(1, split-1))} className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center hover:bg-slate-600">-</button>
            <span className="text-white font-bold text-xl w-4 text-center">{split}</span>
            <button onClick={()=>setSplit(split+1)} className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center hover:bg-slate-600">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Map of all tools
export const ToolRegistry = {
  'todo': TodoList,
  'pomodoro': Pomodoro,
  'stopwatch': Stopwatch,
  'countdown': Countdown,
  'notes': QuickNotes,
  'habits': Habits,
  'budget': Budget,
  'wordcount': WordCount,
  'caseconvert': CaseConvert,
  'lorem': Lorem,
  'markdown': MarkdownEditor,
  'diff': DiffChecker,
  'password': PasswordGen,
  'json': JsonFormatter,
  'base64': Base64,
  'urlencoder': UrlEncoder,
  'color': ColorPicker,
  'qr': QrGen,
  'calculator': Calculator,
  'age': AgeCalculator,
  'bmi': BmiCalculator,
  'loan': LoanCalculator,
  'unit': UnitConverter,
  'tip': TipCalculator,
};
