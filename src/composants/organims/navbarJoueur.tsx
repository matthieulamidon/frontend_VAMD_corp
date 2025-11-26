import "../styles/App.css";
import { useState } from "react";

// Images
import LogoNavbar from "../../assets/logo_vamd.png";
import ToggleHamburger from "../../assets/togglehamburger.png";
import VisuelProfil from "../molecules/VisuelProfile";
import { useAuth } from "../../contexte/useAuth";

const NavbarJoueur = () => {
  const { setTeamSelectFun } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button
            className="navbar-toggler-hamburger"
            onClick={toggleMenu}
            aria-label="Ouvrir le menu"
          >
            <img src={ToggleHamburger} alt="Menu" className="hamburger-icon" />
          </button>

          <a href="/">
            <img src={LogoNavbar} className="logoNavbar" alt="VAMD" />
          </a>

          <a href="/portail-joueur" className="btnnav">
            accueil Joueur
          </a>

          <div className="vp-username" onClick={() => setOpen(!open)}>
            <span></span>
            <a className="btnnav">Selecteur d'equipe</a>
            {/* TODO recuperer le nom de toute les equipes dans lequel tu es */}
            <span className={`vp-arrow ${open ? "open" : ""}`}>▼</span>
          </div>

          {open && (
            <div className="vp-menu">
              <button
                className="vp-menu-item btn"
                onClick={() => setTeamSelectFun("Équipe 1")}
              >
                Équipe 1
              </button>
              <button
                className="vp-menu-item btn"
                onClick={() => setTeamSelectFun("Équipe 2")}
              >
                Équipe 2
              </button>
            </div>
          )}
          <a href="/calendrier" className="btnnav">
            Calendrier
          </a>
          <a href="/evenements" className="btnnav">
            Événements
          </a>
        </div>
        <div className="navbar-right">
          <VisuelProfil />
        </div>
      </nav>

      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <VisuelProfil />
        <a href="/portail-joueur" className="btnnav">
          accueil Joueur
        </a>

        <div className="vp-username" onClick={() => setOpen(!open)}>
          <span></span>
          <a className="btnnav">Selecteur d'equipe</a>
          <span className={`vp-arrow ${open ? "open" : ""}`}>▼</span>
        </div>

        {open && (
          <div className="vp-menu">
            <button className="vp-menu-item btn">Équipe 1</button>
            <button className="vp-menu-item btn">Équipe 2</button>
          </div>
        )}
        <a href="/calendrier" className="btnnav">
          Calendrier
        </a>
        <a href="/evenements" className="btnnav">
          Événements
        </a>
        <div className="bottom-sidemenu"></div>
      </div>

      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default NavbarJoueur;
