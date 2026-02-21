import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Heart, Star, Dot } from "./CardDecorations";

const FONT_URL = "/fonts/NotoSansTC.woff";

/**
 * The front cover of the card (outer face, visible when closed).
 *
 * Inside the pivot group (origin at spine x=-0.75 in world space).
 * Mesh offset +0.75 so it overlaps the back half when pivot rotation.y = 0.
 *
 * z-layering: front cover at z=0.02, decorations at z=0.025.
 * This sits well in front of the inside content (z=0~0.005).
 * Uses FrontSide so the depth buffer properly hides inside content.
 */
export function CardFrontCover() {
  return (
    <group position={[0.75, 0, 0]}>
      {/* Front cover plane */}
      <mesh position={[0, 0, 0.02]} renderOrder={1}>
        <planeGeometry args={[1.5, 2.1]} />
        <meshStandardMaterial
          color="#c0392b"
          roughness={0.7}
          metalness={0.05}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Border frame */}
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[1.36, 1.96]} />
        <meshStandardMaterial
          color="#a93226"
          roughness={0.8}
          metalness={0.02}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Inner decorative border */}
      <mesh position={[0, 0, 0.024]}>
        <planeGeometry args={[1.3, 1.9]} />
        <meshStandardMaterial
          color="#c0392b"
          roughness={0.7}
          metalness={0.05}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Title text — on the outer face */}
      <Text
        position={[0, 0.35, 0.028]}
        fontSize={0.22}
        color="#f9e79f"
        font={FONT_URL}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.1}
        textAlign="center"
      >
        {"\u751f\u65e5\u5feb\u6a02"}
      </Text>

      <Text
        position={[0, 0.05, 0.028]}
        fontSize={0.13}
        color="#fdebd0"
        font={FONT_URL}
        anchorX="center"
        anchorY="middle"
      >
        Happy Birthday
      </Text>

      {/* Decorations */}
      <Heart position={[0, -0.35, 0.028]} scale={0.22} color="#f5b7b1" />
      <Star position={[-0.45, 0.7, 0.028]} scale={0.1} color="#f9e79f" />
      <Star position={[0.45, 0.7, 0.028]} scale={0.08} color="#f9e79f" />
      <Star position={[-0.5, -0.7, 0.028]} scale={0.06} color="#fdebd0" />
      <Star position={[0.5, -0.7, 0.028]} scale={0.07} color="#fdebd0" />
      <Dot position={[-0.3, 0.75, 0.028]} scale={0.03} color="#f5b7b1" />
      <Dot position={[0.3, 0.75, 0.028]} scale={0.025} color="#f5b7b1" />
      <Dot position={[0.15, -0.75, 0.028]} scale={0.03} color="#fdebd0" />
      <Dot position={[-0.15, -0.75, 0.028]} scale={0.02} color="#f9e79f" />
    </group>
  );
}
