"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time / 4);
      meshRef.current.rotation.y = Math.sin(time / 2);
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        roughness={0}
        metalness={0.1}
        color="#ff2d55"
        emissive="#ff2d55"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export function LiquidGradient() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0 -z-10 bg-background" />;

  return (
    <div className="absolute inset-0 -z-10 bg-background">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} color="#fff" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#ff2d55" intensity={1.5} />
        <WaveMesh />
      </Canvas>
    </div>
  );
}
