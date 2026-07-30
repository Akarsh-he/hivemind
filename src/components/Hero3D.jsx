import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { HiveSphere } from './HiveSphere';
import { ArrowRight, Sparkles, Code, Cpu, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero3D = () => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden cyber-grid">
      
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0 opacity-85">
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} color="#9d4edd" intensity={2} />
          <pointLight position={[5, 5, 5]} color="#00f3ff" intensity={2} />
          <HiveSphere />
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
        </Canvas>
      </div>

      {/* Hero Overlay Lighting Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/60 pointer-events-none z-1" />

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pointer-events-none">
        
        {/* Top Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#00f3ff]/30 text-xs sm:text-sm font-mono text-[#00f3ff] mb-8 pointer-events-auto"
        >
          <Sparkles className="w-4 h-4 text-[#00f3ff] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Next-Generation Full-Stack & 3D Engineering Studio</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-tight"
        >
          Hive Minds – <span className="gradient-text">Collective Intelligence</span>, Bespoke Web Solutions.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl font-normal leading-relaxed"
        >
          We craft custom, high-end websites tailored precisely to user demand. Harnessing cutting-edge 3D WebGL visuals, resilient microservices, and robust cloud data architectures.
        </motion.p>

        {/* Call-to-Actions (CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto pointer-events-auto"
        >
          <a
            href="#projects"
            className="glow-button w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 group"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-slate-900/80 border border-slate-700 hover:border-[#9d4edd] text-white hover:text-[#9d4edd] transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <span>Hire Us</span>
            <span className="w-2 h-2 rounded-full bg-[#9d4edd]" />
          </a>
        </motion.div>

        {/* Hero Features Metric Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl"
        >
          {[
            { icon: Code, title: '60 FPS WebGL', desc: 'Three.js & R3F graphics' },
            { icon: Cpu, title: 'Microsecond API', desc: 'Express & Node backend' },
            { icon: ShieldCheck, title: 'MongoDB Schemas', desc: 'Strict Mongoose ORM' },
            { icon: Sparkles, title: '100% Bespoke', desc: 'Tailored client solutions' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3 text-left hover:border-[#00f3ff]/40 transition-colors"
            >
              <div className="p-2.5 rounded-xl bg-[#00f3ff]/10 text-[#00f3ff]">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
