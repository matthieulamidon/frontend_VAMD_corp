import { useState } from "react";
import { useAuth } from "../../contexte/useAuth";
import "../styles/VisuelProfile.css";
import avatar from "../../assets/avatar/avatar_par_default.png";
import { useNavigate } from "react-router-dom";

export function VisuelProfil() {
  const navigate = useNavigate();
  const { pseudo, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const isLogged = Boolean(pseudo);
  const displayPseudo = isLogged ? pseudo : "Invité";

  return (
    <div className="vp-container">
      {isLogged ? (
        <img src={avatar} alt="avatar" className="vp-avatar" />
      ) : (
        <div></div>
      )}
      {isLogged ? (
        <div className="vp-username" onClick={() => setOpen(!open)}>
          <span>{displayPseudo}</span>
          <span className={`vp-arrow ${open ? "open" : ""}`}>▼</span>
        </div>
      ) : (
        <button onClick={() => navigate("/connexion")} className="vp-login-btn">
          Connectez-vous
        </button>
      )}

      {isLogged && open && (
        <div className="vp-menu">
          <a href="/profile" className="vp-menu-item">
            Voir le profil
          </a>
          <button
            onClick={() => {
              logout();
              if (window.location.pathname === "/") {
                window.location.reload();
              } else {
                window.location.href = "/";
              }
            }}
            className="vp-menu-item btn"
          >
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
}

export default VisuelProfil;
