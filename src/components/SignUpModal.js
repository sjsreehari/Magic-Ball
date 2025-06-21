import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignUpModal({ onClose }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal glass" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Sign Up / Sign In">
        <button className="settings-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="settings-title">{isSignIn ? "Sign In" : "Sign Up"}</div>
        <form className="settings-list" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="settings-item"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="settings-item"
          />
          {error && <div style={{ color: "#ef4444", fontSize: 14 }}>{error}</div>}
          <button type="submit" className="settings-item">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <button className="settings-item" onClick={handleGoogle} style={{ marginTop: 8 }}>
          Continue with Google
        </button>
        <button className="settings-item" onClick={() => setIsSignIn(s => !s)} style={{ marginTop: 8, fontSize: 13 }}>
          {isSignIn ? "Need an account? Sign Up" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
}
