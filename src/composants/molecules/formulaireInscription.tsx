import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/connexionUtilisateur.css";
import FormulaireInscription2 from "./formulaireInscription2";
import FormulaireInscription3 from "./formulaireInscription3";

const FormulaireInscription: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const [pseudo, setPseudo] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [roleWish, setRoleWish] = useState<string>("visiteur");
  const [desiredGames, setDesiredGames] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [skipBackendChecks, setSkipBackendChecks] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [sex, setSex] = useState<string>("non precise");
  const [desiredTeam, setDesiredTeam] = useState<string>("League Of Legend");
  const [teamRole, setTeamRole] = useState<string>("joueur");

  const [error, setError] = useState<string | null>(null);

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

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

  const validateStep2 = () => {
    if (!roleWish) {
      setError("Le rôle souhaité est requis.");
      return false;
    }
    if ((roleWish === "joueur" || roleWish === "coach") && !desiredGames) {
      setError(
        "Veuillez choisir un jeu si vous souhaitez être joueur ou coach."
      );
      return false;
    }
    setError(null);
    return true;
  };

  const validateStep3 = () => {
    if (!firstName.trim()) {
      setError("Le prénom est requis.");
      return false;
    }
    if (!lastName.trim()) {
      setError("Le nom est requis.");
      return false;
    }
    if (!sex) {
      setError("Le sexe est requis.");
      return false;
    }
    if (!desiredTeam) {
      setError("L'équipe souhaitée est requise.");
      return false;
    }
    if (desiredTeam && !teamRole) {
      setError("Le rôle dans l'équipe est requis.");
      return false;
    }
    setError(null);
    return true;
  };

  const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  const navigate = useNavigate();

  /*
   * inscription étape 1 c'est a dire création du compte
   */
  const handleNextFromStep1 = async () => {
    console.log("handleNextFromStep1 called");
    console.log({ pseudo, email, password, dateOfBirth });
    console.log(API_URL);
    if (!validateStep1()) return;
    if (skipBackendChecks) {
      setError(null);
      next();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pseudo,
          email,
          password,
          date_naissance: dateOfBirth,
        }),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      console.log({ res, data });
      if (data?.token) {
        setError("Compte créé avec succès.");
        next();
        return;
      } else {
        setError(data?.message ?? "autre erreur");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau lors de la vérification.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextFromStep2 = async (selectedGame?: string) => {
    if (!validateStep2()) return;
    if (selectedGame) {
      setDesiredGames(selectedGame);
      setDesiredTeam(`${selectedGame} — Équipe 1`);
    }
    if (roleWish === "visiteur") {
      if (skipBackendChecks) {
        setSuccess(
          "Inscription effectuée (mode test). Vous pouvez vous connecter."
        );
        setTimeout(() => navigate("/connexion"), 800);
        return;
      }
      setLoading(true);
      try {
        const payload: unknown = {
          username: pseudo || email,
          email,
          password,
          role: "visiteur",
        };
        const res = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setSuccess("Inscription effectuée. Vous pouvez vous connecter.");
          setTimeout(() => navigate("/connexion"), 800);
          return;
        } else {
          setError(data?.message ?? `Erreur (${res.status})`);
        }
      } catch (err) {
        console.error(err);
        setError("Erreur réseau lors de l'inscription.");
      } finally {
        setLoading(false);
      }
      return;
    }
    next();
  };

  const handleFinalSubmit = async () => {
    if (!validateStep3()) return;
    const payload: unknown = {
      username: pseudo || email,
      email,
      password,
      role: roleWish,
      firstName,
      lastName,
      dateOfBirth,
      sex,
      games: desiredGames ? [desiredGames] : [],
      desiredTeam,
      teamRole,
    };
    if (skipBackendChecks) {
      setSuccess(
        "Inscription réussie (mode test). Vous pouvez vous connecter."
      );
      setTimeout(() => navigate("/connexion"), 800);
      return;
    }
    setLoading(true);
    try {
      // submit to backend
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSuccess("Inscription réussie. Vous pouvez vous connecter.");
        setTimeout(() => navigate("/connexion"), 800);
      } else {
        setError(data?.message ?? `Erreur (${res.status})`);
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "0.5rem" }}>
        <label style={{ fontSize: "0.9rem" }}>
          <input
            type="checkbox"
            checked={skipBackendChecks}
            onChange={(e) => setSkipBackendChecks(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
          />{" "}
          Bypass backend checks (mode test)
        </label>
      </div>
      {success && (
        <output
          className="form-success"
          aria-live="polite"
          style={{ color: "#b8ffbf", marginBottom: "0.5rem" }}
        >
          {success}
        </output>
      )}
      {step === 1 && (
        <form
          className="formulaire-creation"
          onSubmit={(e) => {
            e.preventDefault();
            handleNextFromStep1();
          }}
        >
          <h2>Créer ton compte — Étape 1</h2>

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
            <button type="submit" className="btn-valider">
              Suivant
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <FormulaireInscription2
          roleWish={roleWish}
          setRoleWish={setRoleWish}
          desiredGames={desiredGames}
          setDesiredGames={setDesiredGames}
          onPrev={prev}
          onNext={handleNextFromStep2}
          loading={loading}
        />
      )}

      {step === 3 && (
        <FormulaireInscription3
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          sex={sex}
          setSex={setSex}
          desiredGames={desiredGames}
          setDesiredGames={setDesiredGames}
          desiredTeam={desiredTeam}
          setDesiredTeam={setDesiredTeam}
          teamRole={teamRole}
          setTeamRole={setTeamRole}
          onPrev={prev}
          onSubmit={() => {
            if (validateStep3()) handleFinalSubmit();
          }}
          loading={loading}
        />
      )}
    </div>
  );
};

export default FormulaireInscription;
