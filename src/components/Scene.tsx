import { Suspense } from "react";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import type { Group } from "three";
import { BirthdayCard } from "./BirthdayCard";
import { Particles } from "./Particles";

interface SceneProps {
  pivotRef: React.RefObject<Group | null>;
  isOpen: boolean;
}

export function Scene({ pivotRef, isOpen }: SceneProps) {
  return (
    <>
      {/* Background */}
      <color attach="background" args={["#1a1a2e"]} />

      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.6}
        color="#fff5e6"
        castShadow
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#e6f0ff" />
      <pointLight position={[0, 3, 3]} intensity={0.6} color="#ffeaa7" />

      {/* Environment for subtle reflections */}
      <Suspense fallback={null}>
        <Environment preset="apartment" />
      </Suspense>

      {/* Card */}
      <Suspense
        fallback={
          <mesh>
            <boxGeometry args={[1.5, 2.1, 0.05]} />
            <meshStandardMaterial color="#c0392b" />
          </mesh>
        }
      >
        <BirthdayCard pivotRef={pivotRef} />
      </Suspense>

      {/* Confetti when card is open */}
      {isOpen ? <Particles /> : null}

      {/* Ground shadow */}
      <ContactShadows
        position={[0, -1.15, 0]}
        opacity={0.35}
        blur={2.5}
        far={4}
      />

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
}
