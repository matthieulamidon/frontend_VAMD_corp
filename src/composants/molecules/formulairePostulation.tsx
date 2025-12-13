import React, { useEffect, useState } from "react";
import "../styles/connexionUtilisateur.css";

type Props = {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  sexe: string;
  setSexe: (v: string) => void;
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

const EQUIPE_API_BASE =
  (import.meta.env.VITE_BACKEND_LINK ??
    "https://backend-vamd-corp.onrender.com") + "/api/equipeInscryption";

const FormulairePostulation: React.FC<Props> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  sexe,
  setSexe,
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
  // --- ÉTATS LOCAUX ---
  const [teamsByGame, setTeamsByGame] = useState<Record<string, string[]>>({});
  const [teamsLoading, setTeamsLoading] = useState(false);
  //const [teamsError, setTeamsError] = useState<string | null>(null);

  // --- LOGIQUE 1 : VALEURS PAR DÉFAUT DES RÔLES ---
  // On ne change le rôle que si le JEU change, pour ne pas écraser le choix de l'utilisateur
  useEffect(() => {
    if (roleWish === "coach") return;

    if (desiredGames === "LEAGUEOFLEGENDES") {
      // Si le rôle actuel n'est pas valide pour LoL, on met Top par défaut
      if (
        !["TOPLANER", "MIDLANER", "BOTLANER", "JUNGLER", "SUPORT"].includes(
          teamRole
        )
      ) {
        setTeamRole("TOPLANER");
      }
    } else if (desiredGames === "VALORANT") {
      // Si le rôle actuel n'est pas valide pour Valo, on met Duelist
      if (
        ![
          "DUELIST",
          "SENTINEL",
          "INITIATOR",
          "CONTROLLER",
          "POLYVALENT",
        ].includes(teamRole)
      ) {
        setTeamRole("DUELIST");
      }
    }
    // On retire 'teamRole' des dépendances pour éviter les boucles infinies
  }, [desiredGames, roleWish, setTeamRole, teamRole]);

  // --- LOGIQUE 2 : CHARGEMENT DES DONNÉES ---
  useEffect(() => {
    let mounted = true;
    const fetchTeams = async () => {
      setTeamsLoading(true);
      try {
        const res = await fetch(`${EQUIPE_API_BASE}/nameTeamAndGame`, {
          credentials: "include",
        });

        if (!mounted) return;

        if (!res.ok) throw new Error(`Erreur (${res.status})`);

        const data: Record<string, string[]> = await res.json();

        const mapped: Record<string, string[]> = {};
        const formatKey = (key: string) => {
          const k = key.toUpperCase();
          if (k.includes("LEAGUEOFLEGENDES")) return "LEAGUEOFLEGENDES";
          if (k.includes("VALORANT")) return "VALORANT";
          if (k.includes("FORTNITE")) return "FORTNITE";
          return key;
        };

        Object.keys(data).forEach((key) => {
          mapped[formatKey(key)] = data[key];
        });

        setTeamsByGame(mapped);
      } catch (err) {
        console.error("Erreur lors du chargement des équipes :", err);
      } finally {
        if (mounted) setTeamsLoading(false);
      }
    };

    fetchTeams();
    return () => {
      mounted = false;
    };
  }, []);

  // --- HANDLERS (Gestionnaires d'événements) ---

  // Gérer le changement de rôle (Joueur/Coach)
  const handleRoleWishChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setRoleWish(val);

    // LOGIQUE DÉPLACÉE ICI (Plus propre que useEffect)
    if (val === "coach") {
      setTeamRole("coach");
      setDesiredTeam("");
      // Un coach peut vouloir choisir un jeu, donc on ne vide pas forcément desiredGames
    } else {
      setTeamRole("joueur"); // Valeur temporaire avant que le useEffect ne mette le bon rôle in-game
    }
  };

  // Gérer le changement d'équipe
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rawValue = e.target.value; // ex: "League Of Legend — Karmine Corp"

    if (!rawValue) return;

    const [gameName, teamName] = rawValue.split(" — ");

    // 1. On met à jour le jeu si nécessaire (auto-detection)
    if (gameName && gameName !== desiredGames) {
      setDesiredGames(gameName);
    }

    // 2. On envoie SEULEMENT le nom de l'équipe au parent
    // C'est ici qu'on corrige le bug du format "Jeu — Equipe"
    setDesiredTeam(teamName || rawValue);
  };

  return (
    <form
      className="formulaire-creation"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h2>Postule pour rejoindre l'équipe de tes rêves</h2>

      {/* --- IDENTITÉ --- */}
      <label htmlFor="firstName">Prénom</label>
      <input
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <label htmlFor="lastName">Nom</label>
      <input
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <label htmlFor="sexe">Sexe</label>
      <select id="sexe" value={sexe} onChange={(e) => setSexe(e.target.value)}>
        <option value="homme">Homme</option>
        <option value="femme">Femme</option>
        <option value="non precise">Non précisé</option>
        <option value="autre">Autre</option>
      </select>

      {/* --- RÔLE PRINCIPAL --- */}
      <label htmlFor="roleWish">Rôle souhaité</label>
      <select
        id="roleWish"
        value={roleWish}
        onChange={handleRoleWishChange} // Utilisation du handler personnalisé
      >
        <option value="joueur">Joueur</option>
        <option value="coach">Coach</option>
      </select>

      {/* --- JEU --- */}
      <label htmlFor="desiredGames">Jeu souhaité</label>
      <select
        id="desiredGames"
        value={desiredGames}
        onChange={(e) => {
          setDesiredGames(e.target.value);
          setDesiredTeam(""); // Reset équipe si on change de jeu
        }}
      >
        <option value="">-- Choisir un jeu --</option>
        {teamsLoading && <option disabled>Chargement...</option>}
        {Object.keys(teamsByGame).map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      {/* --- ÉQUIPE (Seulement si Joueur) --- */}
      {roleWish !== "coach" && (
        <>
          <label htmlFor="desiredTeam">Équipe souhaitée</label>
          <select
            id="desiredTeam"
            // Astuce : on reconstruit la value combinée pour que le select affiche la bonne option
            value={desiredTeam ? `${desiredGames} — ${desiredTeam}` : ""}
            onChange={handleTeamChange}
            disabled={!desiredGames}
          >
            <option value="">-- Choisir une équipe --</option>

            {(() => {
              const teams = teamsByGame[desiredGames] || [];
              if (teams.length === 0 && desiredGames) {
                return <option disabled>Aucune équipe disponible</option>;
              }

              return teams.map((t) => (
                // La value contient le séparateur pour que le handler puisse retrouver le jeu
                <option key={t} value={`${desiredGames} — ${t}`}>
                  {t}{" "}
                  {/* On affiche juste le nom de l'équipe, c'est plus propre */}
                </option>
              ));
            })()}
          </select>
        </>
      )}

      {/* --- ROLE IN-GAME (Seulement si Joueur) --- */}
      {roleWish !== "coach" && (
        <>
          <label htmlFor="teamRole">Rôle dans le jeu</label>
          {desiredGames === "LEAGUEOFLEGENDES" ? (
            <select
              id="teamRole"
              value={teamRole}
              onChange={(e) => setTeamRole(e.target.value)}
            >
              <option value="TOPLANER">Top</option>
              <option value="JUNGLER">Jungle</option>
              <option value="MIDLANER">Middle</option>
              <option value="BOTLANER">ADC</option>
              <option value="SUPORT">Support</option>
            </select>
          ) : desiredGames === "VALORANT" ? (
            <select
              id="teamRole"
              value={teamRole}
              onChange={(e) => setTeamRole(e.target.value)}
            >
              <option value="DUELIST">Duelist</option>
              <option value="INITIATOR">Initiator</option>
              <option value="CONTROLLER">Controller</option>
              <option value="SENTINEL">Sentinel</option>
              <option value="POLYVALENT">Polyvalent</option>
            </select>
          ) : (
            <input id="teamRole" value="Joueur Polyvalent" disabled />
          )}
        </>
      )}

      <div className="form-actions">
        <button
          type="submit"
          className="btn-valider"
          disabled={loading || teamsLoading}
        >
          {loading ? "Envoi..." : "Terminer"}
        </button>
      </div>
    </form>
  );
};

export default FormulairePostulation;
