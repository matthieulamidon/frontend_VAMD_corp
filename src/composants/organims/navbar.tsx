import "../../App.css";
import { useState } from "react";

// Images
import LogoNavbar from "../../assets/logo_vamd.png";
import ToggleHamburger from "../../assets/togglehamburger.png";
import VisuelProfil from "../molecules/VisuelProfile";
import OptionSimplePourNavbar from "../atoms/optionsSimplePourNavbar";

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

          <OptionSimplePourNavbar />
          <a href="/calendrier" className="btnnav">
            Calendrier
          </a>
          <a href="/événements" className="btnnav">
            Événements
          </a>
          <a href="/produits" className="btnnav">
            Produits
          </a>
        </div>
        <div className="navbar-right">
          <VisuelProfil />
        </div>
      </nav>

      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <VisuelProfil />
        <a href="/" onClick={toggleMenu}>
          Accueil
        </a>
        <a href="/calendrier" onClick={toggleMenu}>
          Calendrier
        </a>
        <a href="/événements" onClick={toggleMenu}>
          Événements
        </a>
        <a href="/produits" onClick={toggleMenu}>
          Produits
        </a>
        <div className="bottom-sidemenu"></div>
      </div>

      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default Navbar;
