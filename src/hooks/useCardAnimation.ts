import { useRef, useCallback, useState } from "react";
import gsap from "gsap";
import type { Group } from "three";

interface CardAnimationReturn {
  pivotRef: React.RefObject<Group | null>;
  toggle: () => void;
  isOpen: boolean;
}

export function useCardAnimation(): CardAnimationReturn {
  const pivotRef = useRef<Group | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const toggle = useCallback(() => {
    const pivot = pivotRef.current;
    if (!pivot) return;

    // Kill any in-flight animation
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const targetY = isOpen ? 0 : -Math.PI;

    const tl = gsap.timeline({
      onComplete() {
        setIsOpen((prev) => !prev);
      },
    });

    tl.to(pivot.rotation, {
      y: targetY,
      duration: 1.4,
      ease: "power3.inOut",
    });

    timelineRef.current = tl;
  }, [isOpen]);

  return { pivotRef, toggle, isOpen };
}
