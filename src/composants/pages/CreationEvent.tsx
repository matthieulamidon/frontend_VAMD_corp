import NavbarJoueur from "../organims/navbarJoueur";
import '../styles/creationEvent.css';
import { useState } from "react";

function CreationEvent() {
    const [isBigEvent, setIsBigEvent] = useState(false);
    return (
        <>
            <NavbarJoueur />
            <div className="body-coach-creation-events">
                <div className="body-creation-event-coach">
                    <div className="title-creation-event">Création d'un événement</div>

                    <div className="switch-event-bigevent">
                        <button className={!isBigEvent ? "switch-btn active" : "switch-btn"} onClick={() => setIsBigEvent(false)}>
                            Événement classique
                        </button>
                        <div className="emoji-fleche-tournante">🗘</div>
                        <button className={isBigEvent ? "switch-btn active" : "switch-btn"} onClick={() => setIsBigEvent(true)}>
                            Événement mondial
                        </button>
                    </div>

                    <div className="formulaire-add-event">
                        {/* Formulaire classique */}
                        {!isBigEvent && (
                            <div className="formulaire-event-classique">

                                {/* COLONNE GAUCHE */}
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
                        )}
                        {/* Formulaire Big Event */}
                        {isBigEvent && (
                            <div className="formulaire-big-event">
                                {/* COLONNE GAUCHE */}
                                <div className="form-left">
                                    <div className="form-group">
                                        <label>Nom de l'événement</label>
                                        <input className="content-string-add-event" type="text" placeholder="Ex : Entraînement lucarnes FC26" />
                                    </div>

                                    <div className="form-group">
                                        <label>Cagnotte</label>
                                        <input type="text" placeholder="Ex : Salle 203 - ESEO" />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Jeu</label>
                                        <select>
                                            <option value="" disabled selected>Choisis un jeu</option>
                                            <option value="FC26">FC26</option>
                                            <option value="Valorant">Valorant</option>
                                            <option value="LoL">League of Legends</option>
                                            <option value="Fortnite">Fortnite</option>
                                            <option value="Pokemon">Pokemon</option>
                                            <option value="Rocket_League">Rocket League</option>
                                            <option value="Overwatch">Overwatch</option>
                                        </select>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Organisateur</label>
                                        <select>
                                            <option value="" disabled selected>Choisis un Organisateur</option>
                                            <option value="Blast">Blast</option>
                                            <option value="Game_Changer">Game Changer Chanpionship</option>
                                            <option value="GVC">GVC</option>
                                            <option value="MCC">Monthly Cash Cup</option>
                                            <option value="Nova">NOVA</option>
                                            <option value="OW">OW</option>
                                            <option value="Pokemon_International">Pokemon International</option>
                                            <option value="Saudi_League">SAUDI League</option>
                                        </select>
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
                                    
                                    <div className="form-group" style={{ marginTop: '16px' }}>
                                        <button className="btn-submit-event">Créer</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreationEvent;