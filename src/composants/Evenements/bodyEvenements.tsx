import '../../App.css';
import '../../Accueil.css';
import './events.css';
import TournoiCard from "./TournoiCard.tsx";


// Images
import Logo_LoL from "../../assets/games/logos_games/logo_lol.png";
import Logo_Valo from "../../assets/games/logos_games/logo_valo.png";
import Logo_Fortnite from "../../assets/games/logos_games/logo_fortnite.png";
import Logo_Fc26 from "../../assets/games/logos_games/logo_fc26.png";
import Logo_Pokemon from "../../assets/games/logos_games/pokemon.png";
import Logo_RocketL from "../../assets/games/logos_games/logo_rocket_league.png";
import Logo_OW from "../../assets/games/logos_games/logo_ow.png";

import Blast from "../../assets/equip/logos_tournois/logo_blast.png";
import GVC from "../../assets/equip/logos_tournois/logo_GVC.png";
import GC from "../../assets/equip/logos_tournois/logo_game_changer.png";
import PkmIntern from "../../assets/equip/logos_tournois/logo_pokemon_ekip.png";
import Nova from "../../assets/equip/logos_tournois/logo_nova.png";
import MCC from "../../assets/equip/logos_tournois/logo_mcc.png";
import Saudi from "../../assets/equip/logos_tournois/logo_saudi_league.png";
import Pannuhuone from "../../assets/equip/logos_tournois/logo_pannuhuone.png";
import Teamsecret from "../../assets/equip/logos_tournois/logo_teamsecret.png";

import Logo_Apagnan from "../../../public/logo_vamd_icon.png";
import Logo_Betway from "../../assets/logo_betway.png";



const BodyEvenement = () => {
  return (
    <div className="body-events">
      <div className="filter-games-events">
        <div className="body-filter-games-events">
          <div className="filter-tous-games-events">
            TOUS
          </div>
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
      </div >

      <div className="body-content-events">
        <div className="body-left-events">
          {/* contenu gauche */}
          <div className='text-title-events'>VAMD.corp / Calendrier des événements et des tournois</div>
          <div className='rubrique-partie-tournois-title-body'>
            TOURNOIS ESPORT
          </div>
          <div className="rubrique-partie-tournois-subtitles-container">
            <div className="rubrique-partie-tournois-title-body rubrique-partie-tournois-subtitle-body">
              Tournois à venir
            </div>
            <div className="rubrique-partie-tournois-title-body rubrique-partie-tournois-subtitle-body">
              Tournois en cours
            </div>
            <div className="rubrique-partie-tournois-title-body rubrique-partie-tournois-subtitle-body">
              Tournois passés
            </div>
          </div>

          <div className='rubrique-partie-tournois-title-body'>
            TOURNOIS EN COURS
          </div>

          <TournoiCard
            title="PUBG Global Championship 2025"
            gameLogo={Logo_Fortnite}
            startDate="07.11.25"
            endDate="29.11.25"
            orgLogo={Blast}
            location="Manchester"
            prize="$863,170"
            ekips={[Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan]}
          />

          <TournoiCard
            title="BLAST Slam V"
            gameLogo={Logo_Valo}
            startDate="16.11.25"
            endDate="30.11.25"
            orgLogo={GVC}
            location="China"
            prize="$60,438"
            ekips={[Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan]}
          />

          <div className='rubrique-partie-tournois-title-body'>
            TOURNOIS À VENIR
          </div>

          <TournoiCard
            title="VALORANT Game Changers Championship 2025"
            gameLogo={Logo_Valo}
            startDate="20.12.25"
            endDate="30.12.25"
            orgLogo={GC}
            location="South Korea"
            prize="$500,000"
            ekips={[Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan]}
          />

          <TournoiCard
            title="2026 Pokémon Latin America International Championships - TCG"
            gameLogo={Logo_Pokemon}
            startDate="21.12.25"
            endDate="23.12.25"
            orgLogo={PkmIntern}
            location="Brazil"
            prize="$240,000"
            ekips={[Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan]}
          />

          <TournoiCard
            title="Nova Series: Prélude"
            gameLogo={Logo_LoL}
            startDate="22.12.25"
            endDate="06.01.26"
            orgLogo={Nova}
            location="France, Paris"
            prize="$11,159"
            ekips={[Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan]}
          />

          <div className='rubrique-partie-tournois-title-body'>
            TOURNOIS PASSÉS
          </div>

          <TournoiCard
            title="Monthly Cash Cup: 3v3 Rumble August - Middle East and North Africa"
            gameLogo={Logo_RocketL}
            startDate="20.08.25"
            endDate="23.08.25"
            orgLogo={MCC}
            location="Online"
            prize="$9,400 USD"
            ekips={[Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan]}
          />

          <TournoiCard
            title="Saudi eLeague 2025 - Major 3"
            gameLogo={Logo_OW}
            startDate="16.09.25"
            endDate="10.10.25"
            orgLogo={Saudi}
            location="Saudi Arabia"
            prize="$32,024"
            ekips={[Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan, Logo_Apagnan]}
          />
        </div>


        <div className="body-right-events">
          {/* contenu droite */}
          <a className='paris-celsius' href="https://new.betway.co.za" target="_blank" rel="noopener noreferrer">
            <div className='txt-betway' >Mets un pari. <br />  Ta dignité ? Elle respawn.</div>
            <img src={Logo_Betway} alt="BetWay" className="img-betway" />
          </a>

          <div className='rubrique-partie-tournois-title-body'>
            MATCH DU JOUR
          </div>

          <div className='match-du-jour'>
            <div className='txt-match-du-jour' >T2 Grand Finals Europe 2025-2026</div>
            <div className="content-match-day">
              <div className="content-col-matchday">
                <img src={Pannuhuone} alt="Pannuhuone" className="img-logo-matchday" />
                pannuhuone
              </div>

              <div className="content-col-matchday hour-col-matchday">
                <div className='date-matchday'>
                  {new Date().toLocaleDateString('fr-FR')}
                  <div style={{ fontSize: '2rem' }}>19:00</div>
                  Bo3
                </div>
              </div>

              <div className="content-col-matchday">
                <img src={Teamsecret} alt="Teamsecret" className="img-logo-matchday teamsecret" />
                teamsecret
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyEvenement;