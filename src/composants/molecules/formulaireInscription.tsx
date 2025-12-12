import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/connexionUtilisateur.css";
const FormulaireInscription: React.FC = () => {
  const [pseudo, setPseudo] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const API_URL =
    (import.meta.env.VITE_BACKEND_LINK ??
      "https://backend-vamd-corp.onrender.com") + "/api/auth";

  const validateStep1 = () => {
    if (!pseudo.trim()) {
      setError("Le pseudo est requis.");
      return false;
    }
    if (!dateOfBirth) {
      setError("La date de naissance est requise.");
      return false;
    }
    if (!email.trim()) {
      setError("L'adresse e-mail est requise.");
      return false;
    }
    if (!email.includes("@")) {
      setError("L'adresse e-mail doit contenir '@'.");
      return false;
    }
    if (!password || password.length <= 6) {
      setError("Le mot de passe doit contenir plus de 6 caractères.");
      return false;
    }
    setError(null);
    return true;
  };

  const navigate = useNavigate();

  /*
   * Créer le compte à la fin de ce formulaire. Rôle par défaut = 'visiteur'
   */
  const handleCreateAccount = async () => {
    if (!validateStep1()) return;

    setLoading(true);
    try {
      interface RegisterPayload {
        pseudo: string;
        email: string;
        password: string;
        role: string;
        date_naissance: string;
      }
      const payload: RegisterPayload = {
        // le backend attend 'pseudo' (voir testBackend.tsx), pas 'username'
        pseudo: pseudo || email,
        email,
        password,
        role: "visiteur",
        date_naissance: dateOfBirth,
      };
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 201) {
        setSuccess("Compte créé avec succès. Vous pouvez vous connecter.");
        setTimeout(() => navigate("/connexion"), 800);
        return;
      } else {
        setError(data?.message ?? `Erreur (${res.status})`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message ?? "Erreur réseau lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {success && (
        <output
          className="form-success"
          aria-live="polite"
          style={{ color: "#b8ffbf", marginBottom: "0.5rem" }}
        >
          {success}
        </output>
      )}
      <form
        className="formulaire-creation"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateAccount();
        }}
      >
        <h2>Créer ton compte</h2>

        {error && (
          <div
            className="form-error"
            role="alert"
            style={{ color: "#ffb4b4", marginBottom: "0.5rem" }}
          >
            {error}
          </div>
        )}

        <label htmlFor="pseudo">Pseudo</label>
        <input
          id="pseudo"
          name="pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />

        <label htmlFor="dateOfBirth">Date de naissance</label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        <label htmlFor="email">Adresse e-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="form-actions">
          <button type="submit" className="btn-valider" disabled={!!loading}>
            Créer mon compte
          </button>
        </div>
      </form>

      {/* Formulaire en une seule étape ; le flux post-inscription est géré ci-dessus */}
    </div>
  );
};

export default FormulaireInscription;
