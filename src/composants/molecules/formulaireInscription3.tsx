import React from 'react';
import '../pages/connexionUtilisateur.css';

type Props = {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  sex: string;
  setSex: (v: string) => void;
  desiredTeam: string;
  setDesiredTeam: (v: string) => void;
  teamRole: string;
  setTeamRole: (v: string) => void;
  onPrev: () => void;
  onSubmit: () => void;
};

const FormulaireInscription3: React.FC<Props> = ({ firstName, setFirstName, lastName, setLastName, sex, setSex, desiredTeam, setDesiredTeam, teamRole, setTeamRole, onPrev, onSubmit }) => {
  return (
    <form className="formulaire-creation" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <h2>Créer ton compte — Étape 3</h2>

      <label htmlFor="firstName">Prénom</label>
      <input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />

      <label htmlFor="lastName">Nom</label>
      <input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />

      <label htmlFor="sex">Sexe</label>
      <select id="sex" value={sex} onChange={e => setSex(e.target.value)}>
        <option value="homme">Homme</option>
        <option value="femme">Femme</option>
        <option value="non precise">Non précisé</option>
        <option value="autre">Autre</option>
      </select>

      <label htmlFor="desiredTeam">Équipe souhaitée (choix par jeu)</label>
      <select id="desiredTeam" value={desiredTeam} onChange={e => setDesiredTeam(e.target.value)}>
        <option value="League Of Legend">League Of Legend</option>
        <option value="Fortnite">Fortnite</option>
        <option value="Valorant">Valorant</option>
        <option value="Fifa">Fifa</option>
      </select>

      <label htmlFor="teamRole">Rôle dans l'équipe (si applicable)</label>
      <input id="teamRole" value={teamRole} onChange={e => setTeamRole(e.target.value)} />

      <div className="form-actions">
        <button type="button" className="btn-forgot" onClick={onPrev}>Précédent</button>
        <button type="submit" className="btn-valider">Terminer</button>
      </div>
    </form>
  );
};

export default FormulaireInscription3;
