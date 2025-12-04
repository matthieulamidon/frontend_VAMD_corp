import { useEffect, useState } from "react";
import { useAuth } from "../../contexte/useAuth"; // Adapte le chemin
import icon_bot from "../../assets/map/bot_icon.png"; // Placeholder image

// --- TYPES ---
type GameType = "League of Legends" | "Valorant" | "Fortnite";

interface PlayerEditState {
  pseudo: string;
  role: string; // TITULAIRE, REMPLACANT, COACH, STAFF
  position: string; // top, duelist, etc.
  avatar?: string;
}

interface ApiMember {
  name: string;
  roleName: string;
  icon?: string;
}

// --- CONSTANTES POUR LES MENUS DÉROULANTS ---
const ROLES = ["TITULAIRE", "REMPLACANT", "COACH", "CHEFDEQUIPE", "MEMBRE"];

const POSITIONS_LOL = ["TOP", "JUNGLE", "MID", "ADC", "SUPPORT"];
const POSITIONS_VALO = [
  "DUELIST",
  "SENTINEL",
  "INITIATOR",
  "CONTROLLER",
  "FLEX",
];
// Pour le staff/coach, on met souvent "N/A" ou "POLYVALENT"
const POSITIONS_OTHER = ["POLYVALENT"];

export const TeamManager = () => {
  const { teamSelect } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [game, setGame] = useState<GameType>("League of Legends");

  // Liste plate de tous les joueurs modifiables
  const [players, setPlayers] = useState<PlayerEditState[]>([]);

  const API_URL =
    import.meta.env.VITE_BACKEND_LINK + "/api/managmentEquipe" ||
    "http://localhost:4000/api/managmentEquipe";

  // --- 1. CHARGEMENT DES DONNÉES ---
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

          // Détection du jeu
          let detectedGame: GameType = "League of Legends";
          if (data.gameName === "VALORANT") detectedGame = "Valorant";
          else if (data.gameName === "FORTNITE") detectedGame = "Fortnite";
          setGame(detectedGame);

          // APLATISSEMENT DES DONNÉES (Flattening)
          // On transforme la structure complexe (mainTeam, subs, etc.) en une liste simple
          const allPlayers: PlayerEditState[] = [];

          // A. Titulaires (Main Team) : data.mainTeam est { duelist: "Pseudo", ... }
          if (data.mainTeam) {
            Object.entries(data.mainTeam).forEach(([pos, pseudo]) => {
              if (typeof pseudo === "string") {
                allPlayers.push({
                  pseudo,
                  role: "TITULAIRE",
                  position: pos.toUpperCase(),
                });
              }
            });
          }

          // B. Remplaçants
          (data.subsData || []).forEach((sub: ApiMember) => {
            // "duelist Sub" -> on essaie d'extraire "DUELIST"
            const cleanPos = sub.roleName.replace(" Sub", "").toUpperCase();
            allPlayers.push({
              pseudo: sub.name,
              role: "REMPLACANT",
              position: cleanPos,
            });
          });

          // C. Coach
          if (data.coachData) {
            allPlayers.push({
              pseudo: data.coachData.name,
              role: "COACH",
              position: "POLYVALENT",
            });
          }

          // D. Staff
          (data.staffData || []).forEach((staff: ApiMember) => {
            allPlayers.push({
              pseudo: staff.name,
              role: "MEMBRE",
              position: "POLYVALENT",
            });
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

  // --- 2. GESTION DES MODIFICATIONS ---
  const handlePlayerChange = (
    index: number,
    field: "role" | "position",
    value: string
  ) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setPlayers(updatedPlayers);
  };

  // --- 3. SAUVEGARDE VERS L'API ---
  const handleSave = async () => {
    setSaving(true);
    try {
      // Préparation du payload pour ta route 'updatePositions'
      const updates = players.map((p) => ({
        pseudo: p.pseudo,
        poste: p.position,
        sous_role: p.role,
      }));

      const response = await fetch(API_URL + "/updateEquipePositions", {
        method: "PUT", // ou POST selon ta route
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipe_name: teamSelect,
          updates: updates,
        }),
        credentials: "include",
      });

      if (response.ok) {
        alert("Composition mise à jour avec succès !");
        window.location.reload(); // Recharger pour voir les changements sur la carte
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

  // --- 4. AFFICHAGE (RENDER) ---

  // Choix des positions à afficher selon le jeu
  const availablePositions =
    game === "League of Legends"
      ? POSITIONS_LOL
      : game === "Valorant"
        ? POSITIONS_VALO
        : POSITIONS_OTHER;

  if (!teamSelect)
    return <div className="text-white">Sélectionnez une équipe.</div>;
  if (loading)
    return <div className="text-white">Chargement des joueurs...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gestion de l'effectif : {teamSelect}</h2>
      <p style={{ color: "#aaa", marginBottom: "20px" }}>
        Jeu détecté : {game}
      </p>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Joueur</th>
              <th style={styles.th}>Rôle (Statut)</th>
              <th style={styles.th}>Poste (Jeu)</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} style={styles.tr}>
                {/* NOM DU JOUEUR */}
                <td style={styles.td}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={icon_bot}
                      alt="avatar"
                      style={{ width: "30px", borderRadius: "50%" }}
                    />
                    <span style={{ fontWeight: "bold" }}>{player.pseudo}</span>
                  </div>
                </td>

                {/* SELECTEUR RÔLE (Titulaire, Remplaçant...) */}
                <td style={styles.td}>
                  <select
                    value={player.role}
                    onChange={(e) =>
                      handlePlayerChange(index, "role", e.target.value)
                    }
                    style={styles.select}
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>

                {/* SELECTEUR POSTE (Top, Mid, Duelist...) */}
                <td style={styles.td}>
                  <select
                    value={player.position}
                    onChange={(e) =>
                      handlePlayerChange(index, "position", e.target.value)
                    }
                    style={styles.select}
                    // Désactivé si c'est un coach ou membre (optionnel)
                    disabled={
                      player.role === "COACH" || player.role === "MEMBRE"
                    }
                  >
                    {/* On ajoute toujours l'option actuelle au cas où elle n'est pas dans la liste standard */}
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

      <div style={styles.actionBar}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={saving ? styles.btnDisabled : styles.btnSave}
        >
          {saving ? "Sauvegarde..." : "Enregistrer la composition"}
        </button>
      </div>
    </div>
  );
};

