import "../styles/App.css";
import "../styles/accueil.css";

// Images
import Bg_lol from "../../assets/games/bg_lol.png";
import Bg_valo from "../../assets/games/bg_valo.jpeg";
import Bg_fortnite from "../../assets/games/bg_fortnite.jpeg";

const AccueilGames = () => {
  return (
    <div className="body-games-accueil">
      <div className="title-games-accueil">NOS JEUX</div>
      <div className="games-list-accueil">
        <a
          href="https://www.leagueoflegends.com/fr-fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="game-item"
        >
          <h1 className="txt-game">LEAGUE OF LEGENDS</h1>
          <img src={Bg_lol} alt="" className="game-img" />
        </a>

        <a
          href="https://playvalorant.com/fr-fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="game-item"
        >
          <h1 className="txt-game">VALORANT</h1>
          <img src={Bg_valo} alt="" className="game-img" />
        </a>

        <a
          href="https://www.fortnite.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="game-item"
        >
          <h1 className="txt-game">FORTNITE</h1>
          <img src={Bg_fortnite} alt="" className="game-img" />
        </a>
      </div>
    </div>
  );
};

export default AccueilGames;
