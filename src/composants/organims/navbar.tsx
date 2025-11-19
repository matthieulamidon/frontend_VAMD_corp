import "../../App.css";
import { useState } from "react";

// Images
import LogoNavbar from "../../assets/logo_vamd.png";
import ToggleHamburger from "../../assets/togglehamburger.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

          <a href="/" className="btnnav">
            Accueil
          </a>
          <a href="/calendrier" className="btnnav">
            Calendrier
          </a>
          <a href="/evenements" className="btnnav">
            Événements
          </a>
          <a href="/postulation" className="btnnav">
            Postuler
          </a>
        </div>
        <div className="navbar-right">
          <a href="/connexion" className="btnconnexion">
            Connectez-vous
          </a>
        </div>
      </nav>

      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <a href="/connexion" className="btnconnexion-sidemenu">
          Connexion
        </a>
        <a href="/" onClick={toggleMenu}>
          Accueil
        </a>
        <a href="/calendrier" onClick={toggleMenu}>
          Calendrier
        </a>
        <a href="/evenements" onClick={toggleMenu}>
          Événements
        </a>
        <a href="/postulation" onClick={toggleMenu}>
          Postuler
        </a>
        <div className="bottom-sidemenu"></div>
      </div>

      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default Navbar;
