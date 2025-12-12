import { useEffect, useState } from "react";
import { useAuth } from "../../contexte/useAuth";
import type { User } from "../../types/user";

interface Performance {
  KDA: string;
  gamesPlayed: number;
}

interface PlayerDataResponse {
  userInfo: User | null;
  roleInTeam: string;
  posteInTeam: string;
  performance: Performance;
}

interface DataPlayerCardProps {
  nameUser: string;
  isOpen: boolean;
  onClose: () => void;
}

// j'ai eu la flemme de faire un fichier css donc merci gemini
const styles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)", // Fond sombre
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(4px)",
  },
  container: {
    backgroundColor: "#0f1923",
    padding: "30px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "700px",
    color: "white",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #c9aa71", // Bordure dorée
    position: "relative" as const,
    boxShadow: "0 0 20px rgba(201, 170, 113, 0.2)",
  },
  closeBtn: {
    position: "absolute" as const,
    top: "15px",
    right: "20px",
    background: "transparent",
    border: "none",
    color: "#c9aa71",
    fontSize: "24px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  headerTitle: {
    borderBottom: "2px solid #c9aa71",
    paddingBottom: "10px",
    marginBottom: "20px",
    textTransform: "uppercase" as const,
    color: "#c9aa71",
    fontSize: "24px",
    letterSpacing: "1px",
  },
  sectionTitle: {
    color: "#ece8e1",
    marginTop: "20px",
    marginBottom: "10px",
    textTransform: "uppercase" as const,
    fontSize: "14px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  dataBox: {
    backgroundColor: "#1e2832",
    borderRadius: "4px",
    padding: "15px",
    borderLeft: "4px solid #c9aa71",
  },
  // Réutilisation de tes styles de table pour l'affichage propre
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },
  tdLabel: {
    padding: "8px 0",
    color: "#8b9bb4",
    width: "40%",
    fontSize: "14px",
  },
  tdValue: {
    padding: "8px 0",
    color: "#ece8e1",
    fontWeight: "bold",
    fontSize: "14px",
  },
  loader: {
    color: "#c9aa71",
    textAlign: "center" as const,
    padding: "20px",
  },
};

export function DataPlayerCard({
  nameUser,
  isOpen,
  onClose,
}: DataPlayerCardProps) {
  const { teamSelect } = useAuth();

  const [playerData, setPlayerData] = useState<PlayerDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_BACKEND_LINK
    ? import.meta.env.VITE_BACKEND_LINK + "/api/user"
    : "http://localhost:5173/api/user";

  useEffect(() => {
    // Si la modale n'est pas ouverte, on ne fetch pas
    if (!isOpen) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (!nameUser || !teamSelect) {
        setError("Nom d'utilisateur ou équipe manquant.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(API_URL + "/infoUserAndPerformance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nameUser: nameUser,
            teamSelect: teamSelect,
          }),
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data: PlayerDataResponse = await response.json();
        setPlayerData(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer les données du joueur.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL, nameUser, teamSelect, isOpen]); // Ajout de isOpen aux dépendances

  // Si la modale est fermée, on ne rend rien
  if (!isOpen) return null;

  // Gestion du clic sur l'overlay pour fermer
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.container}>
        <button style={styles.closeBtn} onClick={onClose}>
          &times;
        </button>

        {loading ? (
          <div style={styles.loader}>INITIALISATION DES DONNÉES...</div>
        ) : error ? (
          <div
            style={{ color: "#ff4655", textAlign: "center", padding: "20px" }}
          >
            {error}
          </div>
        ) : !playerData || !playerData.userInfo ? (
          <div style={styles.loader}>JOUEUR INTROUVABLE</div>
        ) : (
          <>
            {/* EN-TÊTE */}
            <h2 style={styles.headerTitle}>
              AGENT: {playerData.userInfo.pseudo}
            </h2>

            {/* CONTENU EN GRILLE/TABLEAU */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              {/* COLONNE GAUCHE: Infos Perso */}
              <div>
                <div style={styles.sectionTitle}>DOSSIER PERSONNEL</div>
                <div style={styles.dataBox}>
                  <table style={styles.table}>
                    <tbody>
                      <tr>
                        <td style={styles.tdLabel}>Identité</td>
                        <td style={styles.tdValue}>
                          {playerData.userInfo.prenom} {playerData.userInfo.nom}
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdLabel}>Email</td>
                        <td style={styles.tdValue}>
                          {playerData.userInfo.email}
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdLabel}>Recrutement</td>
                        <td style={styles.tdValue}>
                          {new Date(
                            playerData.userInfo.createdAt
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdLabel} colSpan={2}>
                          <div
                            style={{
                              marginTop: "10px",
                              fontStyle: "italic",
                              color: "#888",
                            }}
                          >
                            "
                            {playerData.userInfo.description ||
                              "Aucune note de service."}
                            "
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* COLONNE DROITE: Stats & Team */}
              <div>
                <div style={styles.sectionTitle}>AFFECTATION D'ÉQUIPE</div>
                <div style={{ ...styles.dataBox, marginBottom: "20px" }}>
                  <table style={styles.table}>
                    <tbody>
                      <tr>
                        <td style={styles.tdLabel}>Escouade</td>
                        <td style={{ ...styles.tdValue, color: "#c9aa71" }}>
                          {teamSelect}
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdLabel}>Rôle</td>
                        <td style={styles.tdValue}>{playerData.roleInTeam}</td>
                      </tr>
                      <tr>
                        <td style={styles.tdLabel}>Poste Tactique</td>
                        <td style={styles.tdValue}>{playerData.posteInTeam}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={styles.sectionTitle}>PERFORMANCES AU COMBAT</div>
                <div style={styles.dataBox}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "24px",
                          color: "#c9aa71",
                          fontWeight: "bold",
                        }}
                      >
                        {playerData.performance.KDA}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#888",
                          textTransform: "uppercase",
                        }}
                      >
                        Ratio K/D/A
                      </div>
                    </div>
                    <div
                      style={{
                        height: "30px",
                        width: "1px",
                        background: "#444",
                      }}
                    ></div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "24px",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {playerData.performance.gamesPlayed}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#888",
                          textTransform: "uppercase",
                        }}
                      >
                        Missions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DataPlayerCard;
