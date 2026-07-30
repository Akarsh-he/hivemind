import React from 'react';
import { X, ExternalLink, CheckCircle, BarChart3, Building2, Tag } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0f]/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl glass-panel rounded-3xl border border-[#00f3ff]/30 shadow-[0_0_50px_rgba(0,243,255,0.2)] overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="relative h-64 w-full bg-slate-900 overflow-hidden shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12121c] via-[#12121c]/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-white/20 text-slate-300 hover:text-white hover:bg-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Category Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00f3ff]/20 border border-[#00f3ff]/40 text-[#00f3ff] inline-block mb-2">
              {project.category} Case Study
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{project.title}</h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Subtitle / Client */}
          {project.client && (
            <div className="flex items-center gap-2 text-sm text-[#9d4edd] font-mono">
              <Building2 className="w-4 h-4" />
              <span>Client: {project.client}</span>
            </div>
          )}

          {/* Overview Narrative */}
          <div>
            <h4 className="text-xs font-mono tracking-wider text-[#00f3ff] uppercase mb-2">Project Overview & Architecture</h4>
            <p className="text-slate-200 text-base leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Key Metrics / Results Grid */}
          {project.metrics && (
            <div>
              <h4 className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#ffb703]" /> Performance Benchmarks & Impact
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(project.metrics).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-center">
                    <div className="text-xl font-bold text-[#ffb703] font-mono">{val}</div>
                    <div className="text-xs text-slate-400 capitalize mt-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Breakdown */}
          <div>
            <h4 className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#00f3ff]" /> Applied Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-[#00f3ff]/30 text-[#00f3ff]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> Verified Delivery by Hive Minds
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none glow-button px-5 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Application</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
