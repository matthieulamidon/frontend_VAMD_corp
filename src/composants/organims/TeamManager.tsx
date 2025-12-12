import { useEffect, useState } from "react";
import { useAuth } from "../../contexte/useAuth";
import icon_bot from "../../assets/map/bot_icon.png";
import DataPlayerCard from "../molecules/DataPlayerCard";
import "../styles/accueilCoach.css";

// --- TYPES ---
type GameType = "League of Legends" | "Valorant" | "Fortnite";

interface PlayerEditState {
  pseudo: string;
  role: string; // TITULAIRE, REMPLACANT, COACH, STAFF
  position: string;
  avatar?: string;
}

interface ApiMember {
  name: string;
  roleName: string;
  icon?: string;
}

// --- CONSTANTES ---
const ROLES = ["TITULAIRE", "REMPLACANT", "COACH", "CHEFDEQUIPE", "MEMBRE"];
const POSITIONS_LOL = ["TOP", "JUNGLE", "MID", "ADC", "SUPPORT"];
const POSITIONS_VALO = ["DUELIST", "SENTINEL", "INITIATOR", "CONTROLLER", "FLEX"];
const POSITIONS_OTHER = ["POLYVALENT"];

export const TeamManager = () => {
  const { teamSelect } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [game, setGame] = useState<GameType>("League of Legends");
  const [players, setPlayers] = useState<PlayerEditState[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const API_URL = import.meta.env.VITE_BACKEND_LINK + "/api/managmentEquipe" || "http://localhost:4000/api/managmentEquipe";

  useEffect(() => {
    if (!teamSelect) return;

    const fetchCurrentRoster = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL + "/getJoueurEquipePosition", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ equipe_name: teamSelect }),
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          let detectedGame: GameType = "League of Legends";
          if (data.gameName === "VALORANT") detectedGame = "Valorant";
          else if (data.gameName === "FORTNITE") detectedGame = "Fortnite";
          setGame(detectedGame);

          const allPlayers: PlayerEditState[] = [];

          if (data.mainTeam) {
            Object.entries(data.mainTeam).forEach(([pos, pseudo]) => {
              if (typeof pseudo === "string") {
                allPlayers.push({ pseudo, role: "TITULAIRE", position: pos.toUpperCase() });
              }
            });
          }

          (data.subsData || []).forEach((sub: ApiMember) => {
            const cleanPos = sub.roleName.replace(" Sub", "").toUpperCase();
            allPlayers.push({ pseudo: sub.name, role: "REMPLACANT", position: cleanPos });
          });

          if (data.coachData) {
            allPlayers.push({ pseudo: data.coachData.name, role: "COACH", position: "POLYVALENT" });
          }

          (data.staffData || []).forEach((staff: ApiMember) => {
            allPlayers.push({ pseudo: staff.name, role: "MEMBRE", position: "POLYVALENT" });
          });

          setPlayers(allPlayers);
        }
      } catch (error) {
        console.error("Erreur chargement roster:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentRoster();
  }, [API_URL, teamSelect]);

  const handlePlayerChange = (index: number, field: "role" | "position", value: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setPlayers(updatedPlayers);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = players.map((p) => ({ pseudo: p.pseudo, poste: p.position, sous_role: p.role }));
      const response = await fetch(API_URL + "/updateEquipePositions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ equipe_name: teamSelect, updates }),
        credentials: "include",
      });

      if (response.ok) {
        alert("Composition mise à jour avec succès !");
        window.location.reload();
      } else {
        const err = await response.json();
        alert("Erreur: " + err.message);
      }
    } catch (error) {
      console.error("Erreur save:", error);
      alert("Erreur de connexion serveur");
    } finally {
      setSaving(false);
    }
  };

  const handleOpenProfile = (pseudo: string) => {
    setSelectedPlayer(pseudo);
    setIsModalOpen(true);
  };

  const availablePositions =
    game === "League of Legends"
      ? POSITIONS_LOL
      : game === "Valorant"
        ? POSITIONS_VALO
        : POSITIONS_OTHER;

  if (!teamSelect) return <div className="text-white">Sélectionnez une équipe.</div>;
  if (loading) return <div className="text-white">Chargement des joueurs...</div>;

  return (
    <div className="body-team-manager">
      <div className="team-manager-container">
        <div className="padding-team-manager">
        <h2 className="team-manager-title">Gestion de l'effectif : {teamSelect}</h2>
        <p className="team-manager-game">Jeu détecté : {game}</p>

        <div className="team-manager-table-container">
          <table className="team-manager-table">
            <thead>
              <tr>
                <th>Joueur</th>
                <th>Rôle (Statut)</th>
                <th>Poste (Jeu)</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td>
                    <div
                      className="player-name-wrapper"
                      onClick={() => handleOpenProfile(player.pseudo)}
                      title="Voir la carte du joueur"
                    >
                      <img src={icon_bot} alt="avatar" className="player-avatar" />
                      <span className="player-pseudo">{player.pseudo}</span>
                    </div>
                  </td>

                  <td>
                    <select
                      value={player.role}
                      onChange={(e) => handlePlayerChange(index, "role", e.target.value)}
                      className="team-manager-select"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select
                      value={player.position}
                      onChange={(e) => handlePlayerChange(index, "position", e.target.value)}
                      className="team-manager-select"
                      disabled={player.role === "COACH" || player.role === "MEMBRE"}
                    >
                      {!availablePositions.includes(player.position) && (
                        <option value={player.position}>{player.position}</option>
                      )}
                      {availablePositions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                      <option value="COACH">COACH</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="team-manager-action-bar">
          <button className={saving ? "team-manager-btn-disabled" : "team-manager-btn-save"} onClick={handleSave} disabled={saving}>
            {saving ? "Sauvegarde..." : "Enregistrer la composition"}
          </button>
        </div>

        <DataPlayerCard nameUser={selectedPlayer} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default TeamManager;
