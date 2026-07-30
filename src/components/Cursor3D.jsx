import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Inner 3D Cursor Scene Object
const CursorMesh = ({ mousePos, isHovered, isClicked }) => {
  const meshRef = useRef();
  const ringRef = useRef();
  const auraRef = useRef();
  const lightRef = useRef();

  // Target colors
  const cyanColor = useMemo(() => new THREE.Color('#00f3ff'), []);
  const magentaColor = useMemo(() => new THREE.Color('#ff007f'), []);
  const goldColor = useMemo(() => new THREE.Color('#ffb703'), []);

  // Current interpolated state values
  const currPos = useRef({ x: 0, y: 0 });
  const currRingPos = useRef({ x: 0, y: 0 });
  const currScale = useRef(1);
  const currColor = useRef(new THREE.Color('#00f3ff'));

  // Create subtle particle aura around cursor
  const auraCount = 28;
  const auraPositions = useMemo(() => {
    const pos = new Float32Array(auraCount * 3);
    for (let i = 0; i < auraCount; i++) {
      const angle = (i / auraCount) * Math.PI * 2;
      const radius = 28 + (Math.random() - 0.5) * 6;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [auraCount]);

  useFrame((state, delta) => {
    const { width, height } = state.size;
    const dt = Math.min(delta, 0.033);

    // Convert mouse normalized pointer [-1, 1] into pixel-based orthographic 3D coordinates
    const targetX = (mousePos.current.x * width) / 2;
    const targetY = (mousePos.current.y * height) / 2;

    // Smooth weighted lerp for main core
    currPos.current.x = THREE.MathUtils.lerp(currPos.current.x, targetX, dt * 22);
    currPos.current.y = THREE.MathUtils.lerp(currPos.current.y, targetY, dt * 22);

    // Looser lerp for outer ring (trailing effect)
    currRingPos.current.x = THREE.MathUtils.lerp(currRingPos.current.x, targetX, dt * 12);
    currRingPos.current.y = THREE.MathUtils.lerp(currRingPos.current.y, targetY, dt * 12);

    // Hover & Click scale interpolation
    let targetScale = isHovered ? 1.65 : 1.0;
    if (isClicked) targetScale *= 0.65;
    currScale.current = THREE.MathUtils.lerp(currScale.current, targetScale, dt * 18);

    // Color transition on hover
    const targetColor = isHovered ? (isClicked ? goldColor : magentaColor) : cyanColor;
    currColor.current.lerp(targetColor, dt * 10);

    // Update Core Mesh Position, Scale & Rotation
    if (meshRef.current) {
      meshRef.current.position.set(currPos.current.x, currPos.current.y, 0);
      meshRef.current.scale.setScalar(currScale.current);

      const spinSpeed = isHovered ? 4.5 : 2.0;
      meshRef.current.rotation.x += dt * spinSpeed;
      meshRef.current.rotation.y += dt * (spinSpeed * 1.3);
      meshRef.current.rotation.z += dt * (spinSpeed * 0.7);

      if (meshRef.current.material) {
        meshRef.current.material.color.copy(currColor.current);
        meshRef.current.material.emissive.copy(currColor.current);
      }
    }

    // Update Outer Trailing Ring Position & Rotation
    if (ringRef.current) {
      ringRef.current.position.set(currRingPos.current.x, currRingPos.current.y, -2);
      const ringScale = currScale.current * (isHovered ? 1.3 : 1.1);
      ringRef.current.scale.setScalar(ringScale);

      const ringSpin = isHovered ? -3.5 : -1.2;
      ringRef.current.rotation.z += dt * ringSpin;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 3) * 0.4;

      if (ringRef.current.material) {
        ringRef.current.material.color.copy(currColor.current);
      }
    }

    // Update Particle Aura
    if (auraRef.current) {
      auraRef.current.position.set(currRingPos.current.x, currRingPos.current.y, -3);
      auraRef.current.rotation.z -= dt * 1.5;
    }

    // Update Dynamic Cursor Light
    if (lightRef.current) {
      lightRef.current.position.set(currPos.current.x, currPos.current.y, 30);
      lightRef.current.color.copy(currColor.current);
      lightRef.current.intensity = isHovered ? 4.5 : 2.5;
    }
  });

  return (
    <group>
      {/* Attached Dynamic Point Light illuminating scene below */}
      <pointLight ref={lightRef} distance={200} decay={1.5} />

      {/* Inner Spinning Octahedron Gem Core */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[11, 0]} />
        <meshStandardMaterial
          roughness={0.1}
          metalness={0.9}
          emissiveIntensity={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Outer Floating Trailing Torus Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[22, 1.8, 16, 64]} />
        <meshBasicMaterial
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbiting Particle Aura Ring */}
      <points ref={auraRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={auraCount}
            array={auraPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={3.5}
          color={isHovered ? '#ff007f' : '#00f3ff'}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const Cursor3D = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Mobile & Touch Device Fallback Check
    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      return hasTouch || isCoarse;
    };

    if (checkMobile()) {
      setIsMobile(true);
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    // Enable global custom cursor class on body for desktop
    document.body.classList.add('custom-cursor-active');

    // 2. Track Mouse Movement
    const handleMouseMove = (e) => {
      // Convert screen pixels (0..width, 0..height) to normalized pointer (-1..1)
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // 3. Hover Detection over Interactive Elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], .glass-panel-hover, .glow-button, [data-cursor="hover"]'
      );

      setIsHovered(!!isInteractive);
    };

    // 4. Click Detection
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Return null on touch/mobile devices so standard touch interactions remain active
  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <Canvas
        orthographic
        camera={{ left: -100, right: 100, top: 100, bottom: -100, near: 0.1, far: 1000, position: [0, 0, 100] }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <CursorMesh
          mousePos={mousePos}
          isHovered={isHovered}
          isClicked={isClicked}
        />
      </Canvas>
    </div>
  );
};

export default Cursor3D;
