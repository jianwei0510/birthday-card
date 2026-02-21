import * as THREE from "three";
import { MessageText } from "./MessageText";
import { Dot, Heart } from "./CardDecorations";

/**
 * The inner face of the back half — the birthday message lives here.
 * Centered at x=0, faces +Z. Sits at z=0 (behind the front cover at z=0.02+).
 * Only visible when the front cover swings open.
 */
export function CardInsideRight() {
  return (
    <group position={[0, 0, 0]}>
      {/* Inside surface — faces +Z (toward camera), at z=0 */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.5, 2.1]} />
        <meshStandardMaterial
          color="#fdf2e9"
          roughness={0.9}
          metalness={0}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Birthday message — just slightly in front of surface */}
      <group position={[0, 0, 0.003]}>
        <MessageText />
      </group>

      {/* Corner decorations */}
      <Heart position={[0.5, -0.8, 0.004]} scale={0.1} color="#f5b7b1" />
      <Heart position={[-0.5, 0.8, 0.004]} scale={0.08} color="#fadbd8" />
      <Dot position={[0.45, 0.75, 0.004]} scale={0.02} color="#f5cba7" />
      <Dot position={[-0.45, -0.75, 0.004]} scale={0.025} color="#f5cba7" />
    </group>
  );
}
