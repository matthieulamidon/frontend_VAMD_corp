import '../../App.css';
import '../../Accueil.css';
import './Calendrier.css';

// Images
import Logo_LoL from "../../assets/games/logos_games/logo_lol.png";



const BodyCalendrier = () => {
  const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const daysInMonth = 31;
  const firstDayIndex = 2; // En gros, 0 = Lundi, donc pr octobre le mois commence un mercredi = index 2

  const blanks = Array(firstDayIndex).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="body-calendrier">
      <div className="body-left-calendrier">
        <h1 className="title-calendrier">AGENDA</h1>
        <div className="body-child-event">
          <img src={Logo_LoL} alt="lol" className="logo-child-event" />
          <h3 className="subtitle-child-calendrier">Entrainement LoL ADC</h3>
        </div>
      </div>

      <div className="body-middle-calendrier">
        <div className="calendar-container">
          <div className="calendar-header">
            <h1 className='month-calendar'>Octobre 2025</h1>
          </div>

          <div className="calendar-grid">
            {daysOfWeek.map((day) => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}

            {blanks.map((_, i) => (
              <div key={`blank-${i}`} className="calendar-cell blank"></div>
            ))}

            {days.map((day) => (
              <div key={day} className="calendar-cell">
                <span>{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="body-right-calendrier">

      </div>
    </div >
  );
};

export default BodyCalendrier;
