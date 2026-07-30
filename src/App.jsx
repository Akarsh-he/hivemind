import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Team } from './components/Team';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export function App() {
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-slate-100 selection:bg-[#00f3ff] selection:text-slate-950 font-sans">
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
