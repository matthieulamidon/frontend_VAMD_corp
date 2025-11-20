import React from "react";
import "../styles/App.css";
import "../styles/accueil.css";
import "../styles/Calendrier.css";

// Images
import Logo_LoL from "../../assets/games/logos_games/logo_lol.png";
import Logo_Valo from "../../assets/games/logos_games/logo_valo.png";
import Logo_Fortnite from "../../assets/games/logos_games/logo_fortnite.png";
import { useEffect, useState } from "react";

// Calendrier
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import frLocale from "@fullcalendar/core/locales/fr";

interface AgendaEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  game: "lol" | "valo" | "fortnite";
}
interface BackendEvent {
  id_event: number;
  titre_event: string;
  date_heure_debut: string;
  date_heure_fin: string;
  type_event: string; // tu peux mettre "LOL" | "VALO" | "FORTNITE" si tu veux stricter
}

const BodyCalendrier: React.FC = () => {
  const EVENTS_API_URL =
    (import.meta.env.VITE_BACKEND_LINK ??
      "https://backend-vamd-corp.onrender.com") + "/api/events";

  console.log("URL des événements :", EVENTS_API_URL);

  const [events, setEvents] = useState<AgendaEvent[]>([]);

  /* const events: AgendaEvent[] = [
    { id: "lol-1311", title: "Entrainement LoL ADC", date: "2025-11-13", game: "lol" },
    { id: "valo-1811", title: "Analyse Map Corrode", date: "2025-11-18", game: "valo" },
    { id: "fn-2611", title: "MaÃ®triser les rotations (FN)", date: "2025-11-26", game: "fortnite" },
  ];*/

  const getLogo = (game: AgendaEvent["game"]) => {
    switch (game) {
      case "lol":
        return Logo_LoL;
      case "valo":
        return Logo_Valo;
      case "fortnite":
        return Logo_Fortnite;
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${EVENTS_API_URL}/events`); // pas besoin de token
        console.log("Réponse fetch :", res);
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des événements");

        const data: BackendEvent[] = await res.json();
        console.log("Événements récupérés :", data);

        const formatted: AgendaEvent[] = data.map((ev) => ({
          id: ev.id_event.toString(),
          title: ev.titre_event,
          date: ev.date_heure_debut.slice(0, 10), // YYYY-MM-DD
          game: ev.type_event.toLowerCase() as "lol" | "valo" | "fortnite",
        }));

        setEvents(formatted);
      } catch (err) {
        console.error("Erreur fetchEvents:", err);
      }
    };

    fetchEvents();
  }, [EVENTS_API_URL]);
  console.log("Événements dans le state :", events);
  return (
    <div className="body-calendrier">
      <div className="body-left-calendrier">
        <h1 className="title-calendrier">AGENDA</h1>

        {events.map((ev) => (
          <div key={ev.id} className="body-child-event">
            <img
              src={getLogo(ev.game)}
              alt={ev.game}
              className="logo-child-event"
            />
            <h3 className="subtitle-child-calendrier">{ev.title}</h3>
            <span className="date-child-event">
              {ev.date.slice(8, 10)}/{ev.date.slice(5, 7)}
            </span>
          </div>
        ))}
      </div>

      <div className="body-middle-calendrier">
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            locale={frLocale}
          />
        </div>
      </div>

      <div className="body-right-calendrier"></div>
    </div>
  );
};

export default BodyCalendrier;
