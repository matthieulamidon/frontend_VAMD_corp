import '../../App.css';
import '../../Accueil.css';
import './events.css';


// Images
import Logo_LoL from "../../assets/games/logos_games/logo_lol.png";
import Logo_Valo from "../../assets/games/logos_games/logo_valo.png";
import Logo_Fortnite from "../../assets/games/logos_games/logo_fortnite.png";
import Logo_Fc26 from "../../assets/games/logos_games/logo_fc26.png";
import Pokemon from "../../assets/games/logos_games/pokemon.png";



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
            <img src={Pokemon} alt="Pokemon" className="game-logo-filter-img pokemon" />
          </div>
        </div>
      </div >
    </div>
  );
};

export default BodyEvenement;
