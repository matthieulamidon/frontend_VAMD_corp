import React from "react";

interface TournoiCardProps {
  title: string;
  gameLogo: string;
  startDate: string;
  endDate: string;
  orgLogo: string;
  location: string;
  prize: string;
  ekips: string[];
}

const TournoiCard: React.FC<TournoiCardProps> = ({
  title,
  gameLogo,
  startDate,
  endDate,
  orgLogo,
  location,
  prize,
  ekips,
}) => {
  return (
    <div className="body-tournois-en-cours">
      <div className="top-row">
        <div className="title-tournoi">{title}</div>
        <div className="logo-jeu-tournoi">
          <img
            src={gameLogo}
            alt="game"
            className="game-logo-filter-img img-logo-game-tournoi"
          />
        </div>
      </div>

      <div className="separation" />

      <div className="content-tournoi">
        <div className="content-col">
          <div className="content-tournoi-time">Date de début: {startDate}</div>
          <div className="content-tournoi-limittime">
            Date d'achèvement: {endDate}
          </div>
        </div>

        <div className="content-col logo-col">
          <img src={orgLogo} alt="org" className="img-logo-tournoi" />
        </div>

        <div className="content-col">
          <div className="content-tournoi-loc">Localisation: {location}</div>
          <div className="content-tournoi-gain">Cagnotte: {prize}</div>
        </div>
      </div>

      <div className="separation" />

      <div className="ekips-select-event">
        {ekips.map((logo: string, index: number) => (
          <img
            key={index}
            src={logo}
            alt="equipe"
            className="img-logo-ekips-tournoi"
          />
        ))}
      </div>
    </div>
  );
};

export default TournoiCard;
