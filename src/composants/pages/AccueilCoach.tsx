import NavbarJoueur from "../organims/navbarJoueur";
import { useEffect, useState } from "react";
import '../styles/coachEvents.css';
import { useNavigate } from "react-router-dom";


type EventCoach = {
  date: string;
  name: string;
  lieu: string;
};

function AccueilPortailCoach() {

  const [events, setEvents] = useState<EventCoach[]>([]);

  useEffect(() => {
    const fakeEvents: EventCoach[] = [
      { date: "03/12/2025", name: "Entraînement tactique", lieu: "Stade principal" },
      { date: "05/12/2025", name: "Match amical", lieu: "Terrain B" },
      { date: "07/12/2025", name: "Réunion vidéo", lieu: "En ligne" },
      { date: "10/12/2025", name: "Analyse des matchs", lieu: "Salle vidéo" },
    ];
    setEvents(fakeEvents);
  }, []);

  const navigate = useNavigate();
  const handleAddEvent = () => {
    navigate("/creation-evenement");
  };

  return (
    <>
      <NavbarJoueur />
      <div className="body-coach-events">
        <div className="tableau-events-coach">
          <div className="title-tableau-events-coach">Événements</div>

          <div className="title-tableau-events-coach ajout-event" onClick={handleAddEvent} style={{ cursor: "pointer" }}>
            Ajouter un événement
          </div>

          <table className="table-coach-events">
            <thead>
              <tr>
                <th>Date</th>
                <th>Nom de l'événement</th>
                <th>Lieu</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>{event.date}</td>
                  <td>{event.name}</td>
                  <td>{event.lieu}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
}

export default AccueilPortailCoach;
