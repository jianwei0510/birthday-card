import * as THREE from "three";
import { Dot, Star } from "./CardDecorations";

/**
 * The inner face of the front cover (revealed when the card opens).
 * Inside the pivot group, same offset as CardFrontCover (+0.75).
 * Faces -Z (the back side of the front cover plane).
 * Sits at z=0 (behind the front cover outer face at z=0.02).
 */
export function CardInsideLeft() {
  return (
    <group position={[0.75, 0, 0]}>
      {/* Inside surface — faces -Z */}
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.5, 2.1]} />
        <meshStandardMaterial
          color="#fdf2e9"
          roughness={0.9}
          metalness={0}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Subtle decorative accents (on the -Z side) */}
      <group position={[0, 0, -0.003]}>
        <Star position={[-0.4, 0.65, 0]} scale={0.06} color="#f5cba7" />
        <Star position={[0.45, -0.6, 0]} scale={0.05} color="#f5cba7" />
        <Dot position={[0.3, 0.7, 0]} scale={0.025} color="#fadbd8" />
        <Dot position={[-0.35, -0.65, 0]} scale={0.02} color="#fadbd8" />
        <Dot position={[0, 0.8, 0]} scale={0.018} color="#f5cba7" />
      </group>
    </group>
  );
}
