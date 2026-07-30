import React, { useState, useEffect } from 'react';
import { Hexagon, Menu, X, Sparkles, Code2, ArrowUpRight } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Team', href: '#team' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#00f3ff]/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#00f3ff]/20 to-[#9d4edd]/20 border border-[#00f3ff]/40 group-hover:border-[#00f3ff] group-hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all">
            <Hexagon className="w-6 h-6 text-[#00f3ff] animate-pulse" />
            <Sparkles className="w-3 h-3 text-[#9d4edd] absolute -top-1 -right-1" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-wider text-white flex items-center gap-1.5 font-mono">
              HIVE<span className="text-[#00f3ff]">MINDS</span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 uppercase">Collective Intelligence</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 glass-panel px-6 py-2 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-[#00f3ff] transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00f3ff] to-[#9d4edd] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Action Button & Status Indicator */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/20 text-xs text-[#00f3ff]">
            <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-ping" />
            <span className="font-mono">Available for Q3/Q4</span>
          </div>

          <a
            href="#contact"
            className="glow-button px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 group"
          >
            <span>Start Project</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-[#00f3ff]/20 px-6 py-6 mt-2 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-[#00f3ff] transition-colors py-2 border-b border-white/5 flex items-center justify-between"
            >
              <span>{link.name}</span>
              <ArrowUpRight className="w-4 h-4 opacity-50" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="glow-button w-full py-3 rounded-xl font-medium text-center flex items-center justify-center gap-2 mt-2"
          >
            <span>Hire Hive Minds</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};
