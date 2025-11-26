import BodyAccueil from "../organims/bodyAccueil";
import Navbar from "../organims/navbar";
import AccueilGames from "../organims/games_accueil";
import AccueilEquip from "../organims/equip_accueil";
import Footer from "../organims/footer";

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
