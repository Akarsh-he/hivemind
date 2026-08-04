import React, { useState, useEffect } from 'react';
import { Network, ShieldCheck, Zap, Award, Target, Users2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchProjects, fetchTeam } from '../services/api';
import { defaultProjects, defaultTeam } from '../data/mockData';

export const About = () => {
  const [projectsCount, setProjectsCount] = useState(defaultProjects.length);
  const [teamCount, setTeamCount] = useState(defaultTeam.length);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [projRes, teamRes] = await Promise.allSettled([
          fetchProjects(),
          fetchTeam()
        ]);

        if (projRes.status === 'fulfilled' && projRes.value?.data && Array.isArray(projRes.value.data)) {
          setProjectsCount(projRes.value.data.length);
        } else if (projRes.status === 'fulfilled' && typeof projRes.value?.count === 'number') {
          setProjectsCount(projRes.value.count);
        }

        if (teamRes.status === 'fulfilled' && teamRes.value?.data && Array.isArray(teamRes.value.data)) {
          setTeamCount(teamRes.value.data.length);
        } else if (teamRes.status === 'fulfilled' && typeof teamRes.value?.count === 'number') {
          setTeamCount(teamRes.value.count);
        }
      } catch (err) {
        console.warn('Error fetching backend stats:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const stats = [
    { label: 'Projects Built', val: loading ? '...' : `${projectsCount}` },
    { label: 'Team Members', val: loading ? '...' : `${teamCount}` },
    { label: 'Client Satisfaction', val: '100%' },
    { label: 'Uptime SLA', val: '99.99%' },
  ];

  return (
    <section id="about" className="py-24 relative bg-[#0a0a0f] cyber-grid overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Narrative Info Left Column */}
          <div>
            <span className="text-xs font-mono tracking-widest text-[#00f3ff] uppercase px-3 py-1 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/20">
              About Hive Minds
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight leading-tight">
              Synergizing Tech Talent for <span className="gradient-text">Unrivaled Excellence</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mt-6 leading-relaxed">
              Founded on the belief that complex digital challenges require collective intelligence, **Hive Minds** operates as a high-velocity development collective. We blend deep 3D WebGL graphics expertise with robust cloud backend architectures to construct custom digital products that outshine off-the-shelf templates.
            </p>
            <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
              Whether you are an ambitious Web3 protocol launching a decentralized portal, an enterprise scaling AI SaaS microservices, or a luxury brand seeking interactive photorealistic 3D configurators — we turn your vision into executable reality.
            </p>

            {/* Core Values Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3">
                <Target className="w-5 h-5 text-[#00f3ff] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm">Bespoke Precision</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Zero generic templates. Every element custom built.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3">
                <Zap className="w-5 h-5 text-[#9d4edd] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm">Lightning 60 FPS</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Optimized canvas rendering and ultra-fast APIs.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Card & Interactive Mesh Node Showcase */}
          <div className="relative">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#00f3ff]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#00f3ff]/20 via-[#9d4edd]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-6">
                <Network className="w-8 h-8 text-[#00f3ff]" />
                <div>
                  <h3 className="text-xl font-bold text-white">The Hive Philosophy</h3>
                  <p className="text-xs text-slate-400 font-mono">Distributed Nodes, Unified Intelligence</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-between">
                  <span className="font-medium text-slate-200">1. Agility & Rapid Iteration</span>
                  <span className="text-xs font-mono text-[#00f3ff]">Sprint Velocity</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-between">
                  <span className="font-medium text-slate-200">2. Zero Tech Debt Architecture</span>
                  <span className="text-xs font-mono text-[#9d4edd]">Strict Mongoose & Types</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-between">
                  <span className="font-medium text-slate-200">3. End-to-End Ownership</span>
                  <span className="text-xs font-mono text-[#ffb703]">Design to Cloud Deploy</span>
                </div>
              </div>

              {/* Stats Counters Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                {stats.map((st, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-slate-900/50">
                    <div className="text-2xl font-extrabold text-white font-mono gradient-text">{st.val}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{st.label}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
