/*
 * c'est une page de test pour l'authentification avec JWT et cookies httpOnly
 * elle permet de tester toutes les fonctionnalités du backend facilement sans devoir créé 500 autres fichier de test
 */

import React, { useState } from "react";

interface UserInfo {
  id?: string;
  pseudo?: string;
  email?: string;
  date_naissance?: string;
  // add other fields as needed
}

const AuthPage: React.FC = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateNaissance, setDateNaissance] = useState(""); // YYYY-MM-DD
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const API_URL =
    import.meta.env.VITE_BACKEND_LINK + "/api/auth" ||
    "http://localhost:4000/api/auth";

  console.log("API_URL:", import.meta.env.VITE_BACKEND_LINK);

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pseudo,
          email,
          password,
          date_naissance: dateNaissance,
        }),
        credentials: "include",
      });
      const data = await res.json();
      setMessage(data.message || "Inscription réussie !");
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l'inscription");
    }
  };

  const handleLogin = async () => {
    try {
      console.log("Tentative de login avec :", { pseudo, password });
      const emailOrPseudo = pseudo; // backend accepte email ou pseudo
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPseudo, password }),
        credentials: "include",
      });
      const data = await res.json();
      setMessage(data.message || "Connexion réussie !");
      if (data.user) setUserInfo(data.user);

      // Vérification des cookies côté navigateur (non httpOnly)
      console.log("Cookies actuels :", document.cookie);
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors du login");
    }
  };

  const handleGetMe = async () => {
    try {
      const res = await fetch(`${API_URL}/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setUserInfo(data.user);
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("Erreur, non autorisé");
      setUserInfo(null);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Test Auth JWT + Cookie HTTP-only</h1>

      <div style={{ marginBottom: "0.5rem" }}>
        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "0.5rem" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "0.5rem" }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="date"
          placeholder="Date de naissance"
          value={dateNaissance}
          onChange={(e) => setDateNaissance(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleRegister} style={{ marginRight: "0.5rem" }}>
          Register
        </button>
        <button onClick={handleLogin} style={{ marginRight: "0.5rem" }}>
          Login
        </button>
        <button onClick={handleGetMe}>Get Me</button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <strong>Message:</strong> {message}
      </div>

      {userInfo && (
        <div style={{ marginTop: "1rem" }}>
          <strong>User Info:</strong>
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
