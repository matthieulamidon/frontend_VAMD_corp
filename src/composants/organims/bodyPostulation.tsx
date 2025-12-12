import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import "../styles/postulation.css";
import FormulairePostulation from "../molecules/formulairePostulation";

const BodyPostulation: React.FC = () => {
  const navigate = useNavigate();

  const [roleWish, setRoleWish] = useState<string>("Joueur");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [sexe, setSexe] = useState<string>("non precise");
  const [desiredGames, setDesiredGames] = useState<string>("");
  const [desiredTeam, setDesiredTeam] = useState<string>("League Of Legend");
  const [teamRole, setTeamRole] = useState<string>("joueur");
  const [error, setError] = useState<string | null>(null);

  const API_URL =
    (import.meta.env.VITE_BACKEND_LINK ??
      "https://backend-vamd-corp.onrender.com") + "/api/equipeInscryption";

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/infoUserForComplete`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setFirstName(data.firstName || "");
          setLastName(data.name || "");
          setSexe(data.sexe || "non precise");
        } else {
          const data = await res.json().catch(() => ({}));
          console.error(data?.message ?? `Erreur (${res.status})`);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [API_URL]);

  const validatePostulation = () => {
    if (!firstName.trim()) {
      setError("Le prénom est requis.");
      return false;
    }
    if (!lastName.trim()) {
      setError("Le nom est requis.");
      return false;
    }
    if (!sexe) {
      setError("Le sexe est requis.");
      return false;
    }
    if (!roleWish) {
      setError("Le rôle souhaité est requis.");
      return false;
    }
    if ((roleWish === "joueur" || roleWish === "coach") && !desiredGames) {
      setError(
        "Veuillez choisir un jeu si vous postulez comme joueur ou coach."
      );
      return false;
    }
    if (roleWish === "joueur" && !desiredTeam) {
      setError("L'équipe souhaitée est requise.");
      return false;
    }
    if (roleWish === "joueur" && !teamRole) {
      setError("Le rôle dans l'équipe est requis.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleFinalSubmit = async () => {
    if (!validatePostulation()) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const profileRes = await fetch(`${API_URL}/completeProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lastName,
          firstName,
          sexe:
            sexe === "homme" ? "HOMME" : sexe === "femme" ? "FEMME" : "HOMME",
        }),
        credentials: "include",
      });
      console.log("Profile update response:", profileRes);

      if (!profileRes.ok) {
        const data = await profileRes.json().catch(() => ({}));
        throw new Error(
          data?.message ?? `Erreur profil (${profileRes.status})`
        );
      }

      console.log("Profile updated successfully.");
      console.log("Role Wish:", roleWish);

      let finalRes;
      if (roleWish === "coach") {
        finalRes = await fetch(`${API_URL}/inscriptionCoach`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nameGame: desiredGames }),
          credentials: "include",
        });
      } else if (roleWish === "Joueur") {
        console.log("Desired Team:", desiredTeam);
        const payload = {
          nameEquipe: desiredTeam,
          post: teamRole.toUpperCase(),
        };
        finalRes = await fetch(`${API_URL}/inscryptionEquipe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
      } else {
        setSuccess("Profil mis à jour !");
        setTimeout(() => navigate("/profil"), 2000);
        setLoading(false);
        return;
      }

      console.log("Final submission response:", finalRes);

      if (finalRes.status === 200) {
        setSuccess("Votre postulation a été enregistrée avec succès !");
        setTimeout(() => navigate("/profil"), 2000);
      } else if (finalRes) {
        const data = await finalRes.json().catch(() => ({}));
        throw new Error(
          data?.message ?? `Erreur postulation (${finalRes.status})`
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message ?? "Erreur réseau lors de la postulation.");
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
        sexe={sexe}
        setSexe={setSexe}
        roleWish={roleWish}
        setRoleWish={setRoleWish}
        desiredGames={desiredGames}
        setDesiredGames={setDesiredGames}
        desiredTeam={desiredTeam}
        setDesiredTeam={setDesiredTeam}
        teamRole={teamRole}
        setTeamRole={setTeamRole}
        onSubmit={handleFinalSubmit}
        loading={loading}
      />
    </div>
  );
};

export default BodyPostulation;
