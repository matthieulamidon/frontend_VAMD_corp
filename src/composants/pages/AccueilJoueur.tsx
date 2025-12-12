import { useState, useRef } from "react";
import { TeamPage } from "../organims/PlayerSelected";
import NavbarJoueur from "../organims/navbarJoueur";
import '../styles/accueilJoueur.css';

function AccueilPortailJoueur() {
  type EventBefore = {
    Nom: string;
    date: string;
    presence: string;
    Win: string;
    KDA: string;
    Commentaire: string;
  };

  type EventAfter = {
    Nom: string;
    date: string;
    Commentaire: string;
  };

  const events_before: EventBefore[] = [
    { Nom: "Match Valorant", date: "02/12/2025", presence: "oui", Win: "OUI", KDA: "47/04/08", Commentaire: "Il a carry la team, c'est le goat..." },
    { Nom: "Entraînement Fortnite", date: "27/11/2025", presence: "non", Win: "NA", KDA: "NA", Commentaire: "Pas là." },
  ];

  const events_after: EventAfter[] = [
    { Nom: "Entraînement LoL", date: "24/12/2025", Commentaire: "Macro-games. Celui qui sera en retard jouera Yuumi." }
  ];

  const [activePastEvent, setActivePastEvent] = useState<number | null>(null);
  const [activeFutureEvent, setActiveFutureEvent] = useState<number | null>(null);

  const pastEventRefs = useRef<HTMLDivElement[]>([]);
  const futureEventRefs = useRef<HTMLDivElement[]>([]);

  const togglePastEvent = (index: number) => {
    setActivePastEvent(activePastEvent === index ? null : index);
    if (pastEventRefs.current[index]) {
      pastEventRefs.current[index].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleFutureEvent = (index: number) => {
    setActiveFutureEvent(activeFutureEvent === index ? null : index);
    if (futureEventRefs.current[index]) {
      futureEventRefs.current[index].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <NavbarJoueur />
      <div className="body-portail-joueur">
        <div className="body-portail-joueur-left">
          <h1>Bienvenue sur le portail joueur</h1>
        </div>

        <div className="body-portail-joueur-right">
          <div className="body-portail-joueur-right-body">
            <div className="title-right-portail-joueur">ÉVÉNEMENT PASSÉ</div>

            {events_before.map((event, i) => {
              const presenceValue = event.presence;

              return (
                <div key={i} className="event-container">
                  <button className="event-toggle-button" onClick={() => togglePastEvent(i)}>
                    {event.Nom}
                  </button>

                  <div className={`event-passé ${activePastEvent === i ? "active" : ""}`} 
                       ref={el => { if (el) pastEventRefs.current[i] = el; }}>
                    <div className="présence-joueur">
                      <div className={`bar-présence ${presenceValue === "oui" ? "green" : presenceValue === "non" ? "red" : "gray"}`}></div>
                      {presenceValue === "oui" ? "Présent !" : presenceValue === "non" ? "Absent" : "NA"}
                    </div>

                    <div className="stats-joueur">
                      {(Object.keys(event) as (keyof EventBefore)[])
                        .filter(key => key !== "presence")
                        .map((key, j) => (
                          <div className="stat-joueur-line" key={j}>
                            {key}
                            <div className="chiffre-stats-joueur">{event[key]}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="title-right-portail-joueur FUTUR">ÉVÉNEMENT DANS LE FUTUR</div>

            {events_after.map((event, i) => (
              <div key={i} className="event-container">
                <button className="event-toggle-button" onClick={() => toggleFutureEvent(i)}>
                  {event.Nom}
                </button>

                <div className={`event-passé ${activeFutureEvent === i ? "active" : ""}`}
                     ref={el => { if (el) futureEventRefs.current[i] = el; }}>
                  <div className="stats-joueur">
                    {(Object.keys(event) as (keyof EventAfter)[])
                      .map((key, j) => (
                        <div className="stat-joueur-line" key={j}>
                          {key}
                          <div className="chiffre-stats-joueur">{event[key]}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <h1>Bienvenue sur le portail joueur</h1>
      <TeamPage />
    </>
  );
}

export default AccueilPortailJoueur;
