import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export const Toast = ({ type = 'success', message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom duration-300">
      <div className={`p-4 rounded-2xl backdrop-blur-xl border flex items-start justify-between gap-3 shadow-2xl ${isSuccess ? 'bg-[#00f3ff]/10 border-[#00f3ff] text-white shadow-[0_0_30px_rgba(0,243,255,0.3)]' : 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-[0_0_30px_rgba(244,63,94,0.3)]'}`}>
        <div className="flex items-start gap-3">
          {isSuccess ? (
            <CheckCircle2 className="w-6 h-6 text-[#00f3ff] shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div>
            <h4 className="font-bold text-sm font-mono">
              {isSuccess ? 'Inquiry Dispatched' : 'Submission Error'}
            </h4>
            <p className="text-xs mt-1 leading-relaxed opacity-90">{message}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
