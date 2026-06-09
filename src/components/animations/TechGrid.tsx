"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GridPoints() {
  const count = 50;
  const sep = 2;
  const points = useMemo(() => {
    const positions = new Float32Array(count * count * 3);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const x = (i - count / 2) * sep;
        const z = (j - count / 2) * sep;
        const y = 0;
        positions.set([x, y, z], (i * count + j) * 3);
      }
    }
    return positions;
  }, []);

  const meshRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          const index = (i * count + j) * 3;
          const x = positions[index];
          const z = positions[index + 2];
          // Wave effect
          positions[index + 1] = Math.sin(x * 0.2 + time) + Math.cos(z * 0.2 + time);
        }
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00f2ff"
        size={0.05}
        sizeAttenuation={true}
        transparent
        opacity={0.5}
      />
    </points>
  );
}

export function TechGrid() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0 -z-10 bg-black" />;

  return (
    <div className="absolute inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 10, 20], fov: 75 }}>
        <fog attach="fog" args={["#000", 10, 50]} />
        <ambientLight intensity={0.5} />
        <GridPoints />
      </Canvas>
    </div>
  );
}
