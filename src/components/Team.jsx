import React, { useState, useEffect } from 'react';
import { fetchTeam } from '../services/api';
import { Mail, Sparkles, Users } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

export const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const res = await fetchTeam();
        if (res && Array.isArray(res.data)) {
          setTeamMembers(res.data);
        } else {
          setTeamMembers([]);
        }
      } catch (err) {
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };
    loadTeam();
  }, []);

  return (
    <section id="team" className="py-24 relative bg-[#0a0a0f]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-[#9d4edd] uppercase px-3 py-1 rounded-full bg-[#9d4edd]/10 border border-[#9d4edd]/20">
            Engineers & Creators
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Meet the <span className="gradient-text">Hive Minds Team</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            A multidisciplinary collective of architects, 3D artists, and full-stack software engineers pushing web boundaries.
          </p>
        </div>

        {/* Team Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-panel h-80 rounded-3xl animate-pulse bg-slate-900/40" />
            ))}
          </div>
        ) : teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member._id || member.name}
                className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-[#9d4edd]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#9d4edd]/10 to-transparent rounded-full blur-xl pointer-events-none" />

                <div>
                  {/* Avatar with Cyber Glow Frame */}
                  <div className="relative w-28 h-28 mx-auto mb-6 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-[#00f3ff] via-[#9d4edd] to-[#ff007f] group-hover:shadow-[0_0_20px_rgba(157,78,221,0.5)] transition-shadow">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Name & Role */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00f3ff] transition-colors">
                      {member.name}
                    </h3>
                    <span className="text-xs font-mono text-[#9d4edd] block mt-1">
                      {member.role}
                    </span>
                    <p className="text-slate-300 text-xs mt-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap justify-center gap-1.5 mt-5">
                    {(member.skills || []).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700/60 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover-reveal Social Links */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-center gap-3">
                  {member.socialLinks?.github && (
                    <a
                      href={member.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white hover:border-[#00f3ff] transition-colors"
                      title="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socialLinks?.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-[#00f3ff] hover:border-[#00f3ff] transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socialLinks?.twitter && (
                    <a
                      href={member.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-[#9d4edd] hover:border-[#9d4edd] transition-colors"
                      title="Twitter / X"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socialLinks?.email && (
                    <a
                      href={`mailto:${member.socialLinks.email}`}
                      className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-[#ffb703] hover:border-[#ffb703] transition-colors"
                      title="Email Direct"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel p-12 text-center rounded-3xl border border-white/10 my-8">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white">No Team Profiles Listed</h3>
            <p className="text-slate-400 text-sm mt-2">Team profiles will appear here once created via the Admin Portal.</p>
          </div>
        )}

      </div>
    </section>
  );
};
