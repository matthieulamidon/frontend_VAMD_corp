import BodyAccueil from "./composants/organims/bodyAccueil";
import Navbar from "./composants/organims/navbar";
import AccueilGames from "./composants/organims/games_accueil";
import AccueilEquip from "./composants/organims/equip_accueil";
import Footer from "./composants/organims/footer";

function Accueil() {
  return (
    <>
      <Navbar />
      <BodyAccueil />
      <AccueilGames />
      <AccueilEquip />
      <Footer />
    </>
  );
}

export default Accueil;
