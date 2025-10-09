import AccueilGames from './composants/organims/games_accueil';
import BodyAccueil from './composants/organims/bodyAccueil';
import Navbar from './composants/organims/navbar';

function Accueil() {
    return (
        <>
            <Navbar />
            <BodyAccueil />
            <AccueilGames />
        </>
    );
}

export default Accueil;