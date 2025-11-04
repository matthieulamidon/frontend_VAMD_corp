import React, { useState } from "react";
import "../pages/connexionUtilisateur.css";

const FormulaireConnexion: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [pseudo, setPseudo] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const API_URL =
    (import.meta.env.VITE_BACKEND_LINK ??
      "https://backend-vamd-corp.onrender.com") + "/api/auth";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      alert(data.message || "Connexion réussie !");
      if (data.user) console.info(data.user);
    } catch (err) {
      console.error(err);
      alert("Erreur lors du login");
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: naviguer vers la page de récupération de mot de passe
    console.log("Mot de passe oublié cliqué");
  };

  return (
    <form
      className="formulaire-connection"
      onSubmit={handleSubmit}
      aria-label="Formulaire de connexion"
    >
      <h2>Connecte-toi à ton compte</h2>

      <label htmlFor="email">Adresse e-mail</label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="exemple@domaine.com"
      />
      <label htmlFor="pseudo">pseudo</label>
      <input
        id="pseudo"
        name="pseudo"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
      />

      <label htmlFor="password">Mot de passe</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Votre mot de passe"
      />

      <div className="form-actions">
        <button type="submit" className="btn-valider">
          Valider
        </button>
        <button
          type="button"
          className="btn-forgot"
          onClick={handleForgotPassword}
        >
          Mot de passe oublié
        </button>
      </div>
    </form>
  );
};

export default FormulaireConnexion;
