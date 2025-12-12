import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavbarJoueur from "../organims/navbarJoueur";
import Footer from "../organims/footer";
import "../styles/creationEvent.css";
import "../styles/modifEvent.css";

function ModifEvent() {
  type EventType = {
    type: string;
    name: string;
    game?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    organizer?: string;
    cagnotte?: string;
  };
  type Participant = {
    id: number;
    name: string;
    present: boolean;
    comment: string;
  };

  const [participants, setParticipants] = useState<Participant[]>([]);
  const { id } = useParams();
  const [eventData, setEventData] = useState<EventType | null>(null);
  const [isBigEvent, setIsBigEvent] = useState(false);
  const middleIndex = Math.ceil(participants.length / 2);
  const leftParticipants = participants.slice(0, middleIndex);
  const rightParticipants = participants.slice(middleIndex);
  const navigate = useNavigate();

  /*
    const fake: Record<string, EventType> = {
        "1": { type: "Entrainement", name: "Entraînement tactique", game: "FC26", description: "Tactique générale", startDate: "2025-12-03", endDate: "2025-12-03", location: "Salle 203 - ESEO" },
        "2": { type: "Entrainement", name: "Match amical", game: "Valorant", description: "Match amical entre équipes", startDate: "2025-12-05", endDate: "2025-12-05", location: "Salle 205 - ESEO" },
        "3": { type: "Match", name: "Réunion vidéo", game: "Pokemon", startDate: "2025-12-07", endDate: "2025-12-07", location: "Zoom", organizer: "GVC", cagnotte: "10000000€" },
        "4": { type: "Match", name: "Analyse des matchs", game: "Overwatch", startDate: "2025-12-10", endDate: "2025-12-10", location: "Salle 101 - ESEO", organizer: "Blast", cagnotte: "10000050€" },
    };*/

  useEffect(() => {
    if (!id) return;

    const fake: Record<string, EventType> = {
      "1": {
        type: "Entrainement",
        name: "Entraînement tactique",
        game: "FC26",
        description: "Tactique générale",
        startDate: "2025-12-03",
        endDate: "2025-12-03",
        location: "Salle 203 - ESEO",
      },
      "2": {
        type: "Entrainement",
        name: "Match amical",
        game: "Valorant",
        description: "Match amical entre équipes",
        startDate: "2025-12-05",
        endDate: "2025-12-05",
        location: "Salle 205 - ESEO",
      },
      "3": {
        type: "Match",
        name: "Réunion vidéo",
        game: "Pokemon",
        startDate: "2025-12-07",
        endDate: "2025-12-07",
        location: "Zoom",
        organizer: "GVC",
        cagnotte: "10000000€",
      },
      "4": {
        type: "Match",
        name: "Analyse des matchs",
        game: "Overwatch",
        startDate: "2025-12-10",
        endDate: "2025-12-10",
        location: "Salle 101 - ESEO",
        organizer: "Blast",
        cagnotte: "10000050€",
      },
    };

    const ev = fake[id];
    if (!ev) return;

    setEventData(ev);
    setIsBigEvent(ev.type === "Match");
  }, [id]);

  useEffect(() => {
    setParticipants([
      { id: 1, name: "Adrien", present: true, comment: "" },
      { id: 2, name: "Léa", present: true, comment: "" },
      { id: 3, name: "Marc", present: true, comment: "" },
      { id: 4, name: "Sophie", present: true, comment: "" },
      { id: 5, name: "Matthieu", present: true, comment: "" },
      { id: 6, name: "Victor", present: true, comment: "" },
      { id: 7, name: "Dave", present: true, comment: "" },
    ]);
  }, [id]);

  const togglePresence = (id: number) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, present: !p.present } : p))
    );
  };

  const handleEmarger = () => {
    console.log("Émargement final :", participants);
    localStorage.setItem(`emargedEvent-${id}`, "true");
    navigate("/accueil-coach");
  };

  const updateComment = (id: number, comment: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, comment } : p))
    );
  };

  return (
    <>
      <NavbarJoueur />
      <div className="body-coach-creation-events">
        <div className="body-creation-event-coach">
          <div className="title-creation-event">
            Modification de l'événement <span>&nbsp;</span>
            <i>{eventData?.name}</i>
          </div>

          <div className="formulaire-add-event">
            {!isBigEvent && (
              <div className="formulaire-event-classique">
                <div className="form-left">
                  <div className="form-group">
                    <label>Nom de l'événement</label>
                    <input
                      className="content-string-add-event"
                      type="text"
                      placeholder="Ex : Entraînement lucarnes FC26"
                      value={eventData?.name || ""}
                      onChange={(e) =>
                        setEventData({ ...eventData!, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Jeu</label>
                    <select
                      value={eventData?.game || ""}
                      onChange={(e) =>
                        setEventData({ ...eventData!, game: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Choisis un jeu
                      </option>
                      <option value="FC26">FC26</option>
                      <option value="Valorant">Valorant</option>
                      <option value="LoL">League of Legends</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      placeholder="Décris l'événement..."
                      value={eventData?.description || ""}
                      onChange={(e) =>
                        setEventData({
                          ...eventData!,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-right">
                  <div className="form-group">
                    <label>Lieu</label>
                    <input
                      type="text"
                      placeholder="Ex : Salle 203 - ESEO"
                      value={eventData?.location || ""}
                      onChange={(e) =>
                        setEventData({
                          ...eventData!,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Date de début</label>
                    <input
                      type="date"
                      value={eventData?.startDate || ""}
                      onChange={(e) =>
                        setEventData({
                          ...eventData!,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Date de fin</label>
                    <input
                      type="date"
                      value={eventData?.endDate || ""}
                      onChange={(e) =>
                        setEventData({ ...eventData!, endDate: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <button className="btn-submit-event">Créer</button>
                  </div>
                </div>
              </div>
            )}
            {isBigEvent && (
              <div className="formulaire-big-event">
                <div className="form-left">
                  <div className="form-group">
                    <label>Nom de l'événement</label>
                    <input
                      className="content-string-add-event"
                      type="text"
                      placeholder="Ex : Entraînement lucarnes FC26"
                      value={eventData?.name || ""}
                      onChange={(e) =>
                        setEventData({ ...eventData!, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Cagnotte</label>
                    <input
                      type="text"
                      placeholder="Ex : 0€"
                      value={eventData?.cagnotte || ""}
                      onChange={(e) =>
                        setEventData({
                          ...eventData!,
                          cagnotte: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Jeu</label>
                    <select
                      value={eventData?.game || ""}
                      onChange={(e) =>
                        setEventData({ ...eventData!, game: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Choisis un jeu
                      </option>
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
                    <select
                      value={eventData?.organizer || ""}
                      onChange={(e) =>
                        setEventData({
                          ...eventData!,
                          organizer: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Choisis un Organisateur
                      </option>
                      <option value="Blast">Blast</option>
                      <option value="Game_Changer">
                        Game Changer Chanpionship
                      </option>
                      <option value="GVC">GVC</option>
                      <option value="MCC">Monthly Cash Cup</option>
                      <option value="Nova">NOVA</option>
                      <option value="OW">OW</option>
                      <option value="Pokemon_International">
                        Pokemon International
                      </option>
                      <option value="Saudi_League">SAUDI League</option>
                    </select>
                  </div>
                </div>

                <div className="form-right">
                  <div className="form-group">
                    <label>Lieu</label>
                    <input
                      type="text"
                      placeholder="Ex : Salle 203 - ESEO"
                      value={eventData?.location || ""}
                      onChange={(e) =>
                        setEventData({
                          ...eventData!,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Date de début</label>
                    <input
                      type="date"
                      value={eventData?.startDate || ""}
                      onChange={(e) =>
                        setEventData({
                          ...eventData!,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Date de fin</label>
                    <input
                      type="date"
                      value={eventData?.endDate || ""}
                      onChange={(e) =>
                        setEventData({ ...eventData!, endDate: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group" style={{ marginTop: "16px" }}>
                    <button className="btn-submit-event">
                      Confirmer la Modification
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="body-creation-event-coach">
          <div className="title-creation-event">
            Émargement des participants
          </div>

          <div className="formulaire-add-event">
            <div className="formulaire-event-classique">
              <div className="form-left-emargement">
                {leftParticipants.map((p) => (
                  <div key={p.id} style={{ marginBottom: "20px" }}>
                    <div
                      className={`participant ${p.present ? "present" : "absent"}`}
                      onClick={() => togglePresence(p.id)}
                    >
                      {p.name} ({p.present ? "Présent" : "Absent"})
                    </div>
                    <textarea
                      className="commentaire-participant"
                      placeholder="Commentaire..."
                      value={p.comment}
                      onChange={(e) => updateComment(p.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="form-right-emargement">
                {rightParticipants.map((p) => (
                  <div key={p.id} style={{ marginBottom: "20px" }}>
                    <div
                      className={`participant ${p.present ? "present" : "absent"}`}
                      onClick={() => togglePresence(p.id)}
                    >
                      {p.name} ({p.present ? "Présent" : "Absent"})
                    </div>
                    <textarea
                      className="commentaire-participant"
                      placeholder="Commentaire..."
                      value={p.comment}
                      onChange={(e) => updateComment(p.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="form-group-emargement">
            <button className="btn-submit-emargement" onClick={handleEmarger}>
              Émarger
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ModifEvent;
