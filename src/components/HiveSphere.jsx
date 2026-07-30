import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Full-screen Widespread Cursor-Dispersing Node Particle Field
 * Features:
 * - Widespread particle field across the 3D canvas space
 * - Real-time 3D cursor raycasting & repulsion physics
 * - Spring-back dampening forces towards original anchor points
 * - Dynamic web connection line segments that stretch and fade upon dispersion ("web-breaking" / "hive displacement")
 * - 60 FPS direct memory buffer updates (position.needsUpdate = true)
 */
const NodeParticleField = () => {
  const pointsRef = useRef();
  const linesRef = useRef();

  const nodeCount = 550;

  // 1. Generate node positions, base anchors, velocities & colors
  const { positions, basePositions, velocities, colors, baseColors, candidatePairs } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const basePos = new Float32Array(nodeCount * 3);
    const vels = new Float32Array(nodeCount * 3);
    const cols = new Float32Array(nodeCount * 3);
    const baseCols = new Float32Array(nodeCount * 3);

    const cyanColor = new THREE.Color('#00f3ff');
    const purpleColor = new THREE.Color('#9d4edd');
    const goldColor = new THREE.Color('#ffb703');

    for (let i = 0; i < nodeCount; i++) {
      // Widespread distribution across full-screen 3D volume
      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 8 - 1.5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;

      vels[i * 3] = 0;
      vels[i * 3 + 1] = 0;
      vels[i * 3 + 2] = 0;

      let chosenColor = cyanColor;
      const rand = Math.random();
      if (rand > 0.55) chosenColor = purpleColor;
      if (rand > 0.88) chosenColor = goldColor;

      cols[i * 3] = chosenColor.r;
      cols[i * 3 + 1] = chosenColor.g;
      cols[i * 3 + 2] = chosenColor.b;

      baseCols[i * 3] = chosenColor.r;
      baseCols[i * 3 + 1] = chosenColor.g;
      baseCols[i * 3 + 2] = chosenColor.b;
    }

    // 2. Pre-select candidate pairs for connecting web lines
    const pairs = [];
    const maxConnectDistSq = 2.4 * 2.4;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = basePos[i * 3] - basePos[j * 3];
        const dy = basePos[i * 3 + 1] - basePos[j * 3 + 1];
        const dz = basePos[i * 3 + 2] - basePos[j * 3 + 2];
        const dSq = dx * dx + dy * dy + dz * dz;

        if (dSq < maxConnectDistSq) {
          pairs.push(i, j);
          if (pairs.length >= 800 * 2) break;
        }
      }
      if (pairs.length >= 800 * 2) break;
    }

    return {
      positions: pos,
      basePositions: basePos,
      velocities: vels,
      colors: cols,
      baseColors: baseCols,
      candidatePairs: new Uint16Array(pairs),
    };
  }, [nodeCount]);

  // Buffer arrays for web line segments
  const { linePositions, lineColors } = useMemo(() => {
    const totalLines = candidatePairs.length / 2;
    return {
      linePositions: new Float32Array(totalLines * 2 * 3),
      lineColors: new Float32Array(totalLines * 2 * 3),
    };
  }, [candidatePairs]);

  // Raycasting plane & cursor vectors
  const cursorPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const worldCursor = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const pointer = state.pointer; // Normalized [-1, 1]
    const dt = Math.min(delta, 0.033);

    // Unproject cursor to 3D world space
    state.raycaster.setFromCamera(pointer, state.camera);
    const intersected = state.raycaster.ray.intersectPlane(cursorPlane, worldCursor);

    if (!intersected) {
      worldCursor.set(1000, 1000, 1000);
    }

    // Dispersion Physics Parameters
    const repulsionRadius = 3.6;
    const repulsionRadiusSq = repulsionRadius * repulsionRadius;
    const repulsionStrength = 38.0;
    const springStiffness = 7.5;
    const damping = 4.2;

    const posArray = pointsRef.current?.geometry.attributes.position.array || positions;
    const colArray = pointsRef.current?.geometry.attributes.color.array || colors;

    // Physics Loop for Cursor Dispersion & Spring Return
    for (let i = 0; i < nodeCount; i++) {
      const idx = i * 3;
      let px = posArray[idx];
      let py = posArray[idx + 1];
      let pz = posArray[idx + 2];

      const ax = basePositions[idx];
      const ay = basePositions[idx + 1];
      const az = basePositions[idx + 2];

      let vx = velocities[idx];
      let vy = velocities[idx + 1];
      let vz = velocities[idx + 2];

      const dx = px - worldCursor.x;
      const dy = py - worldCursor.y;
      const dz = pz - worldCursor.z;
      const distSq = dx * dx + dy * dy + dz * dz;

      let fx = 0, fy = 0, fz = 0;
      let proximityRatio = 0;

      if (distSq < repulsionRadiusSq && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        proximityRatio = 1 - dist / repulsionRadius;
        const force = proximityRatio * proximityRatio * repulsionStrength;
        fx = (dx / dist) * force;
        fy = (dy / dist) * force;
        fz = (dz / dist) * force;
      }

      // Hooke's Law Spring Force towards default anchor
      const springFx = (ax - px) * springStiffness;
      const springFy = (ay - py) * springStiffness;
      const springFz = (az - pz) * springStiffness;

      // Dampening Force
      const dampFx = vx * damping;
      const dampFy = vy * damping;
      const dampFz = vz * damping;

      // Integration: Acceleration -> Velocity -> Position
      const ax_tot = fx + springFx - dampFx;
      const ay_tot = fy + springFy - dampFy;
      const az_tot = fz + springFz - dampFz;

      vx += ax_tot * dt;
      vy += ay_tot * dt;
      vz += az_tot * dt;

      px += vx * dt;
      py += vy * dt;
      pz += vz * dt;

      posArray[idx] = px;
      posArray[idx + 1] = py;
      posArray[idx + 2] = pz;

      velocities[idx] = vx;
      velocities[idx + 1] = vy;
      velocities[idx + 2] = vz;

      // Dynamic color brightening when displaced near cursor
      const br = baseColors[idx];
      const bg = baseColors[idx + 1];
      const bb = baseColors[idx + 2];

      colArray[idx] = THREE.MathUtils.lerp(br, 1.0, proximityRatio * 0.9);
      colArray[idx + 1] = THREE.MathUtils.lerp(bg, 1.0, proximityRatio * 0.9);
      colArray[idx + 2] = THREE.MathUtils.lerp(bb, 1.0, proximityRatio * 0.9);
    }

    if (pointsRef.current?.geometry) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }

    // Dynamic Connection Lines (Web-Breaking / Hive Displacement Effect)
    if (linesRef.current?.geometry) {
      const linePosArray = linesRef.current.geometry.attributes.position.array;
      const lineColArray = linesRef.current.geometry.attributes.color.array;

      let lineVertIdx = 0;
      const totalPairs = candidatePairs.length / 2;
      const maxStretchDistSq = 3.2 * 3.2;

      for (let p = 0; p < totalPairs; p++) {
        const i = candidatePairs[p * 2];
        const j = candidatePairs[p * 2 + 1];

        const idxI = i * 3;
        const idxJ = j * 3;

        const xi = posArray[idxI];
        const yi = posArray[idxI + 1];
        const zi = posArray[idxI + 2];

        const xj = posArray[idxJ];
        const yj = posArray[idxJ + 1];
        const zj = posArray[idxJ + 2];

        const dx = xi - xj;
        const dy = yi - yj;
        const dz = zi - zj;
        const dSq = dx * dx + dy * dy + dz * dz;

        if (dSq < maxStretchDistSq) {
          linePosArray[lineVertIdx] = xi;
          linePosArray[lineVertIdx + 1] = yi;
          linePosArray[lineVertIdx + 2] = zi;

          linePosArray[lineVertIdx + 3] = xj;
          linePosArray[lineVertIdx + 4] = yj;
          linePosArray[lineVertIdx + 5] = zj;

          // As particles disperse away, lines stretch and fade out
          const dist = Math.sqrt(dSq);
          const fadeFactor = Math.max(0, 1 - dist / 3.2);

          const crI = colArray[idxI] * fadeFactor * 0.35;
          const cgI = colArray[idxI + 1] * fadeFactor * 0.35;
          const cbI = colArray[idxI + 2] * fadeFactor * 0.35;

          const crJ = colArray[idxJ] * fadeFactor * 0.35;
          const cgJ = colArray[idxJ + 1] * fadeFactor * 0.35;
          const cbJ = colArray[idxJ + 2] * fadeFactor * 0.35;

          lineColArray[lineVertIdx] = crI;
          lineColArray[lineVertIdx + 1] = cgI;
          lineColArray[lineVertIdx + 2] = cbI;

          lineColArray[lineVertIdx + 3] = crJ;
          lineColArray[lineVertIdx + 4] = cgJ;
          lineColArray[lineVertIdx + 5] = cbJ;

          lineVertIdx += 6;
        }
      }

      linesRef.current.geometry.setDrawRange(0, lineVertIdx / 3);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Node Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={nodeCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Interconnected Web Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

/**
 * Central Glowing Interactive Hive Sphere
 * Features:
 * - Glowing hexagonal outer wireframe shell
 * - Inner rotating core with breathing idle animation
 * - Dual counter-rotating orbital energy rings
 * - Smooth lerping rotation tracking mouse movement
 * - High-density golden-ratio particle halo
 */
const CentralSphere = () => {
  const groupRef = useRef();
  const pointsGeometryRef = useRef();
  const linesGeometryRef = useRef();
  const meshRef = useRef();
  const innerMeshRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  const [hovered, setHovered] = useState(false);
  const particleCount = 1200;

  // Golden ratio sphere layout for central sphere halo
  const { positions, basePositions, velocities, colors, baseColors, candidatePairs } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const basePos = new Float32Array(particleCount * 3);
    const vels = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const baseCols = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color('#00f3ff');
    const purpleColor = new THREE.Color('#9d4edd');
    const goldColor = new THREE.Color('#ffb703');

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const r = 2.6 + Math.random() * 0.55;

      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;

      vels[i * 3] = 0;
      vels[i * 3 + 1] = 0;
      vels[i * 3 + 2] = 0;

      let mixedColor = cyanColor;
      const rand = Math.random();
      if (rand > 0.55) mixedColor = purpleColor;
      if (rand > 0.88) mixedColor = goldColor;

      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;

      baseCols[i * 3] = mixedColor.r;
      baseCols[i * 3 + 1] = mixedColor.g;
      baseCols[i * 3 + 2] = mixedColor.b;
    }

    const pairs = [];
    const maxConnectDistSq = 0.8 * 0.8;
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = basePos[i * 3] - basePos[j * 3];
        const dy = basePos[i * 3 + 1] - basePos[j * 3 + 1];
        const dz = basePos[i * 3 + 2] - basePos[j * 3 + 2];
        const dSq = dx * dx + dy * dy + dz * dz;
        if (dSq < maxConnectDistSq) {
          pairs.push(i, j);
          if (pairs.length >= 1000 * 2) break;
        }
      }
      if (pairs.length >= 1000 * 2) break;
    }

    return {
      positions: pos,
      basePositions: basePos,
      velocities: vels,
      colors: cols,
      baseColors: baseCols,
      candidatePairs: new Uint16Array(pairs),
    };
  }, [particleCount]);

  const { linePositions, lineColors } = useMemo(() => {
    const totalLines = candidatePairs.length / 2;
    return {
      linePositions: new Float32Array(totalLines * 2 * 3),
      lineColors: new Float32Array(totalLines * 2 * 3),
    };
  }, [candidatePairs]);

  const cursorPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const worldCursor = useMemo(() => new THREE.Vector3(), []);
  const localCursor = useMemo(() => new THREE.Vector3(), []);
  const currentRotation = useRef({ x: 0, y: 0 });
  const currentScale = useRef(1.1);

  useFrame((state, delta) => {
    const pointer = state.pointer;
    const clock = state.clock.getElapsedTime();
    const dt = Math.min(delta, 0.033);

    state.raycaster.setFromCamera(pointer, state.camera);
    const intersected = state.raycaster.ray.intersectPlane(cursorPlane, worldCursor);

    if (intersected && groupRef.current) {
      localCursor.copy(worldCursor);
      groupRef.current.worldToLocal(localCursor);
    } else {
      localCursor.set(1000, 1000, 1000);
    }

    // Sphere Halo Local Dispersion Physics
    const forceRadius = 2.2;
    const forceRadiusSq = forceRadius * forceRadius;
    const repulsionStrength = 20.0;
    const springStiffness = 9.0;
    const damping = 5.0;

    const posArray = pointsGeometryRef.current?.attributes.position.array || positions;
    const colArray = pointsGeometryRef.current?.attributes.color.array || colors;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      let px = posArray[idx];
      let py = posArray[idx + 1];
      let pz = posArray[idx + 2];

      const ax = basePositions[idx];
      const ay = basePositions[idx + 1];
      const az = basePositions[idx + 2];

      let vx = velocities[idx];
      let vy = velocities[idx + 1];
      let vz = velocities[idx + 2];

      const dx = px - localCursor.x;
      const dy = py - localCursor.y;
      const dz = pz - localCursor.z;
      const distSq = dx * dx + dy * dy + dz * dz;

      let fx = 0, fy = 0, fz = 0;
      let proximityRatio = 0;

      if (distSq < forceRadiusSq && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        proximityRatio = 1 - dist / forceRadius;
        const force = proximityRatio * proximityRatio * repulsionStrength;
        fx = (dx / dist) * force;
        fy = (dy / dist) * force;
        fz = (dz / dist) * force;
      }

      const springFx = (ax - px) * springStiffness;
      const springFy = (ay - py) * springStiffness;
      const springFz = (az - pz) * springStiffness;

      const dampFx = vx * damping;
      const dampFy = vy * damping;
      const dampFz = vz * damping;

      const ax_tot = fx + springFx - dampFx;
      const ay_tot = fy + springFy - dampFy;
      const az_tot = fz + springFz - dampFz;

      vx += ax_tot * dt;
      vy += ay_tot * dt;
      vz += az_tot * dt;

      px += vx * dt;
      py += vy * dt;
      pz += vz * dt;

      posArray[idx] = px;
      posArray[idx + 1] = py;
      posArray[idx + 2] = pz;

      velocities[idx] = vx;
      velocities[idx + 1] = vy;
      velocities[idx + 2] = vz;

      const br = baseColors[idx];
      const bg = baseColors[idx + 1];
      const bb = baseColors[idx + 2];

      colArray[idx] = THREE.MathUtils.lerp(br, 1.0, proximityRatio * 0.8);
      colArray[idx + 1] = THREE.MathUtils.lerp(bg, 1.0, proximityRatio * 0.8);
      colArray[idx + 2] = THREE.MathUtils.lerp(bb, 1.0, proximityRatio * 0.8);
    }

    if (pointsGeometryRef.current) {
      pointsGeometryRef.current.attributes.position.needsUpdate = true;
      pointsGeometryRef.current.attributes.color.needsUpdate = true;
    }

    // Dynamic Line Segments
    if (linesGeometryRef.current) {
      const linePosArray = linesGeometryRef.current.attributes.position.array;
      const lineColArray = linesGeometryRef.current.attributes.color.array;

      let lineVertIdx = 0;
      const totalPairs = candidatePairs.length / 2;

      for (let p = 0; p < totalPairs; p++) {
        const i = candidatePairs[p * 2];
        const j = candidatePairs[p * 2 + 1];

        const idxI = i * 3;
        const idxJ = j * 3;

        const xi = posArray[idxI];
        const yi = posArray[idxI + 1];
        const zi = posArray[idxI + 2];

        const xj = posArray[idxJ];
        const yj = posArray[idxJ + 1];
        const zj = posArray[idxJ + 2];

        const dx = xi - xj;
        const dy = yi - yj;
        const dz = zi - zj;
        const dSq = dx * dx + dy * dy + dz * dz;

        if (dSq < 1.3) {
          linePosArray[lineVertIdx] = xi;
          linePosArray[lineVertIdx + 1] = yi;
          linePosArray[lineVertIdx + 2] = zi;

          linePosArray[lineVertIdx + 3] = xj;
          linePosArray[lineVertIdx + 4] = yj;
          linePosArray[lineVertIdx + 5] = zj;

          const alphaFactor = Math.max(0, 1 - Math.sqrt(dSq) / 1.14);
          const crI = colArray[idxI] * alphaFactor * 0.65;
          const cgI = colArray[idxI + 1] * alphaFactor * 0.65;
          const cbI = colArray[idxI + 2] * alphaFactor * 0.65;

          const crJ = colArray[idxJ] * alphaFactor * 0.65;
          const cgJ = colArray[idxJ + 1] * alphaFactor * 0.65;
          const cbJ = colArray[idxJ + 2] * alphaFactor * 0.65;

          lineColArray[lineVertIdx] = crI;
          lineColArray[lineVertIdx + 1] = cgI;
          lineColArray[lineVertIdx + 2] = cbI;

          lineColArray[lineVertIdx + 3] = crJ;
          lineColArray[lineVertIdx + 4] = cgJ;
          lineColArray[lineVertIdx + 5] = cbJ;

          lineVertIdx += 6;
        }
      }

      linesGeometryRef.current.setDrawRange(0, lineVertIdx / 3);
      linesGeometryRef.current.attributes.position.needsUpdate = true;
      linesGeometryRef.current.attributes.color.needsUpdate = true;
    }

    // Linear Interpolation (lerp) Cursor Rotation & Idle Floating Breathing
    const targetRotX = -pointer.y * 0.45;
    const targetRotY = pointer.x * 0.55;
    const lerpFactor = delta * 4;

    currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetRotX, lerpFactor);
    currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetRotY, lerpFactor);

    const targetScale = hovered ? 1.22 : 1.08;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, delta * 5);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(currentScale.current);
      groupRef.current.rotation.x = currentRotation.current.x;
      groupRef.current.rotation.y += delta * (hovered ? 0.38 : 0.14) + currentRotation.current.y * 0.04;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * (hovered ? 0.35 : 0.12);
      meshRef.current.rotation.z += delta * 0.06;
      meshRef.current.material.emissiveIntensity = hovered ? 1.2 : 0.55 + Math.sin(clock * 2) * 0.15;
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x += delta * 0.3;
      innerMeshRef.current.rotation.y += delta * 0.2;
      const innerScale = 1.35 + Math.sin(clock * 3) * 0.08;
      innerMeshRef.current.scale.setScalar(innerScale);
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.x = Math.PI / 3;
      ringRef1.current.rotation.z += delta * (hovered ? 0.5 : 0.25);
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.x = -Math.PI / 4;
      ringRef2.current.rotation.z -= delta * (hovered ? 0.45 : 0.2);
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.5}>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Point Cloud Sphere Halo */}
        <points>
          <bufferGeometry ref={pointsGeometryRef}>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={particleCount}
              array={colors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={hovered ? 0.075 : 0.058}
            vertexColors
            transparent
            opacity={0.92}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>

        {/* Sphere Connections */}
        <lineSegments>
          <bufferGeometry ref={linesGeometryRef}>
            <bufferAttribute
              attach="attributes-position"
              count={linePositions.length / 3}
              array={linePositions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={lineColors.length / 3}
              array={lineColors}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={hovered ? 0.65 : 0.45}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* Wireframe Hexagonal Outer Shell */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.5, 2]} />
          <meshStandardMaterial
            wireframe
            color="#00f3ff"
            emissive="#00f3ff"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Glowing Core */}
        <mesh ref={innerMeshRef}>
          <dodecahedronGeometry args={[1.0, 0]} />
          <meshStandardMaterial
            color="#9d4edd"
            emissive="#9d4edd"
            emissiveIntensity={0.9}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Orbital Ring 1 */}
        <mesh ref={ringRef1}>
          <torusGeometry args={[3.4, 0.018, 16, 100]} />
          <meshBasicMaterial color="#00f3ff" transparent opacity={hovered ? 0.85 : 0.6} />
        </mesh>

        {/* Orbital Ring 2 */}
        <mesh ref={ringRef2}>
          <torusGeometry args={[3.8, 0.015, 16, 100]} />
          <meshBasicMaterial color="#9d4edd" transparent opacity={hovered ? 0.8 : 0.5} />
        </mesh>

        {/* Drei Sparkles Halo */}
        <Sparkles
          count={120}
          scale={7}
          size={hovered ? 4 : 2.5}
          speed={0.4}
          opacity={0.7}
          color="#00f3ff"
        />
      </group>
    </Float>
  );
};

/**
 * Combined HiveSphere Composition
 * Integrates both the central interactive sphere and full-screen cursor-dispersing particle node field.
 */
export const HiveSphere = () => {
  return (
    <group>
      <NodeParticleField />
      <CentralSphere />
    </group>
  );
};

export default HiveSphere;
