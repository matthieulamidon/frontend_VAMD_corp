import React, { useState } from 'react';
import '../../App.css';
import '../pages/connexionUtilisateur.css';
import FormulaireInscription from '../molecules/formulaireInscription';
import FormulaireConnexion from '../molecules/formulaireConnexion';

const BodyConnectionUtilisateur: React.FC = () => {
    // 0 = inscription active (centre), 1 = connexion active (centre)
    const [active, setActive] = useState<number>(0);

    return (
        <div className="body-connection-utilisateur">
            <div className="subtitle-connection-utilisateur">
                Connecte-toi ou crée un compte pour continuer.
            </div>

            <div className="forms-wrapper">
                <div
                    className={`form-panel ${active === 0 ? 'center' : 'left'}`}
                    onClick={() => setActive(0)}
                    role="button"
                    tabIndex={0}
                >
                    <FormulaireInscription />
                </div>

                <div
                    className={`form-panel ${active === 1 ? 'center' : 'right'}`}
                    onClick={() => setActive(1)}
                    role="button"
                    tabIndex={0}
                >
                    <FormulaireConnexion />
                </div>
            </div>
        </div>
    );
};

export default BodyConnectionUtilisateur;