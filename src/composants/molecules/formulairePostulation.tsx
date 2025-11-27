import React, { useEffect } from "react";
import "../styles/connexionUtilisateur.css";
import React, { useEffect, useState } from "react";
import "../pages/connexionUtilisateur.css";

type Props = {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  sex: string;
  setSex: (v: string) => void;
  roleWish: string;
  setRoleWish: (v: string) => void;
  desiredGames: string;
  setDesiredGames: (v: string) => void;
  desiredTeam: string;
  setDesiredTeam: (v: string) => void;
  teamRole: string;
  setTeamRole: (v: string) => void;
  onSubmit: () => void;
  loading?: boolean;
};
   // base API pour récupérer les jeux + équipes
  const EQUIPE_API_BASE =
    (import.meta.env.VITE_BACKEND_LINK ?? "https://backend-vamd-corp.onrender.com") +
    "/api/equipeInscryption";
    
const FormulairePostulation: React.FC<Props> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  sex,
  setSex,
  roleWish,
  setRoleWish,
  desiredGames,
  setDesiredGames,
  desiredTeam,
  setDesiredTeam,
  teamRole,
  setTeamRole,
  onSubmit,
  loading,
}) => {
  useEffect(() => {
    const game = desiredGames || desiredTeam?.split(" — ")[0];
    if (game === "League Of Legend") {
      if (!teamRole || teamRole === "joueur") setTeamRole("Top");
    } else if (game === "Valorant") {
      if (!teamRole || teamRole === "joueur") setTeamRole("Duelist");
    } else {
      setTeamRole("joueur");
    }
  }, [desiredGames, desiredTeam, teamRole, setTeamRole]);
  // états pour la récupération des équipes réelles
  const [teamsByGame, setTeamsByGame] = useState<Record<string, string[]>>({});
  const [teamsLoading, setTeamsLoading] = useState(false);
  const [teamsError, setTeamsError] = useState<string | null>(null);

  const formatGameLabel = (key: string) => {
    if (!key) return key;
    const k = key.toUpperCase();
    if (k.includes("LEAGUE")) return "League Of Legend";
    if (k.includes("VALORANT")) return "Valorant";
    if (k.includes("FORTNITE")) return "Fortnite";
    return key;
  };

  // récupérer la liste jeux -> équipes depuis le backend
  useEffect(() => {
    let mounted = true;
    (async () => {
      setTeamsLoading(true);
      try {
        const res = await fetch(`${EQUIPE_API_BASE}/nameTeamAndGame`, {
          method: "GET",
          credentials: "include",
        });
        if (!mounted) return;
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          setTeamsError(`Erreur (${res.status}): ${txt}`);
          setTeamsLoading(false);
          return;
        }
        const data: Record<string, string[]> = await res.json().catch(() => ({}));
        // transforme les clés backend en libellés lisibles
        console.log(data)
        const mapped: Record<string, string[]> = {};
        for (const key of Object.keys(data || {})) {
          const label = formatGameLabel(key);
          mapped[label] = data[key];
        }
        setTeamsByGame(mapped);
        // si aucun jeu sélectionné, préselectionner le premier available
        if (!desiredGames) {
          const first = Object.keys(mapped)[0];
          if (first) setDesiredGames(first);
        }
      } catch (err) {
        if (!mounted) return;
        const message = err instanceof Error ? err.message : String(err);
        setTeamsError(message ?? "Erreur réseau");
      } finally {
        if (mounted) setTeamsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [desiredGames, setDesiredGames]);
  useEffect(() => {
    const role = roleWish;
    if (role === "coach") {
      setTeamRole("coach");
      setDesiredTeam("");
    }
  }, [roleWish, setTeamRole, setDesiredTeam]);

  return (
    <form
      className="formulaire-creation"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h2>Postules pour rejoindre l'équipe de tes rêves </h2>

      <label htmlFor="firstName">Prénom</label>
      <input
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label htmlFor="lastName">Nom</label>
      <input
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <label htmlFor="sex">Sexe</label>
      <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
        <option value="homme">Homme</option>
        <option value="femme">Femme</option>
        <option value="non precise">Non précisé</option>
        <option value="autre">Autre</option>
      </select>
      <label htmlFor="roleWish">Rôle souhaité</label>
      <select
        id="roleWish"
        value={roleWish}
        onChange={(e) => setRoleWish(e.target.value)}
      >
        <option value="joueur">Joueur</option>
        <option value="coach">Coach</option>
      </select>

      <label htmlFor="desiredGames">Jeu souhaité</label>
      <select
        id="desiredGames"
        value={desiredGames}
        onChange={(e) => setDesiredGames(e.target.value)}
      >
        <option value="">-- Choisir un jeu --</option>
        <option value="League Of Legend">League Of Legend</option>
        <option value="Fortnite">Fortnite</option>
        <option value="Valorant">Valorant</option>
        <option value="Fifa">Fifa</option>
      </select>
      <label htmlFor="desiredGames">
            Jeu souhaité
          </label>
          <select
            id="desiredGames"
            value={desiredGames}
            onChange={(e) => setDesiredGames(e.target.value)}
          >
            <option value="">-- Choisir un jeu --</option>
            {teamsLoading && <option disabled>Chargement...</option>}
            {teamsError && <option disabled>{teamsError}</option>}
            {Object.keys(teamsByGame).map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

      <label htmlFor="desiredTeam">Équipe souhaitée (choix par jeu)</label>
      {roleWish === "coach" ? (
        <input id="desiredTeam" value="" readOnly />
      ) : (
        <select
          id="desiredTeam"
          value={desiredTeam}
          onChange={(e) => setDesiredTeam(e.target.value)}
        >
          {(() => {
            const game =
              desiredGames ||
              desiredTeam?.split(" — ")[0] ||
              "League Of Legend";
            return [1, 2, 3, 4].map((n) => (
              <option
                key={n}
                value={`${game} — Équipe ${n}`}
              >{`${game} — Équipe ${n}`}</option>
            ));
          })()}
            {(() => {
              const selectedGame = desiredGames || desiredTeam?.split(" — ")[0];
              const teamsForGame = selectedGame ? teamsByGame[selectedGame] || [] : [];
              if (teamsLoading) return <option disabled>Chargement équipes...</option>;
              if (teamsError) return <option disabled>{teamsError}</option>;
              if (teamsForGame.length > 0) {
                return teamsForGame.map((t) => (
                  <option key={t} value={`${selectedGame} — ${t}`}>
                    {`${selectedGame} — ${t}`}
                  </option>
                ));
              }
              const game = selectedGame || "League Of Legend";
              return (
                <option value={`${game} — Aucune équipe disponible`} disabled>
                  {`${game} — Aucune équipe disponible`}
                </option>
              );
            })()}
        </select>
      )}

      <label htmlFor="teamRole">Rôle dans l'équipe (si applicable)</label>
      {(() => {
        if (roleWish === "coach") {
          return <input id="teamRole" value="coach" readOnly />;
        }
        const game = desiredGames || desiredTeam?.split(" — ")[0];
        if (game === "League Of Legend") {
          return (
            <select
              id="teamRole"
              value={teamRole}
              onChange={(e) => setTeamRole(e.target.value)}
            >
              <option value="Top">Top</option>
              <option value="Middle">Middle</option>
              <option value="Jungle">Jungle</option>
              <option value="Support">Support</option>
              <option value="ADC">ADC</option>
            </select>
          );
        }
        if (game === "Valorant") {
          return (
            <select
              id="teamRole"
              value={teamRole}
              onChange={(e) => setTeamRole(e.target.value)}
            >
              <option value="Duelist">Duelist</option>
              <option value="Sentinel">Sentinel</option>
              <option value="Initiator">Initiator</option>
              <option value="Controller">Controller</option>
            </select>
          );
        }
        return <input id="teamRole" value={teamRole || "joueur"} readOnly />;
      })()}

      {/* maintenir la synchronisation des valeurs par défaut de teamRole lorsque desiredTeam change (géré dans le useEffect ci-dessus) */}

      <div className="form-actions">
        <button type="submit" className="btn-valider" disabled={!!loading}>
          {"Terminer"}
        </button>
      </div>
    </form>
  );
};

export default FormulairePostulation;
