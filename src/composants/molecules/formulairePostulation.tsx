import React, { useEffect } from "react";
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

      <label htmlFor="desiredGames">
            Jeu souhaité
          </label>
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
              desiredGames || desiredTeam?.split(" — ")[0] || "League Of Legend";
            return [1, 2, 3, 4].map((n) => (
              <option
                key={n}
                value={`${game} — Équipe ${n}`}
              >{`${game} — Équipe ${n}`}</option>
            ));
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

      {/* keep teamRole defaults in sync when desiredTeam changes (handled in useEffect above) */}

      <div className="form-actions">
        <button type="submit" className="btn-valider" disabled={!!loading}>
          {"Terminer"}
        </button>
      </div>
    </form>
  );
};

export default FormulairePostulation;
