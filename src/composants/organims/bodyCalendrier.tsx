import React, { useEffect, useState } from "react";
import "../styles/App.css";
import "../styles/accueil.css";
import "../styles/Calendrier.css";

// Images
import Logo_LoL from "../../assets/games/logos_games/logo_lol.png";
import Logo_Valo from "../../assets/games/logos_games/logo_valo.png";
import Logo_Fortnite from "../../assets/games/logos_games/logo_fortnite.png";

// Calendrier
import FullCalendar from "@fullcalendar/react"; // @fullcalendar/react
import dayGridPlugin from "@fullcalendar/daygrid";
import frLocale from "@fullcalendar/core/locales/fr";
import type { EventClickArg } from "@fullcalendar/core";

interface AgendaEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  game: "lol" | "valo" | "fortnite";
  lieu?: string | null;
  description?: string | null;
}

interface BackendEvent {
  id_event: number;
  titre_event: string;
  date_heure_debut: string;
  date_heure_fin: string;
  type_event: string;
  lieu?: string | null;
  description?: string | null;
}

// Convertit l'ENUM backend vers les valeurs front
const mapBackendEnumToFront = (e: string): "lol" | "valo" | "fortnite" => {
  switch (e) {
    case "LEAGUEOFLEGENDES":
      return "lol";
    case "VALORANT":
      return "valo";
    case "FORTNITE":
      return "fortnite";
    default:
      return "lol";
  }
};

const BodyCalendrier: React.FC = () => {
  const EVENTS_API_URL =
    (import.meta.env.VITE_BACKEND_LINK ?? "https://backend-vamd-corp.onrender.com") + "/api/events";

  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<AgendaEvent | null>(null);

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
        const res = await fetch(`${EVENTS_API_URL}/events`);
        if (!res.ok) throw new Error("Erreur lors de la récupération des événements");

        const data: BackendEvent[] = await res.json();
        const formatted: AgendaEvent[] = data.map((ev) => ({
          id: ev.id_event.toString(),
          title: ev.titre_event,
          start: ev.date_heure_debut,
          end: ev.date_heure_fin,
          allDay: false,
          game: mapBackendEnumToFront(ev.type_event),
          lieu: ev.lieu,
          description: ev.description,
        }));

        setEvents(formatted);

        // Sélection automatique du premier event
        if (formatted.length > 0) setSelectedEvent(formatted[0]);
      } catch (err) {
        console.error("Erreur fetchEvents:", err);
      }
    };

    fetchEvents();
  }, [EVENTS_API_URL]);


  // Click sur un événement du calendrier
  const handleEventClick = (clickInfo: EventClickArg) => {
    const ev = events.find((e) => e.id === clickInfo.event.id);
    if (ev) setSelectedEvent(ev);
  };

  return (
    <div className="body-calendrier">
      {/* Colonne gauche : liste des événements */}
      <div className="body-left-calendrier">
        <h1 className="title-calendrier">AGENDA</h1>
        {events.map((ev) => (
          <div
            key={ev.id}
            className="body-child-event"
            onClick={() => setSelectedEvent(ev)}
          >
            <img
              src={getLogo(ev.game)}
              alt={ev.game}
              className="logo-child-event"
            />
            <h3 className="subtitle-child-calendrier">{ev.title}</h3>
            <span className="date-child-event">
              {new Date(ev.start).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
              })}
              {ev.end &&
                " - " +
                  new Date(ev.end).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
            </span>
          </div>
        ))}
      </div>

      {/* Calendrier central */}
      <div className="body-middle-calendrier">
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            locale={frLocale}
            eventDisplay="block"
            eventClick={handleEventClick}
            timeZone="UTC"
          />
        </div>
      </div>

      {/* Colonne droite : détails de l'événement sélectionné */}
      <div className="body-right-calendrier">
        {selectedEvent ? (
          <div className="event-details">
            <div className="title-calendrier title-descrip-event">
              {selectedEvent.title}
            </div>
            <div className="separation sep-des-event"></div>
            <img
              src={getLogo(selectedEvent.game)}
              alt={selectedEvent.game}
              className="logo-descrptn-child-event"
            />
            <p>
              <div className="content-descrptn-event-jeu">
                <strong>Jeu :</strong> {selectedEvent.game.toUpperCase()}
              </div>
              <div className="content-descrptn-event-jeu">
                <strong>Date :</strong> {new Date(selectedEvent.start).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", })}
                <div className="content-descrptn-event-horaires">
                  {new Date(selectedEvent.start).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", })}
                  {"  ⟼  "}
                  {selectedEvent.end && (
                    <>
                      {new Date(selectedEvent.end).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", })}
                    </>
                  )}
                </div>
              </div>
              <div className="content-descrptn-event-jeu">
                {selectedEvent.lieu && (
                  <>
                    <strong>Lieu :</strong> {selectedEvent.lieu} <br />
                    {selectedEvent.lieu && (
                      <div className="map-container">
                        <iframe src={`https://www.google.com/maps?q=${encodeURIComponent(selectedEvent.lieu)}&output=embed`}></iframe>
                      </div>
                    )}

                  </>
                )}
              </div>
              <div className="content-descrptn-event-description">
                {selectedEvent.description && (
                  <>
                    <strong className="description-title">Note(s) :</strong> {selectedEvent.description} <br />
                  </>
                )}
              </div>
            </p>
          </div>
        ) : (
          <p>Sélectionnez un événement pour voir les détails</p>
        )}
      </div>
    </div>
  );
};

export default BodyCalendrier;
