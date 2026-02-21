import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { PasswordModal } from "./components/PasswordModal";
import { useCardAnimation } from "./hooks/useCardAnimation";
import "./App.css";

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { pivotRef, toggle, isOpen } = useCardAnimation();

  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }} shadows>
        <Scene pivotRef={pivotRef} isOpen={isOpen} />
      </Canvas>

      {!isUnlocked ? (
        <PasswordModal onUnlock={() => setIsUnlocked(true)} />
      ) : (
        <button
          type="button"
          className="open-button"
          onClick={toggle}
        >
          {isOpen ? "\u95dc\u9589\u8cc0\u5361" : "\u958b\u555f\u8cc0\u5361"}
        </button>
      )}
    </div>
  );
}

export default App;
