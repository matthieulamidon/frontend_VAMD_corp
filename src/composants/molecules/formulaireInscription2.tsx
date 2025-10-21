import React from "react";
import "../pages/connexionUtilisateur.css";

type Props = {
  roleWish: string;
  setRoleWish: (v: string) => void;
  desiredGames: string;
  setDesiredGames: (v: string) => void;
  onPrev: () => void;
  onNext: (selectedGame?: string) => void;
  loading?: boolean;
};

const FormulaireInscription2: React.FC<Props> = ({
  roleWish,
  setRoleWish,
  desiredGames,
  setDesiredGames,
  onPrev,
  onNext,
  loading,
}) => {
  return (
    <form
      className="formulaire-creation"
      onSubmit={(e) => {
        e.preventDefault();
        onNext(desiredGames);
      }}
    >
      <h2>Créer ton compte — Étape 2</h2>

      <label htmlFor="roleWish">Rôle souhaité</label>
      <select
        id="roleWish"
        value={roleWish}
        onChange={(e) => setRoleWish(e.target.value)}
      >
        <option value="visiteur">Visiteur</option>
        <option value="joueur">Joueur</option>
        <option value="coach">Coach</option>
      </select>

      {roleWish !== "visiteur" && (
        <>
          <label htmlFor="desiredGames">
            Jeux souhaités (si joueur ou coach)
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
        </>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="btn-forgot"
          onClick={onPrev}
          disabled={!!loading}
        >
          Précédent
        </button>
        <button type="submit" className="btn-valider" disabled={!!loading}>
          {roleWish === "visiteur" ? "Valider" : "Suivant"}
        </button>
      </div>
    </form>
  );
};

export default FormulaireInscription2;
