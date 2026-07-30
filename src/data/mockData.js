export const defaultProjects = [
  {
    _id: "p1",
    title: "Aetheria - Web3 NFT & DeFi Marketplace",
    subtitle: "High-throughput decentralized exchange & 3D digital collectible showroom",
    description: "An ultra-fast decentralized trading portal featuring interactive 3D WebGL asset previews, real-time liquidity analytics, and wallet integrations.",
    fullDescription: "Aetheria redefines decentralized finance with immersive 3D product previews powered by Three.js and custom shaders. Built for high-volume transactions, it includes live candle charts, multi-chain wallet connect, gas estimation algorithms, and a real-time order matching engine.",
    category: "Web3",
    tags: ["React", "Three.js", "Web3.js", "Solidity", "Tailwind CSS", "Express"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://example.com/aetheria",
    githubUrl: "https://github.com/hiveminds/aetheria-web3",
    featured: true,
    metrics: {
      tps: "50,000+",
      volume: "$12M+",
      activeUsers: "120K+"
    },
    client: "Aetheria Protocol Ltd"
  },
  {
    _id: "p2",
    title: "CyberSphere - AI Analytics SaaS Platform",
    subtitle: "Enterprise data visualization and predictive intelligence suite",
    description: "Real-time AI pipeline monitoring dashboard with responsive 3D node flow charts, dark theme analytics, and automated predictive alerts.",
    fullDescription: "CyberSphere provides enterprise engineering teams with unified telemetry across cloud microservices. Featuring live WebSocket telemetry streams, interactive node graph topology, custom alert builder, and automated anomaly detection powered by machine learning algorithms.",
    category: "SaaS",
    tags: ["React", "Node.js", "MongoDB", "Express", "D3.js", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://example.com/cybersphere",
    githubUrl: "https://github.com/hiveminds/cybersphere-saas",
    featured: true,
    metrics: {
      latency: "<15ms",
      eventsProcessed: "1.2B/day",
      uptime: "99.99%"
    },
    client: "CyberSphere Systems"
  },
  {
    _id: "p3",
    title: "Vortex Spatial - 3D Architectural Configurator",
    subtitle: "Web-based photorealistic interior & structural 3D customizer",
    description: "Browser-based 3D workspace where architects and clients customize layouts, lighting, material textures, and export CAD-ready renders.",
    fullDescription: "Vortex Spatial leverages WebGL and WebGPU shader techniques to deliver photorealistic raytraced 3D scenes in the browser. Users can swap materials in real time, adjust sun angles, measure wall dimensions, and collaborate synchronously via multiplayer WebSockets.",
    category: "Interactive",
    tags: ["Three.js", "React Three Fiber", "WebGPU", "Zustand", "Node.js"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://example.com/vortex-spatial",
    githubUrl: "https://github.com/hiveminds/vortex-3d",
    featured: true,
    metrics: {
      fps: "60 FPS",
      modelsRendered: "85,000+",
      conversionRate: "+42%"
    },
    client: "Vortex Spatial Studio"
  },
  {
    _id: "p4",
    title: "NeuraCart - Next-Gen E-Commerce Engine",
    subtitle: "AI-assisted luxury retail store with instant checkout & AR try-ons",
    description: "Ultra-performing headless storefront boasting sub-second page loads, personalized recommendation engine, and augmented reality product previews.",
    fullDescription: "NeuraCart combines headless architecture with edge rendering for instantaneous navigation. Includes custom checkout flows, inventory sync across global warehouses, multi-currency support, and mobile AR placement.",
    category: "E-commerce",
    tags: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Express", "Stripe API"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://example.com/neuracart",
    githubUrl: "https://github.com/hiveminds/neuracart-store",
    featured: false,
    metrics: {
      loadTime: "0.4s",
      salesGrowth: "+180%",
      avgOrderValue: "$240"
    },
    client: "Neura Fashion Global"
  },
  {
    _id: "p5",
    title: "Synapse Flow - Developer Workflow Automation",
    subtitle: "Visual API orchestrator & microservice topology engine",
    description: "Drag-and-drop node graph workspace enabling developers to connect REST/GraphQL APIs, write custom JS lambdas, and test payloads in real time.",
    fullDescription: "Synapse Flow streamlines API integration workflows with interactive canvas node wiring, inline debugging, versioned environment secrets, and automated documentation generation.",
    category: "SaaS",
    tags: ["React", "ReactFlow", "Node.js", "Express", "MongoDB", "Docker"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://example.com/synapse-flow",
    githubUrl: "https://github.com/hiveminds/synapse-flow",
    featured: false,
    metrics: {
      workflowsRun: "4.5M",
      timeSaved: "12,000 hrs"
    },
    client: "Synapse Labs"
  },
  {
    _id: "p6",
    title: "Chronos Metaverse - Virtual Concert Portal",
    subtitle: "Multiplayer audio-visual 3D concert experience with spatial sound",
    description: "An immersive 3D browser environment hosting live virtual music festivals with spatial audio, dynamic lightning, and reactive avatar animations.",
    fullDescription: "Built with React Three Fiber, WebAudio API, and PeerJS. Tens of thousands of fans gather in custom 3D arenas to experience live audio-visual shows with synchronized particle fireworks and avatar customization.",
    category: "Interactive",
    tags: ["Three.js", "React Three Fiber", "WebAudio API", "WebSockets", "Node.js"],
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://example.com/chronos-metaverse",
    githubUrl: "https://github.com/hiveminds/chronos-metaverse",
    featured: false,
    metrics: {
      concurrentFans: "15,000",
      audioLatency: "<20ms"
    },
    client: "Chronos Entertainment"
  }
];

export const defaultTeam = [
  {
    _id: "t1",
    name: "Akarsh Singh",
    role: "Lead Full-Stack Architect",
    bio: "Passionate about high-performance WebGL applications, cloud microservices, and crafting elegant user experiences.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    skills: ["React.js", "Node.js", "Express", "Three.js", "MongoDB", "TypeScript"],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      email: "akarsh@hiveminds.tech"
    }
  },
  {
    _id: "t2",
    name: "Elena Vance",
    role: "Senior 3D & Creative Director",
    bio: "Specializing in WebGL shader development, procedural motion design, and futuristic visual aesthetics.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    skills: ["Three.js", "React Three Fiber", "GLSL Shaders", "Figma", "Blender", "Framer Motion"],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      email: "elena@hiveminds.tech"
    }
  },
  {
    _id: "t3",
    name: "Marcus Chen",
    role: "Backend & Systems Specialist",
    bio: "Focused on scalable MongoDB data schemas, real-time WebSockets, microservices architecture, and security.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    skills: ["Node.js", "Express.js", "MongoDB", "GraphQL", "Redis", "Docker"],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      email: "marcus@hiveminds.tech"
    }
  },
  {
    _id: "t4",
    name: "Sophia Rodriguez",
    role: "UI/UX & Frontend Engineer",
    bio: "Dedicated to smooth 60fps animations, intuitive glassmorphic interfaces, and accessible responsive web standards.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    skills: ["React.js", "Tailwind CSS", "Framer Motion", "Design Systems", "HTML5/CSS3"],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      email: "sophia@hiveminds.tech"
    }
  }
];
