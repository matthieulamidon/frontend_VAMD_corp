import { useAuth } from "../../contexte/useAuth";

export function OptionSimplePourNavbar() {
  const { role } = useAuth();

  let content;

  switch (role) {
    case "ADMIN":
      content = (
        <div>
          <a href="/admin" className="vp-menu-item">
            Panel Admin
          </a>
        </div>
      );
      break;
    case "COACH":
      content = (
        <div>
          {/* TODO : a linker */}
          <a href="/profile" className="vp-menu-item">
            Portail Coach
          </a>
        </div>
      );
      break;
    case "JOUEUR":
      content = (
        <div>
          <a href="/portail-joueur" className="vp-menu-item">
            Portail Joueur
          </a>
        </div>
      );
      break;
    default:
      content = (
        <div>
          {/* TODO : a linker */}
          <a href="/profile" className="vp-menu-item">
            postuler pour rejoindre une équipe
          </a>
        </div>
      );
  }

  return <>{content}</>;
}

export default OptionSimplePourNavbar;
