import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Team } from './components/Team';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { onColdStartChange } from './services/api';
import { Loader2, Server } from 'lucide-react';

export function App() {
  const [toast, setToast] = useState(null);
  const [isColdStarting, setIsColdStarting] = useState(false);

  useEffect(() => {
    const unsubscribe = onColdStartChange((pending) => {
      setIsColdStarting(pending);
    });
    return () => unsubscribe();
  }, []);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-slate-100 selection:bg-[#00f3ff] selection:text-slate-950 font-sans">
      {/* Render Backend Cold Start Alert */}
      {isColdStarting && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[90%] sm:w-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 py-3 rounded-2xl bg-[#0a0a0f]/95 border border-[#00f3ff]/40 text-white shadow-[0_0_30px_rgba(0,243,255,0.25)] backdrop-blur-md flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-[#00f3ff] animate-spin shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-[#00f3ff] font-mono flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 inline" /> Connecting to Live Backend...
              </span>
              <p className="text-slate-300 mt-0.5 text-[11px] leading-tight">
                Render free tier instance cold start in progress. Initial request may take ~30–50s.
              </p>
            </div>
          </div>
        </div>
      )}

      <Navbar />
      <main>
        <Hero3D />
        <Services />
        <Projects />
        <Team />
        <About />
        <Contact onShowToast={showToast} />
      </main>
      <Footer />

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
