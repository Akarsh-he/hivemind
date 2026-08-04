import React, { useState, useEffect } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { fetchProjects } from '../services/api';
import { defaultProjects } from '../data/mockData';
import { Search, Filter, Sparkles, FolderGit2 } from 'lucide-react';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'E-commerce', 'Web3', 'Interactive', 'SaaS'];

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const res = await fetchProjects(selectedCategory, searchQuery);
        if (res && Array.isArray(res.data) && res.data.length > 0) {
          setProjects(res.data);
        } else if (selectedCategory === 'All' && !searchQuery) {
          setProjects(defaultProjects);
        } else {
          setProjects([]);
        }
      } catch (err) {
        if (selectedCategory === 'All' && !searchQuery) {
          setProjects(defaultProjects);
        } else {
          setProjects([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 relative bg-[#0a0a0f] cyber-grid">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[#00f3ff] text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/20">
              Projects Delivered {projects.length > 0 ? `(${projects.length})` : ''}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Our Digital <span className="gradient-text">Showcase & Works</span>
            </h2>
            <p className="text-slate-400 text-base max-w-xl mt-2">
              Explore our portfolio of high-impact WebGL experiences, enterprise SaaS platforms, and Web3 marketplaces.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all shrink-0 ${selectedCategory === cat ? 'bg-gradient-to-r from-[#00f3ff] to-[#9d4edd] text-slate-950 shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'bg-slate-900/80 border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel h-96 rounded-3xl animate-pulse bg-slate-900/40" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project._id || project.title}
                project={project}
                onSelectCaseStudy={(p) => setActiveModalProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-12 text-center rounded-3xl border border-white/10 my-8">
            <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white">No Matching Projects Found</h3>
            <p className="text-slate-400 text-sm mt-2">Try searching for a different keyword or create projects via the Admin Portal.</p>
          </div>
        )}

      </div>

      {/* Case Study Modal Popup */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}

    </section>
  );
};
