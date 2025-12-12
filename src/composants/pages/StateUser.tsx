import DataPlayerCard from "../molecules/DataPlayerCard";
import NavbarJoueur from "../organims/navbarJoueur";
import { useAuth } from "../../contexte/useAuth";

function StateUser() {
  const openModal = true;
  const { pseudo } = useAuth();
  const selectedPlayer = pseudo;

  return (
    <>
      <NavbarJoueur />
      <br></br>
      <br></br>
      <br></br>
      <DataPlayerCard
        nameUser={selectedPlayer}
        isOpen={openModal}
        onClose={() => window.history.back()}
      />
    </>
  );
}
export default StateUser;
