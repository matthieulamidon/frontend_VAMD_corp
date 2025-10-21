import React, { useEffect } from 'react';
import '../pages/connexionUtilisateur.css';

type Props = {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  sex: string;
  setSex: (v: string) => void;
  desiredGames: string;
  setDesiredGames: (v: string) => void;
  desiredTeam: string;
  setDesiredTeam: (v: string) => void;
  teamRole: string;
  setTeamRole: (v: string) => void;
  onPrev: () => void;
  onSubmit: () => void;
  loading?: boolean;
};

const FormulaireInscription3: React.FC<Props> = ({ firstName, setFirstName, lastName, setLastName, sex, setSex, desiredGames, desiredTeam, setDesiredTeam, teamRole, setTeamRole, onPrev, onSubmit, loading }) => {
  useEffect(() => {
    const game = desiredGames || desiredTeam?.split(' — ')[0];
    if (game === 'League Of Legend') {
      if (!teamRole || teamRole === 'joueur') setTeamRole('Top');
    } else if (game === 'Valorant') {
      if (!teamRole || teamRole === 'joueur') setTeamRole('Duelist');
    } else {
      setTeamRole('joueur');
    }
  }, [desiredGames, desiredTeam, teamRole, setTeamRole]);

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
        {(() => {
          const game = desiredGames || desiredTeam?.split(' — ')[0] || 'League Of Legend';
          return [1, 2, 3, 4].map(n => (
            <option key={n} value={`${game} — Équipe ${n}`}>{`${game} — Équipe ${n}`}</option>
          ));
        })()}
      </select>

      <label htmlFor="teamRole">Rôle dans l'équipe (si applicable)</label>
      {(() => {
        const game = desiredGames || desiredTeam?.split(' — ')[0];
        if (game === 'League Of Legend') {
          return (
            <select id="teamRole" value={teamRole} onChange={e => setTeamRole(e.target.value)}>
              <option value="Top">Top</option>
              <option value="Middle">Middle</option>
              <option value="Jungle">Jungle</option>
              <option value="Support">Support</option>
              <option value="ADC">ADC</option>
            </select>
          );
        }
        if (game === 'Valorant') {
          return (
            <select id="teamRole" value={teamRole} onChange={e => setTeamRole(e.target.value)}>
              <option value="Duelist">Duelist</option>
              <option value="Sentinel">Sentinel</option>
              <option value="Initiator">Initiator</option>
              <option value="Controller">Controller</option>
            </select>
          );
        }
        return <input id="teamRole" value={teamRole || 'joueur'} readOnly />;
      })()}

      {/* keep teamRole defaults in sync when desiredTeam changes (handled in useEffect above) */}

      <div className="form-actions">
        <button type="button" className="btn-forgot" onClick={onPrev} disabled={!!loading}>Précédent</button>
        <button type="submit" className="btn-valider" disabled={!!loading}>{'Terminer'}</button>
      </div>
    </form>
  );
};

export default FormulaireInscription3;
