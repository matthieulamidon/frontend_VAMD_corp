import { useEffect, useState, useCallback } from "react";
import "../styles/adminEquipe.css";
import type { DemandeCoach, DemandeJoueur } from "../../types/demande";

interface Equipe {
  nom_equipe: string;
  jeux_equipe: string;
}

export default function AdminEquipePage() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);

  // États pour la création
  const [nomEquipe, setNomEquipe] = useState("");
  const [jeuEquipe, setJeuEquipe] = useState("");

  // États pour la modification
  const [newNomEquipe, setNewNomEquipe] = useState("");
  const [newJeuEquipe, setNewJeuEquipe] = useState("");

  // État pour stocker les inputs "Assigner Coach" de chaque équipe
  // Format : { "NomEquipe": "12" } (où 12 est l'id entré)
  const [coachInputs, setCoachInputs] = useState<{ [key: string]: string }>({});

  const [demandesJoueur, setDemandesJoueur] = useState<DemandeJoueur[]>([]);
  const [demandesCoach, setDemandesCoach] = useState<DemandeCoach[]>([]);

  const API_URL = import.meta.env.VITE_BACKEND_LINK
    ? import.meta.env.VITE_BACKEND_LINK + "/api/gestionEquipe"
    : "http://localhost:4000/api/gestionEquipe";

  // --- LOADERS ---
  const loadEquipes = useCallback(async () => {
    try {
      const res = await fetch(API_URL + "/getAllEquipe");
      const data = await res.json();
      setEquipes(data);
    } catch (e) {
      console.error(e);
    }
  }, [API_URL]);

  const loadDemandes = useCallback(async () => {
    try {
      const res = await fetch(API_URL + "/getAllDemandeEquipe");
      const data = await res.json();
      if (data) {
        setDemandesJoueur(data.demandesJoueur?.infoJoueur || []);
        setDemandesCoach(data.demandesCoach?.infoCoach || []);
      }
    } catch (e) {
      console.error(e);
    }
  }, [API_URL]);

  useEffect(() => {
    loadEquipes();
    loadDemandes();
  }, [loadEquipes, loadDemandes]);

  // --- ACTIONS EQUIPE (CRUD) ---

  async function createEquipe() {
    if (!nomEquipe || !jeuEquipe) return alert("Remplissez tous les champs !");

    await fetch(`${API_URL}/CreateEquipe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom_equipe: nomEquipe, jeux_equipe: jeuEquipe }),
    });
    setNomEquipe("");
    setJeuEquipe("");
    loadEquipes();
    alert("Équipe créée !");
  }

  async function updateEquipe(oldName: string) {
    await fetch(`${API_URL}/UpdateEquipe`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom_equipe: oldName,
        new_nom_equipe: newNomEquipe || oldName,
        new_jeux_equipe: newJeuEquipe,
      }),
    });
    loadEquipes();
    alert("Mise à jour réussie !");
  }

  async function deleteEquipe(name: string) {
    if (!confirm("Supprimer cette équipe définitivement ?")) return;
    await fetch(`${API_URL}/DeleteEquipe`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom_equipe: name }),
    });
    loadEquipes();
  }

  // --- NOUVELLE FONCTION : ASSIGNATION COACH FORCEE ---

  // Gestionnaire pour l'input spécifique de chaque carte équipe
  const handleCoachInputChange = (teamName: string, value: string) => {
    setCoachInputs((prev) => ({ ...prev, [teamName]: value }));
  };

  async function assignCoachToTeam(nom_equipe: string) {
    const idUserStr = coachInputs[nom_equipe];

    if (!idUserStr) {
      return alert("Veuillez entrer un ID utilisateur.");
    }

    const id_user = parseInt(idUserStr);
    if (isNaN(id_user)) {
      return alert("L'ID utilisateur doit être un nombre.");
    }

    try {
      const res = await fetch(`${API_URL}/assignEquipeToUserByAdmin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_user: id_user,
          nom_equipe: nom_equipe,
        }),
      });

      if (res.ok) {
        alert(`Utilisateur #${id_user} est maintenant COACH de ${nom_equipe}`);
        // Reset l'input
        handleCoachInputChange(nom_equipe, "");
      } else {
        const err = await res.json();
        alert("Erreur: " + err.message);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur serveur lors de l'assignation.");
    }
  }

  // --- ACTIONS DEMANDES ---

  async function acceptJoueur(id_user: number, id_equipe: number) {
    await fetch(`${API_URL}/acceptDemandeJoueur`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user, id_equipe }),
    });
    loadDemandes();
  }

  async function refuseJoueur(id_user: number, id_equipe: number) {
    await fetch(`${API_URL}/refuseDemandeJoueur`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user, id_equipe }),
    });
    loadDemandes();
  }

  async function acceptCoach(nom_equipe_input: string, id_user: number) {
    await fetch(`${API_URL}/acceptDemandeCoach`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom_equipe: nom_equipe_input, id_user }),
    });
    loadDemandes();
  }

  async function refuseCoach(id_user: number) {
    await fetch(`${API_URL}/refuseDemandeCoach`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user }),
    });
    loadDemandes();
  }

  return (
    <div className="admin-container">
      <h1>Administration — Dashboard</h1>

      {/* --- SECTION CRÉATION --- */}
      <h2 className="section-title">Nouvelle Division</h2>
      <div className="block-card creation-card">
        <h3>Créer une équipe</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            placeholder="Nom de l'équipe (ex: T1, Cloud9)"
            value={nomEquipe}
            onChange={(e) => setNomEquipe(e.target.value)}
          />
          <input
            placeholder="Jeu (ex: VALORANT, LoL)"
            value={jeuEquipe}
            onChange={(e) => setJeuEquipe(e.target.value)}
          />
          <button onClick={createEquipe}>Initialiser l'équipe</button>
        </div>
      </div>

      <div className="separator"></div>

      {/* --- SECTION LISTING EQUIPES --- */}
      <h2 className="section-title">Équipes Actives</h2>
      <div className="grid-container">
        {equipes.map((eq) => (
          <div className="block-card" key={eq.nom_equipe}>
            <div
              style={{
                borderBottom: "1px solid #333",
                paddingBottom: "10px",
                marginBottom: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#c9aa71",
                  fontWeight: "bold",
                }}
              >
                {eq.nom_equipe}
              </p>
              <p style={{ fontSize: "0.8rem", textTransform: "uppercase" }}>
                {eq.jeux_equipe}
              </p>
            </div>

            {/* Modification */}
            <h4>Paramètres</h4>
            <input
              placeholder="Nouveau nom"
              onChange={(e) => setNewNomEquipe(e.target.value)}
              style={{ marginBottom: "5px" }}
            />
            <input
              placeholder="Nouveau jeu"
              onChange={(e) => setNewJeuEquipe(e.target.value)}
              style={{ marginBottom: "10px" }}
            />

            {/* BOUTONS UPDATE/DELETE */}
            <div className="action-row" style={{ marginBottom: "20px" }}>
              <button
                className="secondary"
                style={{ flex: 1 }}
                onClick={() => updateEquipe(eq.nom_equipe)}
              >
                Mettre à jour
              </button>
              <button
                className="red"
                onClick={() => deleteEquipe(eq.nom_equipe)}
              >
                ✕
              </button>
            </div>

            {/* --- NOUVEAU BLOC : ASSIGNATION DIRECTE DE COACH --- */}
            <div style={{ borderTop: "1px dashed #444", paddingTop: "15px" }}>
              <h4 style={{ marginTop: 0, color: "#c9aa71" }}>
                Assignation Directe
              </h4>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  placeholder="ID User Coach"
                  value={coachInputs[eq.nom_equipe] || ""}
                  onChange={(e) =>
                    handleCoachInputChange(eq.nom_equipe, e.target.value)
                  }
                  type="number"
                />
                <button onClick={() => assignCoachToTeam(eq.nom_equipe)}>
                  +
                </button>
              </div>
              <p
                style={{ fontSize: "0.75rem", marginTop: "5px", color: "#666" }}
              >
                Force l'ajout d'un coach par son ID.
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="separator"></div>

      {/* --- SECTION DEMANDES --- */}
      <h2 className="section-title">Centre de Recrutement</h2>

      <h3>Demandes : Joueurs</h3>
      <div className="grid-container" style={{ marginBottom: "40px" }}>
        {demandesJoueur.length === 0 && <p>Aucune demande en attente.</p>}
        {demandesJoueur.map((dem) => (
          <div className="block-card" key={`${dem.id_user}-${dem.id_equipe}`}>
            <p>
              <b>Agent :</b> {dem.user?.prenom} {dem.user?.nom} <br />
              <span style={{ color: "#888", fontSize: "0.9em" }}>
                ({dem.user?.pseudo || "Pseudo inconnu"})
              </span>
            </p>
            <p>
              <b>Cible :</b> {dem.id_equipe}
            </p>

            <div className="action-row">
              <button
                style={{ flex: 1 }}
                onClick={() => acceptJoueur(dem.id_user, dem.id_equipe)}
              >
                Accepter
              </button>
              <button
                className="red"
                onClick={() => refuseJoueur(dem.id_user, dem.id_equipe)}
              >
                Refuser
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3>Demandes : Coachs</h3>
      <div className="grid-container">
        {demandesCoach.length === 0 && <p>Aucune demande en attente.</p>}
        {demandesCoach.map((dem) => (
          <div className="block-card" key={dem.id_user}>
            <p>
              <b>Coach :</b> {dem.user?.prenom} {dem.user?.nom}
            </p>
            <p>
              <b>Expertise :</b> {dem.jeu}
            </p>

            <input
              style={{ marginTop: "10px" }}
              placeholder="Assigner à l'équipe..."
              onChange={(e) => setNomEquipe(e.target.value)}
            />

            <div className="action-row">
              <button
                style={{ flex: 1 }}
                onClick={() => acceptCoach(nomEquipe, dem.id_user)}
              >
                Recruter
              </button>
              <button className="red" onClick={() => refuseCoach(dem.id_user)}>
                Refuser
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
