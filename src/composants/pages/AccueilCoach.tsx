import NavbarJoueur from "../organims/navbarJoueur";
import TeamManager from "../organims/TeamManager";

function AccueilPortailCoach() {
  return (
    <>
      <NavbarJoueur />
      <br></br>
      <br></br>
      <h1>Bienvenue sur le portail coach</h1>
      <TeamManager />
    </>
  );
}
export default AccueilPortailCoach;
