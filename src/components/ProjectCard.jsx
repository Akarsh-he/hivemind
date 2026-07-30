import React, { useState } from 'react';
import { ExternalLink, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export const ProjectCard = ({ project, onSelectCaseStudy }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth tilt limit (+- 10 degrees)
    const rotateXVal = ((y - centerY) / centerY) * -10;
    const rotateYVal = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
      className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#00f3ff]/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.25)] flex flex-col justify-between group"
    >
      <div>
        {/* Project Thumbnail Image */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent opacity-80" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#0a0a0f]/80 backdrop-blur-md border border-[#00f3ff]/40 text-[#00f3ff]">
              {project.category}
            </span>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#ffb703]/20 border border-[#ffb703]/50 text-[#ffb703] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Featured
              </span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white group-hover:text-[#00f3ff] transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-[#9d4edd] font-mono mt-1 mb-3">{project.subtitle || project.client}</p>
          <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 text-slate-300"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-xs font-mono px-2 py-1 rounded-md bg-slate-900 text-slate-500">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-2 border-t border-white/5">
        <button
          onClick={() => onSelectCaseStudy(project)}
          className="text-xs font-bold text-[#00f3ff] hover:underline flex items-center gap-1.5 py-1"
        >
          <span>View Case Study</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            title="View Code Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-[#00f3ff]/10 border border-[#00f3ff]/30 text-[#00f3ff] hover:bg-[#00f3ff]/20 transition-colors"
            title="Launch Live Preview"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );
};
