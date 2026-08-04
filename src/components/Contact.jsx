import React, { useState } from 'react';
import { submitContactForm } from '../services/api';
import confetti from 'canvas-confetti';
import { Send, Sparkles, Mail, MessageSquare, DollarSign, User, FolderKanban, CheckCircle2 } from 'lucide-react';

export const Contact = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Custom Web Application',
    budget: '$15k - $30k',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const projectTypes = [
    'Custom Web Application',
    'E-Commerce Platform',
    'Interactive 3D Web Experience',
    'API & Microservice Backend',
    'Full-Stack Enterprise Solution'
  ];

  const budgetRanges = [
    '$5k - $15k',
    '$15k - $30k',
    '$30k - $60k',
    '$60k+'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const result = await submitContactForm(formData);

      // Trigger Confetti Burst on Success
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f3ff', '#9d4edd', '#ffb703', '#ff007f']
      });

      onShowToast('success', result.message || 'Project inquiry sent successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        projectType: 'Custom Web Application',
        budget: '$15k - $30k',
        message: ''
      });
    } catch (err) {
      onShowToast('error', err.message || 'Failed to submit form. Please check your network.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#0a0a0f] cyber-grid overflow-hidden">
      
      {/* Background glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#00f3ff]/10 via-[#9d4edd]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-[#00f3ff] uppercase px-3 py-1 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/20">
            Initiate Engagement
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Ready to Build with <span className="gradient-text">Hive Minds?</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            Send us your project scope. Our lead architects will analyze your requirements and deliver a technical roadmap within 24 hours.
          </p>
        </div>

        <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-[#00f3ff]/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#00f3ff]" /> Full Name <span className="text-[#00f3ff]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#00f3ff]" /> Work Email <span className="text-[#00f3ff]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-colors"
                />
              </div>

            </div>

            {/* Row 2: Project Type Dropdown */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2 flex items-center gap-1.5">
                <FolderKanban className="w-3.5 h-3.5 text-[#9d4edd]" /> Project Type <span className="text-[#9d4edd]">*</span>
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#9d4edd] transition-colors"
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type} className="bg-[#0a0a0f] text-slate-200">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 3: Budget Range Buttons */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-3 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#ffb703]" /> Allocated Budget Range
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {budgetRanges.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setFormData({ ...formData, budget: b })}
                    className={`py-3 px-4 rounded-xl text-xs font-mono font-bold transition-all ${formData.budget === b ? 'bg-[#ffb703]/20 border border-[#ffb703] text-[#ffb703] shadow-[0_0_15px_rgba(255,183,3,0.3)]' : 'bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 4: Message */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#00f3ff]" /> Project Scope & Objectives <span className="text-[#00f3ff]">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Tell us about your goals, target timeline, key features, or design inspirations..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="glow-button w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  <span>Transmitting to Express API...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Dispatch Project Inquiry</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 text-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>End-to-end encrypted & confidential transmission</span>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
