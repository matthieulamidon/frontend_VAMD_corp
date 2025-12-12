import "../styles/App.css";
import "../styles/accueil.css";

// Images
import VAMD_ekip from "../../assets/equip/equipe_projet_advm.png";

const AccueilEquip = () => {
  return (
    <div className="body-equip-accueil">
      <div className="title-games-accueil">L'ÉQUIPE QUI A FAIT LA DIFF</div>
      <div className="equip-vamd-row">
        <img src={VAMD_ekip} alt="" className="equip-img" />
        <div className="equip-description">
          <h2>L'APAGNAN CORP</h2>
          <p>
            L’Apagnan Corp est l’équipe fondatrice à l’origine du projet VAMD.
          </p>

          <hr style={{ borderColor: "red" }} />

          <p>
            Créée en 2025, elle s’est rapidement imposée comme la force motrice
            derrière le développement de l’application. Composée de membres
            passionnés, dynamiques et complémentaires, l’Apagnan Corp ne cesse
            de grandir et de se renforcer chaque jour. Grâce à son esprit
            d’innovation, sa cohésion et sa détermination, elle continue de
            repousser les limites pour offrir la meilleure expérience possible à
            la communauté VAMD.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccueilEquip;
