import React, { useState } from 'react';
import { Layers, ShoppingBag, Box, Server, Database, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 'custom-web',
      icon: Layers,
      title: 'Custom Web Applications',
      tagline: 'Tailor-made, high-performance web platforms engineered for maximum scalability.',
      color: '#00f3ff',
      bullets: [
        'Reactive React SPA & Next.js architectures',
        'State management via Redux Toolkit & Zustand',
        'Real-time WebSockets & SSE live streaming',
        'Strict TypeScript and automated test coverage'
      ]
    },
    {
      id: 'ecommerce',
      icon: ShoppingBag,
      title: 'E-Commerce Platforms',
      tagline: 'High-conversion online stores with instant checkout & AR try-ons.',
      color: '#ffb703',
      bullets: [
        'Headless storefronts connected to Shopify & Stripe',
        'Sub-second page rendering for fast checkout',
        'Custom inventory management and analytics',
        'Multi-currency and global localization support'
      ]
    },
    {
      id: 'interactive-3d',
      icon: Box,
      title: 'Interactive 3D Web Experiences',
      tagline: 'Immersive WebGL & Three.js canvas environments that captivate users.',
      color: '#9d4edd',
      bullets: [
        'Custom WebGL shaders & procedural materials',
        'Product 3D configurators with raytraced lighting',
        'Smooth scroll-triggered canvas camera tracks',
        'Targeted 60 FPS mobile and desktop performance'
      ]
    },
    {
      id: 'api-dev',
      icon: Server,
      title: 'API & Microservice Architecture',
      tagline: 'Resilient Node.js and Express RESTful/GraphQL backend services.',
      color: '#ff007f',
      bullets: [
        'Express.js backend design & API gateway security',
        'JWT token authentication and OAuth2 login',
        'Rate-limiting, caching (Redis), & error logging',
        'Comprehensive OpenAPI / Swagger documentation'
      ]
    },
    {
      id: 'fullstack-solutions',
      icon: Database,
      title: 'Full-Stack Enterprise Solutions',
      tagline: 'End-to-end web software lifecycle from database modeling to deployment.',
      color: '#00f3ff',
      bullets: [
        'MongoDB Mongoose schema & query optimization',
        'Docker containerization & Kubernetes clusters',
        'CI/CD pipeline automation (GitHub Actions / AWS)',
        'Continuous uptime monitoring and security audits'
      ]
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#0a0a0f]">
      
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00f3ff]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9d4edd]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-[#00f3ff] uppercase px-3 py-1 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/20">
            What We Create
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Tailored Engineering for <span className="gradient-text">Modern Web Needs</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            We don't build generic templates. Every line of code, 3D shader, and API route is custom crafted to deliver peak performance.
          </p>
        </div>

        {/* Services Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Services Selector Sidebar (Desktop) */}
          <div className="space-y-4">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const isSelected = activeService === idx;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 flex items-center justify-between group ${isSelected ? 'glass-panel border-[#00f3ff] shadow-[0_0_20px_rgba(0,243,255,0.2)]' : 'bg-slate-900/40 border border-white/5 hover:border-white/20'}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="p-3 rounded-xl transition-all"
                      style={{
                        backgroundColor: isSelected ? `${service.color}20` : 'rgba(255,255,255,0.05)',
                        color: isSelected ? service.color : '#94a3b8'
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-base ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{service.tagline}</p>
                    </div>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-transform ${isSelected ? 'text-[#00f3ff] translate-x-1' : 'text-slate-600 opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}
          </div>

          {/* Service Detail Showcase Panel */}
          <div className="lg:col-span-2 glass-panel p-8 sm:p-10 rounded-3xl border border-[#00f3ff]/20 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00f3ff]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-4 mb-6">
                {React.createElement(services[activeService].icon, {
                  className: "w-10 h-10 p-2 rounded-2xl bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30"
                })}
                <div>
                  <span className="text-xs font-mono text-[#00f3ff] uppercase tracking-wider">Service Detail</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{services[activeService].title}</h3>
                </div>
              </div>

              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                {services[activeService].tagline}
              </p>

              <h4 className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-4">Core Deliverables & Tech Capabilities</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services[activeService].bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-[#00f3ff] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-[#00f3ff]" />
                <span>Custom Architecture & Documentation Included</span>
              </div>
              <a
                href="#contact"
                className="glow-button px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
