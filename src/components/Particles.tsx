import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 60;

interface ParticleData {
  positions: Float32Array;
  velocities: Float32Array;
  colors: Float32Array;
  scales: Float32Array;
  lifetimes: Float32Array;
}

const COLORS = [
  new THREE.Color("#e74c3c"),
  new THREE.Color("#f1c40f"),
  new THREE.Color("#3498db"),
  new THREE.Color("#2ecc71"),
  new THREE.Color("#9b59b6"),
  new THREE.Color("#e67e22"),
  new THREE.Color("#1abc9c"),
];

function initParticle(data: ParticleData, i: number) {
  const i3 = i * 3;
  // Start near the card center
  data.positions[i3] = (Math.random() - 0.5) * 0.5;
  data.positions[i3 + 1] = (Math.random() - 0.5) * 0.3;
  data.positions[i3 + 2] = Math.random() * 0.5 + 0.2;

  // Random outward velocity
  data.velocities[i3] = (Math.random() - 0.5) * 2;
  data.velocities[i3 + 1] = Math.random() * 2 + 1;
  data.velocities[i3 + 2] = (Math.random() - 0.5) * 1.5;

  // Random color
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  data.colors[i3] = color.r;
  data.colors[i3 + 1] = color.g;
  data.colors[i3 + 2] = color.b;

  data.scales[i] = Math.random() * 0.04 + 0.015;
  data.lifetimes[i] = Math.random() * 0.3; // stagger start
}

/**
 * Confetti particles that burst upward when the card opens.
 */
export function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const data = useMemo<ParticleData>(() => {
    const d: ParticleData = {
      positions: new Float32Array(PARTICLE_COUNT * 3),
      velocities: new Float32Array(PARTICLE_COUNT * 3),
      colors: new Float32Array(PARTICLE_COUNT * 3),
      scales: new Float32Array(PARTICLE_COUNT),
      lifetimes: new Float32Array(PARTICLE_COUNT),
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      initParticle(d, i);
    }

    return d;
  }, []);

  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  useFrame((_state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      data.lifetimes[i] += delta;

      const t = data.lifetimes[i];
      if (t < 0) continue; // staggered start

      // Gravity
      data.velocities[i3 + 1] -= 2.5 * delta;

      // Update position
      data.positions[i3] += data.velocities[i3] * delta;
      data.positions[i3 + 1] += data.velocities[i3 + 1] * delta;
      data.positions[i3 + 2] += data.velocities[i3 + 2] * delta;

      // Fade out based on lifetime
      const opacity = Math.max(0, 1 - t / 3);
      const scale = data.scales[i] * opacity;

      tempMatrix.makeScale(scale, scale, scale);
      tempMatrix.setPosition(
        data.positions[i3],
        data.positions[i3 + 1],
        data.positions[i3 + 2],
      );
      mesh.setMatrixAt(i, tempMatrix);

      tempColor.setRGB(
        data.colors[i3],
        data.colors[i3 + 1],
        data.colors[i3 + 2],
      );
      mesh.setColorAt(i, tempColor);

      // Recycle particles that have fallen or faded
      if (t > 3 || data.positions[i3 + 1] < -3) {
        initParticle(data, i);
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial toneMapped={false} />
    </instancedMesh>
  );
}
