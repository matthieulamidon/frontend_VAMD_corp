import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "../pages//postulation.css";
import FormulairePostulation from "../molecules/formulairePostulation";

const BodyPostulation: React.FC = () => {

    const [roleWish, setRoleWish] = useState<string>("visiteur");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [sex, setSex] = useState<string>("non precise");
    const [desiredGames, setDesiredGames] = useState<string>("");
    const [desiredTeam, setDesiredTeam] = useState<string>("League Of Legend");
    const [teamRole, setTeamRole] = useState<string>("joueur");

    const [error, setError] = useState<string | null>(null);

    

    const API_URL =
    (import.meta.env.VITE_BACKEND_LINK ??
        "https://backend-vamd-corp.onrender.com") + "/api/auth";
    
    const validatePostulation = () => {
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
      const navigate = useNavigate();
    
      const handleFinalSubmit = async (selectedGame?: string) => {
    if (!validatePostulation()) return;
    const payload: unknown = {
      role: roleWish,
      firstName,
      lastName,
      sex,
      games: desiredGames ? [desiredGames] : [],
      desiredTeam,
      teamRole,
    };
    
    if (selectedGame) {
      setDesiredGames(selectedGame);
      setDesiredTeam(`${selectedGame} — Équipe 1`);
    }
    setLoading(true);
    try {
      // envoie au backend
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
        <div className="body-postulation">
        {success && <div className="form-success">{success}</div>}
        {error && <div className="form-error">{error}</div>}
          <FormulairePostulation
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          sex={sex}
          setSex={setSex}
          roleWish={roleWish}
          setRoleWish={setRoleWish}
          desiredGames={desiredGames}
          setDesiredGames={setDesiredGames}
          desiredTeam={desiredTeam}
          setDesiredTeam={setDesiredTeam}
          teamRole={teamRole}
          setTeamRole={setTeamRole}
          onSubmit={() => {
            if (validatePostulation()) handleFinalSubmit();
          }}
          loading={loading}
        />
        
        </div> 
    );
};

export default BodyPostulation;