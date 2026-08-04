import React from 'react';
import { Hexagon, ArrowUp, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07070a] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0a0a0f]/90 border border-[#00f3ff]/40 flex items-center justify-center p-1 shadow-[0_0_15px_rgba(0,243,255,0.2)] overflow-hidden">
                <img src="/logo.png" alt="Hive Minds Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-xl text-white font-mono tracking-wider">
                HIVE<span className="text-[#00f3ff]">MINDS</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Collective Intelligence, Bespoke Web Solutions. We build custom 3D WebGL interfaces, microservice backend engines, and high-conversion full-stack digital products.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#00f3ff] transition-colors">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#00f3ff] hover:border-[#00f3ff] transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://x.com/hiveminds_sw" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#9d4edd] hover:border-[#9d4edd] transition-colors">
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono tracking-wider text-[#00f3ff] uppercase mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects Delivered</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Engineering Team</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Start a Project</a></li>
            </ul>
          </div>

          {/* Col 3: Tech Stack & System Status */}
          <div>
            <h4 className="text-xs font-mono tracking-wider text-[#9d4edd] uppercase mb-4">System Telemetry</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 flex items-center justify-between">
                <span>Express API Server</span>
                <span className="text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 200 OK
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 flex items-center justify-between">
                <span>MongoDB Cluster</span>
                <span className="text-[#00f3ff] font-mono">Mongoose Active</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 flex items-center justify-between">
                <span>WebGL Renderer</span>
                <span className="text-[#ffb703] font-mono">60 FPS</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Hive Minds Tech Collective. All Rights Reserved.</p>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-[#00f3ff] transition-colors flex items-center gap-2"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
