import {
  CheckSquare, Timer, Clock, AlarmClock, FileText, Target,
  Type, AlignLeft, Code, Key, Hash, Link, Palette, QrCode,
  Calendar, Activity, Ruler, Receipt, DollarSign, Music,
  Printer, Youtube, Image, Brain, Sparkles, RefreshCw,
  Scissors, Mic, Building2, GitCompare, StickyNote
} from 'lucide-react'

export const TOOLS = [
  // Productivity
  { id: 'todo',      name: 'Todo List',         desc: 'Manage tasks with priorities and deadlines.',           credits: 2,  icon: CheckSquare, color: '#6366f1', category: 'Productivity' },
  { id: 'pomodoro',  name: 'Pomodoro Timer',    desc: 'Boost focus with the proven 25/5 technique.',          credits: 1,  icon: Timer,       color: '#8b5cf6', category: 'Productivity' },
  { id: 'stopwatch', name: 'Stopwatch',          desc: 'Precise stopwatch with lap tracking.',                 credits: 1,  icon: Clock,       color: '#6366f1', category: 'Productivity' },
  { id: 'countdown', name: 'Countdown Timer',    desc: 'Set a countdown to any event or deadline.',            credits: 1,  icon: AlarmClock,  color: '#8b5cf6', category: 'Productivity' },
  { id: 'notes',     name: 'Quick Notes',        desc: 'Jot down notes and ideas, saved locally.',             credits: 2,  icon: StickyNote,  color: '#f59e0b', category: 'Productivity' },
  { id: 'habits',    name: 'Habit Tracker',      desc: 'Build streaks and track daily habits.',                credits: 3,  icon: Target,      color: '#10b981', category: 'Productivity' },
  { id: 'budget',    name: 'Budget Tracker',     desc: 'Track income and expenses effortlessly.',              credits: 4,  icon: DollarSign,  color: '#10b981', category: 'Productivity' },

  // Text Tools
  { id: 'wordcount',   name: 'Word Counter',      desc: 'Count words, chars, sentences, and reading time.',  credits: 1,  icon: Type,       color: '#3b82f6', category: 'Text Tools' },
  { id: 'caseconvert', name: 'Case Converter',    desc: 'Convert text to UPPER, lower, Title, camelCase.',   credits: 1,  icon: AlignLeft,  color: '#3b82f6', category: 'Text Tools' },
  { id: 'lorem',       name: 'Lorem Ipsum',        desc: 'Generate placeholder text for designs.',            credits: 1,  icon: FileText,   color: '#6366f1', category: 'Text Tools' },
  { id: 'markdown',    name: 'Markdown Editor',    desc: 'Write and preview markdown with live rendering.',   credits: 2,  icon: Code,       color: '#8b5cf6', category: 'Text Tools' },
  { id: 'diff',        name: 'Diff Checker',       desc: 'Compare two texts and highlight differences.',      credits: 2,  icon: GitCompare, color: '#6366f1', category: 'Text Tools' },

  // Dev Tools
  { id: 'password',   name: 'Password Generator', desc: 'Generate strong, secure passwords instantly.',       credits: 1,  icon: Key,        color: '#ec4899', category: 'Dev Tools' },
  { id: 'json',       name: 'JSON Formatter',      desc: 'Format, validate, and minify JSON data.',            credits: 2,  icon: Code,       color: '#f59e0b', category: 'Dev Tools' },
  { id: 'base64',     name: 'Base64 Tool',         desc: 'Encode and decode Base64 strings.',                  credits: 2,  icon: Hash,       color: '#10b981', category: 'Dev Tools' },
  { id: 'urlencoder', name: 'URL Encoder',         desc: 'Encode and decode URLs and query strings.',          credits: 1,  icon: Link,       color: '#3b82f6', category: 'Dev Tools' },
  { id: 'color',      name: 'Color Picker',        desc: 'Pick colors and get HEX, RGB, HSL values.',         credits: 1,  icon: Palette,    color: '#ec4899', category: 'Dev Tools' },
  { id: 'qr',         name: 'QR Generator',        desc: 'Generate QR codes for URLs and text.',               credits: 2,  icon: QrCode,     color: '#06b6d4', category: 'Dev Tools' },

  // Calculators
  { id: 'calculator', name: 'Calculator',          desc: 'Full-featured calculator for everyday math.',        credits: 1,  icon: Hash,       color: '#6366f1', category: 'Calculators' },
  { id: 'age',        name: 'Age Calculator',      desc: 'Calculate exact age in years, months, days.',        credits: 1,  icon: Calendar,   color: '#8b5cf6', category: 'Calculators' },
  { id: 'bmi',        name: 'BMI Calculator',      desc: 'Calculate BMI and get health category.',             credits: 1,  icon: Activity,   color: '#10b981', category: 'Calculators' },
  { id: 'loan',       name: 'Loan EMI Calculator', desc: 'Calculate monthly EMI for any loan.',               credits: 2,  icon: Building2,  color: '#f59e0b', category: 'Calculators' },
  { id: 'unit',       name: 'Unit Converter',      desc: 'Convert length, weight, temperature, and more.',    credits: 2,  icon: Ruler,      color: '#3b82f6', category: 'Calculators' },
  { id: 'tip',        name: 'Tip Calculator',      desc: 'Calculate tip and split bills among friends.',       credits: 1,  icon: Receipt,    color: '#ec4899', category: 'Calculators' },

  // Media & Creative
  { id: 'music',   name: 'Music Player',        desc: 'Embed YouTube music for focus sessions.',               credits: 3,  icon: Music,   color: '#8b5cf6', category: 'Media' },
  { id: 'invoice', name: 'Invoice Generator',   desc: 'Create and print professional invoices.',               credits: 8,  icon: Printer, color: '#6366f1', category: 'Media' },

  // Coming Soon
  { id: 'resume',    name: 'Resume Builder',       desc: 'Build ATS-friendly resumes with AI assistance.',    credits: 10, icon: FileText,  color: '#6366f1', category: 'Professional', comingSoon: true },
  { id: 'ai-text',   name: 'AI Text Generator',    desc: 'Generate high-quality content with advanced AI.',   credits: 5,  icon: Sparkles,  color: '#8b5cf6', category: 'AI Tools',     comingSoon: true },
  { id: 'ai-writer', name: 'AI Writer',            desc: 'Long-form content writing powered by AI.',          credits: 15, icon: Brain,     color: '#6366f1', category: 'AI Tools',     comingSoon: true },
  { id: 'image',     name: 'Image Tools',          desc: 'Resize, compress, and convert images.',             credits: 8,  icon: Image,     color: '#3b82f6', category: 'Media',        comingSoon: true },
  { id: 'youtube',   name: 'YouTube Tools',        desc: 'Extract transcripts and metadata from videos.',     credits: 6,  icon: Youtube,   color: '#ef4444', category: 'Media',        comingSoon: true },
  { id: 'pdf',       name: 'PDF Tools',            desc: 'Merge, split, and convert PDF documents.',          credits: 4,  icon: FileText,  color: '#ec4899', category: 'Documents',    comingSoon: true },
  { id: 'bg-remove', name: 'Background Remover',   desc: 'Remove image backgrounds with AI precision.',       credits: 10, icon: Scissors,  color: '#f59e0b', category: 'Media',        comingSoon: true },
  { id: 'tts',       name: 'Text to Speech',       desc: 'Convert text to natural-sounding audio.',           credits: 5,  icon: Mic,       color: '#06b6d4', category: 'Media',        comingSoon: true },
  { id: 'converter', name: 'File Converter',       desc: 'Convert files between various formats.',            credits: 3,  icon: RefreshCw, color: '#10b981', category: 'Documents',    comingSoon: true },
]

export const CATEGORIES = ['All', ...new Set(TOOLS.map(t => t.category))]
