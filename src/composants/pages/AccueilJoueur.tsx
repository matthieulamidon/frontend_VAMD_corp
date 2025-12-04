import { TeamPage } from "../organims/PlayerSelected";
import NavbarJoueur from "../organims/navbarJoueur";

function AccueilPortailJoueur() {
  return (
    <>
      <NavbarJoueur />
      <br></br>
      <br></br>
      <h1>Bienvenue sur le portail joueur</h1>
      <TeamPage />
    </>
  );
}
export default AccueilPortailJoueur;
