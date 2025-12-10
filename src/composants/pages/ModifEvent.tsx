import NavbarJoueur from "../organims/navbarJoueur";
import '../styles/creationEvent.css';

function ModifEvent() {
    return (
        <>
            <NavbarJoueur />
            <div className="body-creation-event-coach">
                <div className="title-creation-event">Modification de l'événement</div>
                <div className="formulaire-add-event">
                    <div className="formulaire-event-classique">

                        <div className="form-left">
                            <div className="form-group">
                                <label>Nom de l'événement</label>
                                <input className="content-string-add-event" type="text" placeholder="Ex : Entraînement lucarnes FC26" />
                            </div>

                            <div className="form-group">
                                <label>Jeu</label>
                                <select>
                                    <option value="" disabled selected>Choisis un jeu</option>
                                    <option value="FC26">FC26</option>
                                    <option value="Valorant">Valorant</option>
                                    <option value="LoL">League of Legends</option>
                                </select>
                            </div>


                            <div className="form-group">
                                <label>Description</label>
                                <textarea placeholder="Décris l'événement..." />
                            </div>
                        </div>

                        <div className="form-right">
                            <div className="form-group">
                                <label>Lieu</label>
                                <input type="text" placeholder="Ex : Salle 203 - ESEO" />
                            </div>

                            <div className="form-group">
                                <label>Date de début</label>
                                <input type="date" />
                            </div>

                            <div className="form-group">
                                <label>Date de fin</label>
                                <input type="date" />
                            </div>

                            <div className="form-group">
                                <button className="btn-submit-event">Créer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModifEvent;