//import { useAuth } from "../../contexte/useAuth";
import lol_map from "../../assets/map/lol_map.jpg";
import suport_icon from "../../assets/map/support_icon.png";
import top_icon from "../../assets/map/top_icon.png";
import mid_icon from "../../assets/map/mid_icon.png";
import bot_icon from "../../assets/map/bot_icon.png";
import jungle_icon from "../../assets/map/jungle_icon.png";

type TeamMoleculeProps = {
  top: string;
  jungle: string;
  mid: string;
  adc: string;
  support: string;
};

// Composant interne pour le marqueur (Rond noir + Nom)
const PlayerMarker = ({
  name,
  icon,
  topPos,
  leftPos,
}: {
  name: string;
  icon: string;
  topPos: string;
  leftPos: string;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: topPos,
        left: leftPos,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      {/* CORRECTION ICI : Utilisation de <img> */}
      <img
        src={icon}
        alt="Role"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "4px",
        }}
      />

      <span
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "14px",
          textShadow: "0px 1px 2px rgba(0,0,0,0.5)",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
    </div>
  );
};

export function LeagueOfLegendsSelected({
  top,
  jungle,
  mid,
  adc,
  support,
}: TeamMoleculeProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "441px",
        margin: "0 auto",
        //padding: "16px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          backgroundImage: `url(${lol_map})`,
          //borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        }}
      >
        {/* TOP : Coin haut gauche */}
        <PlayerMarker name={top} icon={top_icon} topPos="20%" leftPos="21%" />

        {/* JUNGLE : Entre Top et Mid */}
        <PlayerMarker
          name={jungle}
          icon={jungle_icon}
          topPos="50%"
          leftPos="28%"
        />

        {/* MID : Centre */}
        <PlayerMarker name={mid} icon={mid_icon} topPos="46%" leftPos="53%" />

        {/* SUPPORT : Entre Mid et Bot */}
        <PlayerMarker
          name={support}
          icon={suport_icon}
          topPos="68%"
          leftPos="63%"
        />

        {/* ADC : Coin bas droite */}
        <PlayerMarker name={adc} icon={bot_icon} topPos="77%" leftPos="90%" />
      </div>
    </div>
  );
}

export default LeagueOfLegendsSelected;
