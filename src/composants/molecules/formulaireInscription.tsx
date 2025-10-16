import React, { useState } from 'react';
import '../pages/connexionUtilisateur.css';
import FormulaireInscription2 from '../molecules/formulaireInscription2';
import FormulaireInscription3 from '../molecules/formulaireInscription3';

const FormulaireInscription: React.FC = () => {
   
    const [step, setStep] = useState<number>(1);

    const [pseudo, setPseudo] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [roleWish, setRoleWish] = useState<string>('visiteur');
    const [desiredGames, setDesiredGames] = useState<string>('');

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [sex, setSex] = useState<string>('non precise');
    const [desiredTeam, setDesiredTeam] = useState<string>('League Of Legend');
    const [teamRole, setTeamRole] = useState<string>('joueur');

        const [error, setError] = useState<string | null>(null);

        const next = () => setStep((s) => Math.min(3, s + 1));
        const prev = () => setStep((s) => Math.max(1, s - 1));

        const validateStep1 = () => {
            // all fields must be filled and email contains '@' and password > 6 chars
            if (!pseudo.trim()) {
                setError('Le pseudo est requis.');
                return false;
            }
            if (!dateOfBirth) {
                setError('La date de naissance est requise.');
                return false;
            }
            if (!email.trim()) {
                setError("L'adresse e-mail est requise.");
                return false;
            }
            if (!email.includes('@')) {
                setError("L'adresse e-mail doit contenir '@'.");
                return false;
            }
            if (!password || password.length <= 6) {
                setError('Le mot de passe doit contenir plus de 6 caractères.');
                return false;
            }
            setError(null);
            return true;
        };

        const validateStep2 = () => {
            // roleWish required; if joueur or coach then desiredGames required
            if (!roleWish) {
                setError('Le rôle souhaité est requis.');
                return false;
            }
            if ((roleWish === 'joueur' || roleWish === 'coach') && !desiredGames) {
                setError('Veuillez choisir un jeu si vous souhaitez être joueur ou coach.');
                return false;
            }
            setError(null);
            return true;
        };

        const validateStep3 = () => {
            if (!firstName.trim()) {
                setError('Le prénom est requis.');
                return false;
            }
            if (!lastName.trim()) {
                setError('Le nom est requis.');
                return false;
            }
            if (!sex) {
                setError('Le sexe est requis.');
                return false;
            }
            if (!desiredTeam) {
                setError("L'équipe souhaitée est requise.");
                return false;
            }
            // teamRole required if desiredTeam chosen
            if (desiredTeam && !teamRole) {
                setError('Le rôle dans l\'équipe est requis.');
                return false;
            }
            setError(null);
            return true;
        };

        const handleNextFromStep1 = () => {
            if (validateStep1()) next();
        };

        const handleNextFromStep2 = () => {
            if (validateStep2()) next();
        };

    const handleFinalSubmit = () => {
        const allData = {
            pseudo,
            dateOfBirth,
            email,
            password,
            roleWish,
            desiredGames,
            firstName,
            lastName,
            sex,
            desiredTeam,
            teamRole,
        };
        console.log("Données d'inscription complètes :", allData);
        // TODO: envoyer vers API
    };

    return (
        <div>
              {step === 1 && (
                        <form className="formulaire-creation" onSubmit={(e) => { e.preventDefault(); handleNextFromStep1(); }}>
                    <h2>Créer ton compte — Étape 1</h2>

                            {error && <div className="form-error" role="alert" style={{color: '#ffb4b4', marginBottom: '0.5rem'}}>{error}</div>}

                    <label htmlFor="pseudo">Pseudo</label>
                    <input id="pseudo" name="pseudo" value={pseudo} onChange={e => setPseudo(e.target.value)} />

                    <label htmlFor="dateOfBirth">Date de naissance</label>
                    <input id="dateOfBirth" name="dateOfBirth" type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />

                    <label htmlFor="email">Adresse e-mail</label>
                    <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password">Mot de passe</label>
                    <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <div className="form-actions">
                        <button type="submit" className="btn-valider">Suivant</button>
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
                    desiredTeam={desiredTeam}
                    setDesiredTeam={setDesiredTeam}
                    teamRole={teamRole}
                    setTeamRole={setTeamRole}
                    onPrev={prev}
                    onSubmit={() => { if (validateStep3()) handleFinalSubmit(); }}
                />
            )}
        </div>
    );
};

export default FormulaireInscription;