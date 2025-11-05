import '../../App.css';
import '../../Accueil.css';
import './Calendrier.css';


// Images
import ApagnanLogoEkip from '../../assets/equip/logo_apagnan_corp.png';



const BodyEvenement = () => {
  return (
    <div className="body-calendrier">
      <div className="body-left-calendrier">  
        <div className=''></div>
      </div>
      <div className="body-middle-calendrier">

      </div>
      <div className="body-right-calendrier">
        <div className='classmnt-content'>
          <h2 className='title-classmnt'>Classement</h2>
          <h6 className='subtitle-classmnt'>synchronisée par AD</h6>
          <hr />
          <div className='child-ekip-classmnt'>
            <h2 className='num-ekip-classment'>1</h2>
            <img src={ApagnanLogoEkip} alt="" className='equip-apagnan-img' />
            <h3 className='name-ekip-classment'>L'Apagnan Corp</h3>
          </div>
          <hr />
          <div className='child-ekip-classmnt'>
            <h2 className='num-ekip-classment'>2</h2>
            <img src={ApagnanLogoEkip} alt="" className='equip-apagnan-img' />
            <h3 className='name-ekip-classment'>Squeezie Corp</h3>
          </div>
          <hr />
          <div className='child-ekip-classmnt'>
            <h2 className='num-ekip-classment'>3</h2>
            <img src={ApagnanLogoEkip} alt="" className='equip-apagnan-img' />
            <h3 className='name-ekip-classment'>Evan Corp</h3>
          </div>
          <hr />
        </div>
      </div>
    </div >
  );
};

export default BodyEvenement;
