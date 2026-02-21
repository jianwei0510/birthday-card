import type { Group } from "three";
import { CardFrontCover } from "./CardFrontCover";
import { CardInsideLeft } from "./CardInsideLeft";
import { CardBack } from "./CardBack";
import { CardInsideRight } from "./CardInsideRight";

interface BirthdayCardProps {
  pivotRef: React.RefObject<Group | null>;
}

/**
 * Card geometry layout (top-down view, closed state):
 *
 *   Spine (fold)        Back half
 *   x = -0.75     centered at x = 0
 *       |         ┌───────────────┐
 *       |         │               │  x = +0.75
 *       |         │  (back face)  │
 *       |         │               │
 *       |         └───────────────┘
 *       |
 *   Pivot group at x = -0.75
 *   Front cover mesh offset +0.75 inside pivot
 *   → overlaps back half when rotation.y = 0
 *   → swings left when rotation.y = -PI (open)
 */
export function BirthdayCard({ pivotRef }: BirthdayCardProps) {
  return (
    <group>
      {/* Static back half — centered at x=0, spine at x=-0.75 */}
      <CardBack />
      <CardInsideRight />

      {/* Front cover pivot at the spine (left edge of back half) */}
      <group ref={pivotRef} position={[-0.75, 0, 0]}>
        {/* Front cover mesh offset so it overlaps back half when closed */}
        <CardFrontCover />
        <CardInsideLeft />
      </group>
    </group>
  );
}
