import { useAuth } from "../../contexte/useAuth";
import "../styles/App.css";

export function OptionSimplePourNavbar() {
  const { role } = useAuth();

  let content;
  console.log("role", role);

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
    case "PATRON":
      content = (
        <div>
          <a href="/portail-patron" className="btnnav btntogglecoach">
            Portail Patron
          </a>
        </div>
      );
      break;
    case "COACH":
      content = (
        <div>
          <a href="/portail-coach" className="btnnav">
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
  }

  return <>{content}</>;
}

export default OptionSimplePourNavbar;
