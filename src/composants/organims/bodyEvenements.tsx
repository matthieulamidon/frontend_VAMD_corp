import React, { useEffect, useState } from "react";
import "../styles/App.css";
import "../styles/accueil.css";
import "../styles/events.css";
import TournoiCard from "../molecules/TournoiCard";

// Logos jeux
import Logo_LoL from "../../assets/games/logos_games/logo_lol.png";
import Logo_Valo from "../../assets/games/logos_games/logo_valo.png";
import Logo_Fortnite from "../../assets/games/logos_games/logo_fortnite.png";
import Logo_Fc26 from "../../assets/games/logos_games/logo_fc26.png";
import Logo_Pokemon from "../../assets/games/logos_games/pokemon.png";
import Logo_RocketL from "../../assets/games/logos_games/logo_rocket_league.png";
import Logo_OW from "../../assets/games/logos_games/logo_ow.png";

// Logos tournois


// Logos divers
import Logo_Apagnan from "../../assets/logo_vamd_icon.png";
import Logo_Betway from "../../assets/logo_betway.png";

interface GrandEvent {
  id: number;
  titre: string;
  type_event: string;
  date_heure_debut: string;
  date_heure_fin: string;
  lieu?: string | null;
  description?: string | null;
  org_logo?: string | null;
  game_logo?: string | null;
  prize?: string | null;
}

const mapGameLogo = (type_event: string) => {
  switch (type_event.toLowerCase()) {
    case "valorant":
      return Logo_Valo;
    case "leagueoflegendes":
      return Logo_LoL;
    case "fortnite":
      return Logo_Fortnite;
    default:
      return Logo_LoL;
  }
};

const BodyEvenement: React.FC = () => {
  const [events, setEvents] = useState<GrandEvent[]>([]);

  useEffect(() => {
    const fetchGrandEvents = async () => {
      try {
        const res = await fetch(
          (import.meta.env.VITE_BACKEND_LINK ?? "http://localhost:4000") + "/api/grandevent"
        );
        if (!res.ok) throw new Error("Erreur récupération grands événements");
        const data: GrandEvent[] = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGrandEvents();
  }, []);

  return (
    <div className="body-events">
      <div className="filter-games-events">
        <div className="body-filter-games-events">
          <div className="filter-tous-games-events">TOUS</div>
          <div className="filter-logo-games-events">
            <img src={Logo_Valo} alt="Valo" className="game-logo-filter-img" />
          </div>
          <div className="filter-logo-games-events">
            <img src={Logo_LoL} alt="Lol" className="game-logo-filter-img" />
          </div>
          <div className="filter-logo-games-events">
            <img src={Logo_Fortnite} alt="Fortnite" className="game-logo-filter-img" />
          </div>
          <div className="filter-logo-games-events">
            <img src={Logo_Fc26} alt="Fc26" className="game-logo-filter-img" />
          </div>
          <div className="filter-logo-games-events">
            <img src={Logo_Pokemon} alt="Pokemon" className="game-logo-filter-img pokemon" />
          </div>
          <div className="filter-logo-games-events">
            <img src={Logo_RocketL} alt="Rocket League" className="game-logo-filter-img" />
          </div>
          <div className="filter-logo-games-events">
            <img src={Logo_OW} alt="OverWatch" className="game-logo-filter-img" />
          </div>
        </div>
      </div>

      <div className="body-content-events">
        <div className="body-left-events">
          <div className="text-title-events">
            VAMD.corp / Calendrier des événements et des tournois
          </div>
          <div className="rubrique-partie-tournois-title-body">
            TOURNOIS ESPORT
          </div>

          {events.map((event) => (
            <TournoiCard
              key={event.id}
              title={event.titre}
              gameLogo={event.game_logo ? event.game_logo : mapGameLogo(event.type_event)}
              startDate={new Date(event.date_heure_debut).toLocaleDateString("fr-FR")}
              endDate={new Date(event.date_heure_fin).toLocaleDateString("fr-FR")}
              orgLogo={event.org_logo ?? Logo_Apagnan}
              location={event.lieu ?? "En ligne"}
              prize={event.prize ?? ""}
              ekips={[Logo_Apagnan, Logo_Apagnan, Logo_Apagnan]} // Si tu as les logos équipes dynamiques, on peut adapter ici
            />
          ))}
        </div>

        <div className="body-right-events">
          <a
            className="paris-celsius"
            href="https://new.betway.co.za"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="txt-betway">
              Mets un pari. <br /> Ta dignité ? Elle respawn.
            </div>
            <img src={Logo_Betway} alt="BetWay" className="img-betway" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BodyEvenement;
