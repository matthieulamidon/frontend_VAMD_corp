import { useCallback, useEffect, useState } from "react";
import AdminNavbar from "./navbarAdmin"; // or adjust the path to where AdminNavbar is located

// --- TYPES ---
type SexeEnum = "HOMME" | "FEMME" | "AUTRE";
type IconeEnum = "DEFAULT" | "WARRIOR" | "MAGE";

interface User {
  id_user: number;
  email: string;
  pseudo: string;
  nom: string | null;
  prenom: string | null;
  date_naissance: string | null;
  sexe: SexeEnum | null;
  icone: IconeEnum;
  description: string | null;
}

// Type pour le formulaire de création (basé sur ton backend register)
interface NewUserForm {
  pseudo: string;
  email: string;
  password: string;
  date_naissance: string;
}

// --- STYLES ---
const styles = {
  container: {
    backgroundColor: "#0f1923",
    padding: "30px",
    borderRadius: "8px",
    color: "white",
    fontFamily: "Arial, sans-serif",
    minHeight: "80vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #c9aa71",
    paddingBottom: "15px",
    marginBottom: "30px",
  },
  title: {
    color: "#c9aa71",
    textTransform: "uppercase" as const,
    letterSpacing: "1.5px",
    margin: 0,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    backgroundColor: "#1e2832",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  th: {
    backgroundColor: "#091428",
    color: "#c9aa71",
    padding: "15px",
    textAlign: "left" as const,
    textTransform: "uppercase" as const,
    fontSize: "12px",
    borderBottom: "1px solid #c9aa71",
  },
  td: {
    padding: "12px 15px",
    borderBottom: "1px solid #333",
    fontSize: "14px",
    color: "#ece8e1",
  },
  btnAction: {
    padding: "8px 12px",
    marginRight: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.2s",
  },
  btnEdit: { backgroundColor: "#c9aa71", color: "#000" },
  btnDelete: { backgroundColor: "#ff4655", color: "#fff" },
  btnCreate: {
    backgroundColor: "#0f1923",
    color: "#c9aa71",
    border: "1px solid #c9aa71",
    padding: "10px 20px",
    textTransform: "uppercase" as const,
    fontWeight: "bold",
    cursor: "pointer",
  },
  // Modale
  modalOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(3px)",
  },
  modalContent: {
    backgroundColor: "#1e2832",
    padding: "30px",
    borderRadius: "8px",
    width: "500px",
    border: "1px solid #c9aa71",
    boxShadow: "0 0 20px rgba(201, 170, 113, 0.2)",
  },
  inputGroup: { marginBottom: "15px" },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#8b9bb4",
    fontSize: "12px",
    textTransform: "uppercase" as const,
  },
  input: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#0f1923",
    border: "1px solid #444",
    color: "white",
    borderRadius: "4px",
    outline: "none",
  },
};

