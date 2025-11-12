import React from "react";
import '../../App.css';
import '../../Accueil.css';
import './Calendrier.css';

// Images
import Logo_LoL from "../../assets/games/logos_games/logo_lol.png";
import Logo_Valo from "../../assets/games/logos_games/logo_valo.png";
import Logo_Fortnite from "../../assets/games/logos_games/logo_fortnite.png";

// Calendrier
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import frLocale from '@fullcalendar/core/locales/fr';


interface AgendaEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  game: "lol" | "valo" | "fortnite";
}

const BodyCalendrier: React.FC = () => {
  const events: AgendaEvent[] = [
    { id: "lol-1311", title: "Entrainement LoL ADC", date: "2025-11-13", game: "lol" },
    { id: "valo-1811", title: "Analyse Map Corrode", date: "2025-11-18", game: "valo" },
    { id: "fn-2611", title: "Maîtriser les rotations (FN)", date: "2025-11-26", game: "fortnite" },
  ];

  const getLogo = (game: AgendaEvent["game"]) => {
    switch (game) {
      case "lol": return Logo_LoL;
      case "valo": return Logo_Valo;
      case "fortnite": return Logo_Fortnite;
      default: return "";
    }
  };
  return (
    <div className="body-calendrier">
      <div className="body-left-calendrier">
        <h1 className="title-calendrier">AGENDA</h1>

        {events.map((ev) => (
          <div key={ev.id} className="body-child-event">
            <img src={getLogo(ev.game)} alt={ev.game} className="logo-child-event" />
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