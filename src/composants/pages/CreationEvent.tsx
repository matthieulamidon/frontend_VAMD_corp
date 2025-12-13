import NavbarJoueur from "../organims/navbarJoueur";
import "../styles/creationEvent.css";
import { useState } from "react";

function CreationEvent() {
  const [isBigEvent, setIsBigEvent] = useState(false);

  // -----------------------------
  // CHAMPS ENTRAINEMENT
  // -----------------------------
  const [eventTitle, setEventTitle] = useState("");
  const [eventGame, setEventGame] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLieu, setEventLieu] = useState("");
  const [eventDateDebut, setEventDateDebut] = useState("");
  const [eventDateFin, setEventDateFin] = useState("");

  const handleCreateEvent = async () => {
    if (!eventTitle || !eventGame || !eventDateDebut || !eventDateFin) {
      alert("Veuillez remplir les champs obligatoires");
      return;
    }

    const payload = {
      titre_event: eventTitle,
      type_event: eventGame,
      date_heure_debut: eventDateDebut,
      date_heure_fin: eventDateFin,
      lieu: eventLieu,
      description: eventDescription,
    };

    try {
      const res = await fetch(
        (import.meta.env.VITE_BACKEND_LINK ?? "http://localhost:4000") +
          "/api/events/event",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // pour envoyer le cookie d'auth
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.message || "Erreur création événement");
      }

      const data = await res.json();
      alert(`Entraînement créé : ${data.titre_event}`);

      // Reset formulaire
      setEventTitle("");
      setEventGame("");
      setEventDescription("");
      setEventLieu("");
      setEventDateDebut("");
      setEventDateFin("");
    } catch (err: unknown) {
      console.error(err);
      alert(
        `Erreur lors de la création de l'entraînement : ${err instanceof Error ? err.message : "Erreur inconnue"}`
      );
    }
  };

  // -----------------------------
  // CHAMPS MATCH / GRAND EVENT
  // -----------------------------
  const [titre, setTitre] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [organisateur, setOrganisateur] = useState("");
  const [lieu, setLieu] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [cagnotte, setCagnotte] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateBigEvent = async () => {
    if (!titre || !typeEvent || !dateDebut || !dateFin) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const payload = {
      titre,
      type_event: typeEvent,
      date_heure_debut: dateDebut,
      date_heure_fin: dateFin,
      lieu,
      description,
      prize: cagnotte,
      org_logo: null,
      game_logo: null,
    };

    try {
      const res = await fetch(
        (import.meta.env.VITE_BACKEND_LINK ?? "http://localhost:4000") +
          "/api/grandevent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.message || "Erreur création grand événement");
      }

      const data = await res.json();
      alert(`Match créé : ${data.titre}`);

      // Reset formulaire
      setTitre("");
      setTypeEvent("");
      setOrganisateur("");
      setLieu("");
      setDateDebut("");
      setDateFin("");
      setCagnotte("");
      setDescription("");
    } catch (err: unknown) {
      console.error(err);
      alert(
        `Erreur lors de la création du match : ${err instanceof Error ? err.message : "Erreur inconnue"}`
      );
    }
  };

  return (
    <>
      <NavbarJoueur />
      <div className="body-coach-creation-events">
        <div className="body-creation-event-coach">
          <div className="title-creation-event">Création d'un événement</div>

          <div className="switch-event-bigevent">
            <button
              className={!isBigEvent ? "switch-btn active" : "switch-btn"}
              onClick={() => setIsBigEvent(false)}
            >
              Créer un Entraînement
            </button>
            <div className="emoji-fleche-tournante">🗘</div>
            <button
              className={isBigEvent ? "switch-btn active" : "switch-btn"}
              onClick={() => setIsBigEvent(true)}
            >
              Créer un Match
            </button>
          </div>

          {/* ---------------- FORMULAIRE ENTRAINEMENT ---------------- */}
          {!isBigEvent && (
            <div className="formulaire-event-classique">
              <div className="form-left">
                <div className="form-group">
                  <label>Nom de l'événement</label>
                  <input
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    type="text"
                    placeholder="Ex : Entraînement FC26"
                  />
                </div>

                <div className="form-group">
                  <label>Jeu</label>
                  <select
                    value={eventGame}
                    onChange={(e) => setEventGame(e.target.value)}
                  >
                    <option value="" disabled>
                      Choisis un jeu
                    </option>
                    <option value="FC26">FC26</option>
                    <option value="VALORANT">Valorant</option>
                    <option value="LEAGUEOFLEGENDES">League of Legends</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder="Décris l'entraînement..."
                  />
                </div>
              </div>

              <div className="form-right">
                <div className="form-group">
                  <label>Lieu</label>
                  <input
                    value={eventLieu}
                    onChange={(e) => setEventLieu(e.target.value)}
                    type="text"
                    placeholder="Ex : Salle 203 - ESEO"
                  />
                </div>

                <div className="form-group">
                  <label>Date de début</label>
                  <input
                    value={eventDateDebut}
                    onChange={(e) => setEventDateDebut(e.target.value)}
                    type="date"
                  />
                </div>

                <div className="form-group">
                  <label>Date de fin</label>
                  <input
                    value={eventDateFin}
                    onChange={(e) => setEventDateFin(e.target.value)}
                    type="date"
                  />
                </div>

                <div className="form-group">
                  <button
                    onClick={handleCreateEvent}
                    className="btn-submit-event"
                  >
                    Créer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- FORMULAIRE MATCH ---------------- */}
          {isBigEvent && (
            <div className="formulaire-big-event">
              <div className="form-left">
                <div className="form-group">
                  <label>Nom du Match</label>
                  <input
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    type="text"
                    placeholder="Ex : Tournoi Valorant"
                  />
                </div>

                <div className="form-group">
                  <label>Cagnotte</label>
                  <input
                    value={cagnotte}
                    onChange={(e) => setCagnotte(e.target.value)}
                    type="text"
                    placeholder="Ex : 50,000€"
                  />
                </div>

                <div className="form-group">
                  <label>Jeu</label>
                  <select
                    value={typeEvent}
                    onChange={(e) => setTypeEvent(e.target.value)}
                  >
                    <option value="" disabled>
                      Choisis un jeu
                    </option>
                    <option value="FC26">FC26</option>
                    <option value="VALORANT">Valorant</option>
                    <option value="LEAGUEOFLEGENDES">League of Legends</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Décris l'événement..."
                  />
                </div>

                <div className="form-group">
                  <label>Organisateur</label>
                  <input
                    value={organisateur}
                    onChange={(e) => setOrganisateur(e.target.value)}
                    type="text"
                    placeholder="Ex : Blast"
                  />
                </div>
              </div>

              <div className="form-right">
                <div className="form-group">
                  <label>Lieu</label>
                  <input
                    value={lieu}
                    onChange={(e) => setLieu(e.target.value)}
                    type="text"
                    placeholder="Ex : Salle 203 - ESEO"
                  />
                </div>

                <div className="form-group">
                  <label>Date de début</label>
                  <input
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    type="date"
                  />
                </div>

                <div className="form-group">
                  <label>Date de fin</label>
                  <input
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                    type="date"
                  />
                </div>

                <div className="form-group" style={{ marginTop: "16px" }}>
                  <button
                    onClick={handleCreateBigEvent}
                    className="btn-submit-event"
                  >
                    Créer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CreationEvent;
