import { useMemo } from "react";
import * as THREE from "three";

/**
 * A 3D heart shape built with THREE.Shape bezier curves.
 */
export function Heart({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  color = "#e74c3c",
}: {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.3);
    s.bezierCurveTo(0, 0.5, -0.15, 0.6, -0.3, 0.6);
    s.bezierCurveTo(-0.55, 0.6, -0.55, 0.35, -0.55, 0.35);
    s.bezierCurveTo(-0.55, 0.2, -0.35, -0.05, 0, -0.3);
    s.bezierCurveTo(0.35, -0.05, 0.55, 0.2, 0.55, 0.35);
    s.bezierCurveTo(0.55, 0.35, 0.55, 0.6, 0.3, 0.6);
    s.bezierCurveTo(0.15, 0.6, 0, 0.5, 0, 0.3);
    return s;
  }, []);

  return (
    <mesh position={position} scale={scale}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
}

/**
 * A small decorative dot / circle.
 */
export function Dot({
  position = [0, 0, 0] as [number, number, number],
  scale = 0.05,
  color = "#f1c40f",
}: {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <mesh position={position} scale={scale}>
      <circleGeometry args={[1, 16]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
}

/**
 * A five-pointed star shape.
 */
export function Star({
  position = [0, 0, 0] as [number, number, number],
  scale = 0.12,
  color = "#f1c40f",
}: {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.4;
    const points = 5;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        s.moveTo(x, y);
      } else {
        s.lineTo(x, y);
      }
    }
    s.closePath();
    return s;
  }, []);

  return (
    <mesh position={position} scale={scale}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
}