export default function AdminUserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // État pour la modification
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // État pour la création (NOUVEAU)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<NewUserForm>({
    pseudo: "",
    email: "",
    password: "",
    date_naissance: "",
  });

  // CONFIGURATION DES URLS
  // Note: Ta route register est souvent dans un dossier Auth, ajuste le chemin si besoin.
  const API_BASE =
    import.meta.env.VITE_BACKEND_LINK + "/api/adminAdministration" ||
    "http://localhost:4000/api/adminAdministration";

  // --- 1. CHARGEMENT ---
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/infoAllUserForAdmin`);
      if (!res.ok) throw new Error("Erreur chargement");
      const data = await res.json();
      setUsers(data.user);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger la liste.");
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // --- 2. SUPPRESSION ---
  const handleDelete = async (id: number) => {
    if (!window.confirm("Confirmer la suppression définitive ?")) return;
    try {
      const res = await fetch(`${API_BASE}/deleteUserByAdmin/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers(users.filter((u) => u.id_user !== id));
      } else {
        alert("Erreur suppression.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- 3. ÉDITION (UPDATE) ---
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      const res = await fetch(
        `${API_BASE}/updateUserByAdmin/${editingUser.id_user}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...editingUser,
            date_naissance: editingUser.date_naissance
              ? new Date(editingUser.date_naissance)
              : null,
          }),
        }
      );
      if (res.ok) {
        setEditingUser(null);
        fetchUsers();
        alert("Utilisateur mis à jour.");
      } else {
        alert("Erreur mise à jour.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- 4. CRÉATION (REGISTER - NOUVEAU) ---
  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Utilisation de ta route 'register'
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Nouvel utilisateur créé avec succès !");
        setIsCreateModalOpen(false);
        setNewUser({ pseudo: "", email: "", password: "", date_naissance: "" }); // Reset form
        fetchUsers(); // Rafraîchir la liste
      } else {
        alert("Erreur: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur lors de la création.");
    }
  };

  // --- RENDU ---
  if (loading)
    return (
      <div style={{ ...styles.container, textAlign: "center" }}>
        Chargement...
      </div>
    );
  if (error)
    return <div style={{ ...styles.container, color: "#ff4655" }}>{error}</div>;

  return (
    <>
      <AdminNavbar />
      <br></br>
      <br></br>
      <br></br>
      <div style={styles.container}>
        {/* HEADER AVEC BOUTON CREATE */}
        <div style={styles.header}>
          <h2 style={styles.title}>Gestion Utilisateurs</h2>
          <button
            style={styles.btnCreate}
            onClick={() => setIsCreateModalOpen(true)}
          >
            + Nouveau Joueur
          </button>
        </div>

        {/* TABLEAU */}
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Pseudo</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Nom / Prénom</th>
                <th style={styles.th}>Date Naissance</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id_user}>
                  <td style={styles.td}>#{user.id_user}</td>
                  <td style={styles.td}>
                    <strong style={{ color: "#c9aa71" }}>{user.pseudo}</strong>
                  </td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    {user.nom} {user.prenom}
                  </td>
                  <td style={styles.td}>
                    {user.date_naissance
                      ? new Date(user.date_naissance).toLocaleDateString()
                      : "-"}
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.btnAction, ...styles.btnEdit }}
                      onClick={() => setEditingUser(user)}
                    >
                      Éditer
                    </button>
                    <button
                      style={{ ...styles.btnAction, ...styles.btnDelete }}
                      onClick={() => handleDelete(user.id_user)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- MODALE CRÉATION (REGISTER) --- */}
        {isCreateModalOpen && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h3
                style={{
                  ...styles.title,
                  marginBottom: "20px",
                  fontSize: "18px",
                }}
              >
                Recruter un nouvel agent
              </h3>
              <form onSubmit={handleCreateSubmit}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Pseudo *</label>
                  <input
                    name="pseudo"
                    style={styles.input}
                    value={newUser.pseudo}
                    onChange={handleCreateChange}
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    style={styles.input}
                    value={newUser.email}
                    onChange={handleCreateChange}
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Mot de passe (min 6 chars) *
                  </label>
                  <input
                    type="password"
                    name="password"
                    style={styles.input}
                    value={newUser.password}
                    onChange={handleCreateChange}
                    required
                    minLength={6}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Date de naissance *</label>
                  <input
                    type="date"
                    name="date_naissance"
                    style={styles.input}
                    value={newUser.date_naissance}
                    onChange={handleCreateChange}
                    required
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    style={{
                      ...styles.btnAction,
                      backgroundColor: "#555",
                      color: "#fff",
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    style={{ ...styles.btnAction, ...styles.btnEdit }}
                  >
                    Créer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- MODALE ÉDITION (UPDATE) --- */}
        {editingUser && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h3 style={{ ...styles.title, marginBottom: "20px" }}>
                Modifier {editingUser.pseudo}
              </h3>
              <form onSubmit={handleUpdateSubmit}>
                {/* Réutilisation des champs d'édition (similaire au code précédent) */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    style={styles.input}
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Nom</label>
                    <input
                      style={styles.input}
                      value={editingUser.nom || ""}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, nom: e.target.value })
                      }
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Prénom</label>
                    <input
                      style={styles.input}
                      value={editingUser.prenom || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          prenom: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                {/* Boutons Actions */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    style={{
                      ...styles.btnAction,
                      backgroundColor: "#555",
                      color: "#fff",
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    style={{ ...styles.btnAction, ...styles.btnEdit }}
                  >
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
