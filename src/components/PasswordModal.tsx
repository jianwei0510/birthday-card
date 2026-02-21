import { useState, useCallback } from "react";

// TODO: Set the real password and hint for your friend!
const CARD_PASSWORD = "happy2024";
const HINT_TEXT = "\u63d0\u793a\uff1a\u8f38\u5165\u5c08\u5c6c\u5bc6\u78bc\u4f86\u958b\u555f\u8cc0\u5361";

interface PasswordModalProps {
  onUnlock: () => void;
}

export function PasswordModal({ onUnlock }: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (password === CARD_PASSWORD) {
        setError("");
        setFadingOut(true);
        // Wait for fade-out animation to complete
        setTimeout(() => {
          onUnlock();
        }, 500);
      } else {
        setError("\u5bc6\u78bc\u932f\u8aa4\uff0c\u8acb\u518d\u8a66\u4e00\u6b21");
        setShaking(true);
        setTimeout(() => {
          setShaking(false);
        }, 400);
      }
    },
    [password, onUnlock],
  );

  return (
    <div className={`modal-overlay ${fadingOut ? "fading-out" : ""}`}>
      <div className="modal-card">
        <h2>{"\u{1f382} \u751f\u65e5\u8cc0\u5361"}</h2>
        <p className="modal-hint">{HINT_TEXT}</p>
        <form className="modal-input-group" onSubmit={handleSubmit}>
          <input
            className={`modal-input ${shaking ? "shake" : ""}`}
            type="password"
            placeholder={"\u8acb\u8f38\u5165\u5bc6\u78bc"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            autoFocus
          />
          <button type="submit" className="modal-submit">
            {"\u958b\u555f\u8cc0\u5361"}
          </button>
        </form>
        <p className="modal-error">{error}</p>
      </div>
    </div>
  );
}
