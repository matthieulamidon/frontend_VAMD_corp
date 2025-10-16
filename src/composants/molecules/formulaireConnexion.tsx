import React, { useState } from 'react';
import '../pages/connexionUtilisateur.css';

const FormulaireConnexion: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [pseudo, setPseudo] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: remplacer par appel API ou gestion de state global
        console.log('Soumission formulaire', { email, password });
        // reset optionnel
        // setEmail(''); setPassword('');
    };

    const handleForgotPassword = (e: React.MouseEvent) => {
        e.preventDefault();
        // TODO: naviguer vers la page de récupération de mot de passe
        console.log('Mot de passe oublié cliqué');
    };

    return (
        <form className="formulaire-connection" onSubmit={handleSubmit} aria-label="Formulaire de connexion">
            <h2>Connecte-toi à ton compte</h2>

            <label htmlFor="email">Adresse e-mail</label>
            <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="exemple@domaine.com"
            />
             <label htmlFor="pseudo">pseudo</label>
            <input id="pseudo" name="pseudo" value={pseudo} onChange={e => setPseudo(e.target.value)} />
            
            <label htmlFor="password">Mot de passe</label>
            <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Votre mot de passe"
            />

            <div className="form-actions">
                <button type="submit" className="btn-valider">Valider</button>
                <button type="button" className="btn-forgot" onClick={handleForgotPassword}>Mot de passe oublié</button>
            </div>
        </form>
    );
};

export default FormulaireConnexion;