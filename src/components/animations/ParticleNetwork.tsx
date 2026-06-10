"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 100, color = '#ffffff', opacity = 0.8 }) {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions.set(
        [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40],
        i * 3
      );
      velocities.set(
        [(Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05],
        i * 3
      );
    }
    return { positions, velocities };
  }, [count]);

  useFrame(() => {
    if (mesh.current) {
      const pos = mesh.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        pos[i3] += particles.velocities[i3];
        pos[i3 + 1] += particles.velocities[i3 + 1];
        pos[i3 + 2] += particles.velocities[i3 + 2];

        if (Math.abs(pos[i3]) > 20) particles.velocities[i3] *= -1;
        if (Math.abs(pos[i3 + 1]) > 20) particles.velocities[i3 + 1] *= -1;
        if (Math.abs(pos[i3 + 2]) > 20) particles.velocities[i3 + 2] *= -1;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
      mesh.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.15}
        sizeAttenuation={true}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleNetwork({ variant = 'dark' }: { variant?: 'light' | 'dark' }) {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = variant === 'light';

  if (!mounted) return <div className="absolute inset-0 -z-10" />;

  return (
    <div className={`absolute inset-0 -z-10 ${isLight ? 'bg-background' : 'bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]'}`}>
      <Canvas camera={{ position: [0, 0, 25], fov: 60 }}>
        <Particles count={200} color={isLight ? '#6366F1' : '#ffffff'} opacity={isLight ? 0.15 : 0.8} />
      </Canvas>
    </div>
  );
}
