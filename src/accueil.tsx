import AccueilGames from './composants/accueil_games';
import BodyAccueil from './composants/bodyAccueil';
import Navbar from './composants/navbar';

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