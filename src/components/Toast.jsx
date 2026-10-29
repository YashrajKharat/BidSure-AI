import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const bgStyles = {
    success: 'bg-emerald-900 text-white border-emerald-700',
    error: 'bg-rose-900 text-white border-rose-700',
    warning: 'bg-amber-900 text-white border-amber-700',
    info: 'bg-blue-900 text-white border-blue-700'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl ${bgStyles[type] || bgStyles.info} min-w-[300px] max-w-md`}>
        {icons[type]}
        <div className="flex-1 text-xs font-medium leading-relaxed">
          {message}
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
