import "../styles/App.css";
import { useEffect, useState } from "react";

// Images
import LogoNavbar from "../../assets/logo_vamd.png";
import ToggleHamburger from "../../assets/togglehamburger.png";
import VisuelProfil from "../molecules/VisuelProfile";
import { useAuth } from "../../contexte/useAuth";

const NavbarJoueur = () => {
  const { teamSelect, setTeamSelectFun } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 2. État local pour stocker la liste des équipes venant de l'API
  const [teams, setTeams] = useState<string[]>([]);

  const API_URL =
    import.meta.env.VITE_BACKEND_LINK + "/api/managmentEquipe" ||
    "http://localhost:4000/api/managmentEquipe";

  // 3. Charger les équipes au montage du composant
  useEffect(() => {
    const fetchPlayerTeams = async (): Promise<string[] | false> => {
      try {
        const response = await fetch(API_URL + "/getAllEquipeOfPlayer", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) return false;
        if (!response.ok) throw new Error("Erreur serveur");

        const data = await response.json();

        if (data.equipes) {
          return data.equipes;
        } else {
          return false;
        }
      } catch (err) {
        console.error("Erreur checkAuth:", err);
        return false;
      }
    };

    const loadTeams = async () => {
      const teamList = await fetchPlayerTeams();
      if (teamList && Array.isArray(teamList)) {
        setTeams(teamList);
      }
    };
    loadTeams();
  }, [API_URL]);

  // Fonction utilitaire pour gérer le clic sur une équipe
  const handleTeamClick = (teamName: string) => {
    setTeamSelectFun(teamName);
    setOpen(false); // Ferme le menu déroulant après sélection
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

          <a href="/portail-coach" className="btnnav">
            Accueil Coach
          </a>

          <div className="vp-username" onClick={() => setOpen(!open)}>
            <span></span>
            <a className="btnnav btnekipnavbarcoach">
              {teamSelect ? teamSelect : "Sélecteur d'équipe"}
            </a>
            <span className={`vp-arrow ${open ? "open" : ""}`}>▼</span>
          </div>

          {open && (
            <div className="vp-menu">
              {teams.length > 0 ? (
                teams.map((teamName, index) => (
                  <button
                    key={index}
                    className={`vp-menu-item btn ${teamSelect === teamName ? "active" : ""}`}
                    onClick={() => handleTeamClick(teamName)}
                  >
                    {teamName}
                  </button>
                ))
              ) : (
                <div className="vp-menu-item">Aucune équipe</div>
              )}
            </div>
          )}
          

          <a href="/calendrier" className="btnnav">
            Calendrier
          </a>
          <a href="/evenements" className="btnnav btneventsnavcoach">
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
          Accueil Joueur
        </a>

        {/* Menu Latéral : Même logique que la navbar principale */}
        <div className="vp-username" onClick={() => setOpen(!open)}>
          <span></span>
          <a className="btnnav">
            {teamSelect ? teamSelect : "Sélecteur d'équipe"}
          </a>
          <span className={`vp-arrow ${open ? "open" : ""}`}>▼</span>

          {open && (
            <div className="vp-menu">
              {teams.length > 0 ? (
                teams.map((teamName, index) => (
                  <button
                    key={index}
                    className={`vp-menu-item btn ${teamSelect === teamName ? "active" : ""}`}
                    onClick={() => handleTeamClick(teamName)}
                  >
                    {teamName}
                  </button>
                ))
              ) : (
                <div className="vp-menu-item">Aucune équipe</div>
              )}
            </div>
          )}
        </div>

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
