import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarCoach from "../organims/navbarCoach";
import TeamManager from "../organims/TeamManager";

function AccueilPortailCoach() {

  const [events, setEvents] = useState<EventCoach[]>([]);
  const [emargedEvents, setEmargedEvents] = useState<number[]>([]);


  useEffect(() => {
    const fakeEvents: EventCoach[] = [
      { id: 1, date: "03/12/2025", name: "Entraînement tactique", type: "Match" },
      { id: 2, date: "05/12/2025", name: "Match amical", type: "Entraînement" },
      { id: 3, date: "07/12/2025", name: "Réunion vidéo", type: "Match" },
      { id: 4, date: "10/12/2025", name: "Analyse des matchs", type: "Match" },
    ];
    setEvents(fakeEvents);

    const emarged = fakeEvents
      .filter(ev => localStorage.getItem(`emargedEvent-${ev.id}`) === "true")
      .map(ev => ev.id);
    setEmargedEvents(emarged);
  }, []);


  const navigate = useNavigate();
  const handleAddEvent = () => {
    navigate("/creation-evenement");
  };

  return (
    <>
      <NavbarCoach />
      <TeamManager />
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
                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => {
                const isEmarged = emargedEvents.includes(event.id);
                const rowStyle = {
                  cursor: "pointer",
                  backgroundColor: isEmarged ? "#003c06ff" : "#370000ff",
                  color: "white",
                };
                return (
                  <tr key={event.id} onClick={() => navigate(`/modif-evenement/${event.id}`)} style={rowStyle}>
                    <td>{event.date}</td>
                    <td>{event.name}</td>
                    <td>{event.type}</td>
                  </tr>
                );
              })}
            </tbody>

          </table>

        </div>
      </div>
    </>
  );
}

export default AccueilPortailCoach;
