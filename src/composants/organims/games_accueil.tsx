import '../../App.css';
import '../../accueil.css';

const AccueilGames = () => {
    return (
        <>
            <div className='body-games-accueil'>
                <div className='title-games-accueil'>
                    NOS JEUX
                </div>
                <div className='games-list-accueil'>
                    <div className='game-item'>League of Legends</div>
                    <div className='game-item'>Valorant</div>
                    <div className='game-item'>Fortnite</div>
                </div>
            </div>
        </>
    );
};

export default AccueilGames;