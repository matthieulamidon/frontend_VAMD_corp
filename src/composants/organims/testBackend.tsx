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

  const API_URL = " https://backend-vamd-corp.onrender.com/api/auth"; // adapte selon ton backend

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
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // backend utilise email pour login
        credentials: "include",
      });
      const data = await res.json();
      setMessage(data.message || "Connexion réussie !");
      if (data.user) setUserInfo(data.user);
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
