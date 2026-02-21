import * as THREE from "three";

/**
 * The back exterior of the card (visible from behind).
 * Centered at x=0. Faces -Z (away from camera).
 */
export function CardBack() {
  return (
    <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[1.5, 2.1]} />
      <meshStandardMaterial
        color="#922b21"
        roughness={0.8}
        metalness={0.02}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}
