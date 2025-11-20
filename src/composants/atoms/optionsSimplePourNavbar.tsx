import { useAuth } from "../../contexte/useAuth";
import "../styles/App.css";

export function OptionSimplePourNavbar() {
  const { role } = useAuth();

  let content;

  switch (role) {
    case "ADMIN":
      content = (
        <div>
          <a href="/admin" className="btnnav">
            Panel Admin
          </a>
        </div>
      );
      break;
    case "COACH":
      content = (
        <div>
          {/* TODO : a linker */}
          <a href="/profile" className="btnnav">
            Portail Coach
          </a>
        </div>
      );
      break;
    case "JOUEUR":
      content = (
        <div>
          <a href="/portail-joueur" className="btnnav">
            Portail Joueur
          </a>
        </div>
      );
      break;
    case "USER":
      content = (
        <div>
          <a href="/postulation" className="btnnav">
            Postuler
          </a>
        </div>
      );
      break;
    default:
      content = (
        <div>
          {/* TODO : a linker */}
          <a href="/connexion" className="btnnav">
            connexion
          </a>
        </div>
      );
  }

  return <>{content}</>;
}

export default OptionSimplePourNavbar;
