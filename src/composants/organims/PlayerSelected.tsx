import { useState, useEffect } from "react";
import { TeamSideList } from "../molecules/GestionDesRemplacents";
import { useAuth } from "../../contexte/useAuth";
// Assure-toi d'importer tes composants et hooks (useAuth, icon_bot, etc.) ici
// import { useAuth } from ...;
// import { ... } from ...;
import icon_bot from "../../assets/map/bot_icon.png";
import icon_coach from "../../assets/map/icone_coach.png";
import LeagueOfLegendsSelected from "../molecules/LeagueIfLeagendsSelectioned";
import { SimpleValorantSideList } from "../molecules/ValorantSelectioned";

// --- DEFINITION DES TYPES ---

// Type pour les jeux supportés dans l'état local
type GameType = "League of Legends" | "Valorant" | "Fortnite";

// Structure d'un membre venant de l'API
interface ApiMember {
  name: string;
  roleName: string;
  icon: string;
}

// Structure de l'équipe principale (flexible car change selon le jeu)
type MainTeamData = Record<string, unknown>;

// Structure de la réponse API complète
interface ApiResponse {
  gameName: "VALORANT" | "LEAGUEOFLEGENDES" | "FORTNITE";
  mainTeam: MainTeamData;
  coachData: ApiMember | null;
  subsData: ApiMember[];
  staffData: ApiMember[];
}

// Structure utilisée dans ton state (MemberProps)
// Si tu l'importes déjà d'ailleurs, tu peux supprimer cette définition
export interface MemberProps {
  name: string;
  roleName: string;
  icon: string;
}

interface LeagueTeamProps extends Record<string, unknown> {
  top: string;
  jungle: string;
  mid: string;
  adc: string;
  support: string;
}
interface ValorantTeamProps extends Record<string, unknown> {
  duelist: string;
  controller: string;
  initiator: string;
  sentinel: string;
  flex: string;
}

export function TeamPage() {
  const { teamSelect } = useAuth();

  // --- ÉTATS (STATES) ---
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState<GameType>("League of Legends");

  // Données de l'équipe
  // On remplace <any> par <MainTeamData> (ou un objet vide par défaut)
  const [mainTeamData, setMainTeamData] = useState<MainTeamData>({});

  const [coachData, setCoachData] = useState<MemberProps | undefined>(
    undefined
  );
  const [subsData, setSubsData] = useState<MemberProps[]>([]);
  const [staffData, setStaffData] = useState<MemberProps[]>([]);

  const API_URL =
    import.meta.env.VITE_BACKEND_LINK + "/api/managmentEquipe" ||
    "http://localhost:4000/api/managmentEquipe";

  // --- HELPER : Convertir l'enum API en image importée ---
  const getIconSrc = (iconName: string): string => {
    switch (iconName) {
      case "AVATAR1":
        return icon_bot;
      case "AVATAR2":
        return icon_coach; // Exemple
      default:
        return icon_bot;
    }
  };

  // --- USE EFFECT : Charger les données quand l'équipe change ---
  useEffect(() => {
    const fetchTeamData = async () => {
      console.log("Fetching data for team:", teamSelect);
      if (!teamSelect) return;

      setLoading(true);
      try {
        const response = await fetch(API_URL + "/getJoueurEquipePosition", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ equipe_name: teamSelect }),
          credentials: "include",
        });

        console.log("Response status:", response);

        if (response.ok) {
          const data: ApiResponse = await response.json();

          console.log("Données reçues de l'API :", data);

          // Gestion du nom du jeu
          if (data.gameName === "VALORANT") setGame("Valorant");
          else if (data.gameName === "LEAGUEOFLEGENDES")
            setGame("League of Legends");
          else if (data.gameName === "FORTNITE") setGame("Fortnite");

          setMainTeamData(data.mainTeam || {});

          // 3. Coach
          if (data.coachData) {
            setCoachData({
              name: data.coachData.name,
              roleName: data.coachData.roleName,
              icon: getIconSrc(data.coachData.icon),
            });
          } else {
            setCoachData(undefined);
          }

          // 4. Remplaçants
          // TypeScript sait maintenant que rawSubs est ApiMember[] grâce à l'interface ApiResponse
          const rawSubs = data.subsData || [];
          const mappedSubs: MemberProps[] = rawSubs.map((sub) => ({
            name: sub.name,
            roleName: sub.roleName,
            icon: icon_coach, // Tu avais hardcodé icon_coach ici dans ton original
          }));
          setSubsData(mappedSubs);

          // 5. Staff
          const rawStaff = data.staffData || [];
          const mappedStaff: MemberProps[] = rawStaff.map((staff) => ({
            name: staff.name,
            roleName: staff.roleName,
            icon: getIconSrc(staff.icon),
          }));
          setStaffData(mappedStaff);
        } else {
          console.error("Erreur API:", response.status);
        }
      } catch (err) {
        console.error("Erreur fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamSelect, API_URL]);

  // --- VARIABLES DE STYLE ---
  const MAP_SIZE = "441px";
  const LIST_WIDTH = "350px";
  const GOLD_COLOR = "#c9aa71";
  const RED_COLOR = "#FF4655";
  const BLUE_COLOR = "#0A74DA";

  const selectedColor =
    game === "League of Legends"
      ? GOLD_COLOR
      : game === "Valorant"
        ? RED_COLOR
        : BLUE_COLOR;

  const BORDER_STYLE = `4px solid ${selectedColor}`;

  let content;

  if (loading) {
    content = (
      <div style={{ color: "white", textAlign: "center", marginTop: "50%" }}>
        Chargement...
      </div>
    );
  } else {
    switch (game) {
      case "League of Legends":
        content = (
          <div style={{ width: "100%", height: "100%" }}>
            {/* On spread mainTeamData. TypeScript accepte car c'est un Record<string, unknown> */}
            <LeagueOfLegendsSelected {...(mainTeamData as LeagueTeamProps)} />
          </div>
        );
        break;
      case "Valorant":
        content = (
          <div style={{ width: "100%", height: "100%" }}>
            <SimpleValorantSideList {...(mainTeamData as ValorantTeamProps)} />
          </div>
        );
        break;
      default:
        content = (
          <div
            style={{
              width: "100%",
              height: "100%",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Jeu non supporté ou Fortnite
          </div>
        );
        break;
    }
  }

  if (!teamSelect) {
    return (
      <div
        style={{
          backgroundColor: "#010a13",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <h1>Veuillez sélectionner une équipe dans le menu.</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#010a13",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: selectedColor,
            fontSize: "32px",
            textTransform: "uppercase",
            letterSpacing: "4px",
            marginBottom: "20px",
            borderBottom: `2px solid ${selectedColor}`,
            paddingBottom: "8px",
            textAlign: "center",
          }}
        >
          {teamSelect} Roster
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            boxShadow: `0 0 25px ${selectedColor}60`,
          }}
        >
          {/* 1. BLOC GAUCHE : MAP */}
          <div
            style={{
              width: MAP_SIZE,
              height: MAP_SIZE,
              border: BORDER_STYLE,
              borderRight: "none",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "black",
            }}
          >
            <div style={{ width: "100%", height: "100%" }}>{content}</div>
          </div>

          {/* 2. BLOC DROIT : LISTE */}
          <div
            style={{
              width: LIST_WIDTH,
              height: MAP_SIZE,
              border: BORDER_STYLE,
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              backgroundColor: "#091428",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ height: "100%" }}>
              <TeamSideList
                coach={coachData}
                substitutes={subsData}
                staff={staffData}
                Jeux={game}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