// --- STYLES CSS-IN-JS RAPIDES ---
const styles = {
  container: {
    backgroundColor: "#0f1923", // Fond sombre style Valo/LoL
    padding: "30px",
    borderRadius: "8px",
    maxWidth: "800px",
    margin: "0 auto",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    borderBottom: "2px solid #c9aa71",
    paddingBottom: "10px",
    marginBottom: "10px",
    textTransform: "uppercase" as const,
    color: "#c9aa71",
  },
  tableContainer: {
    backgroundColor: "#1e2832",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },
  th: {
    textAlign: "left" as const,
    padding: "15px",
    backgroundColor: "#091428",
    color: "#888",
    textTransform: "uppercase" as const,
    fontSize: "12px",
  },
  tr: {
    borderBottom: "1px solid #333",
  },
  td: {
    padding: "15px",
  },
  select: {
    padding: "8px",
    borderRadius: "4px",
    backgroundColor: "#0f1923",
    color: "white",
    border: "1px solid #444",
    width: "100%",
    cursor: "pointer",
  },
  actionBar: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
  },
  btnSave: {
    padding: "12px 24px",
    backgroundColor: "#c9aa71", // Or LoL
    color: "#010a13",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.2s",
  },
  btnDisabled: {
    padding: "12px 24px",
    backgroundColor: "#555",
    color: "#888",
    border: "none",
    borderRadius: "4px",
    cursor: "not-allowed",
  },
};

export default TeamManager;
