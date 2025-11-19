import { useEffect, useState, useCallback } from "react";
import "../styles/adminEquipe.css";
import type { DemandeCoach, DemandeJoueur } from "../../types/demande";

interface Equipe {
  nom_equipe: string;
  jeux_equipe: string;
}

export default function AdminEquipePage() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [nomEquipe, setNomEquipe] = useState("");
  const [jeuEquipe, setJeuEquipe] = useState("");

  const [newNomEquipe, setNewNomEquipe] = useState("");
  const [newJeuEquipe, setNewJeuEquipe] = useState("");

  const [demandesJoueur, setDemandesJoueur] = useState<DemandeJoueur[]>([]);
  const [demandesCoach, setDemandesCoach] = useState<DemandeCoach[]>([]);
  const API_URL =
    import.meta.env.VITE_BACKEND_LINK + "/api/gestionEquipe" ||
    "http://localhost:4000/api/gestionEquipe";

  const loadEquipes = useCallback(async () => {
    const res = await fetch(API_URL + "/getAllEquipe");
    const data = await res.json();
    setEquipes(data);
  }, [API_URL]);

  const loadDemandes = useCallback(async () => {
    const res = await fetch("/getAllDemandeEquipe");
    const data = await res.json();
    setDemandesJoueur(data.demandesJoueur.infoJoueur);
    setDemandesCoach(data.demandesCoach.infoCoach);
  }, []);

  useEffect(() => {
    loadEquipes();
    loadDemandes();
  }, [loadEquipes, loadDemandes]);

  async function createEquipe() {
    await fetch(`${API_URL}/CreateEquipe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom_equipe: nomEquipe,
        jeux_equipe: jeuEquipe,
      }),
    }); /*
    const res = await fetch(`${API_URL}/CreateEquipe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom_equipe: nomEquipe,
        jeux_equipe: jeuEquipe,
      }),
      credentials: "include",
    });
    const data = await res.json();*/

    loadEquipes();

    alert(
      "Équipe créée — comme une nouvelle guilde prête à entrer dans le champ de bataille !"
    );
  }

  async function updateEquipe(oldName: string) {
    await fetch(`${API_URL}/UpdateEquipe`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom_equipe: oldName,
        new_nom_equipe: newNomEquipe,
        new_jeux_equipe: newJeuEquipe,
      }),
    });

    loadEquipes();
    alert("Mise à jour réussie ! Tatakae !");
  }

  async function deleteEquipe(name: string) {
    await fetch(`${API_URL}/DeleteEquipe`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom_equipe: name }),
    });

    loadEquipes();
    alert("Équipe supprimée !");
  }

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

  async function acceptCoach(nom_equipe: string, id_user: number) {
    await fetch(`${API_URL}/acceptDemandeCoach`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom_equipe, id_user }),
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
      <h1>Administration — Gestion des équipes</h1>

      <h2 className="section-title">Gestion des équipes</h2>

      <div className="block-card">
        <h3>Créer une nouvelle équipe</h3>

        <input
          placeholder="Nom de l'équipe"
          value={nomEquipe}
          onChange={(e) => setNomEquipe(e.target.value)}
        />

        <input
          placeholder="Jeu (ex: VALORANT)"
          value={jeuEquipe}
          onChange={(e) => setJeuEquipe(e.target.value)}
        />

        <button onClick={createEquipe}>Créer</button>
      </div>

      <div>
        <h3>Équipes existantes</h3>
        {equipes.map((eq) => (
          <div className="block-card" key={eq.nom_equipe}>
            <p>
              <b>{eq.nom_equipe}</b> — {eq.jeux_equipe}
            </p>

            <h4>Modifier l'équipe</h4>

            <input
              placeholder="Nouveau nom"
              onChange={(e) => setNewNomEquipe(e.target.value)}
            />
            <input
              placeholder="Nouveau jeu"
              onChange={(e) => setNewJeuEquipe(e.target.value)}
            />

            <button onClick={() => updateEquipe(eq.nom_equipe)}>
              Modifier
            </button>

            <button className="red" onClick={() => deleteEquipe(eq.nom_equipe)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <div className="separator"></div>

      <h2 className="section-title">Demandes d’adhésion</h2>

      {/* JOUEURS */}
      <h3>Demandes des joueurs</h3>
      {demandesJoueur.map((dem) => (
        <div className="block-card" key={`${dem.id_user}-${dem.id_equipe}`}>
          <p>
            Joueur : {dem.user?.prenom} {dem.user?.nom}
          </p>
          <p>Équipe : {dem.id_equipe}</p>

          <button onClick={() => acceptJoueur(dem.id_user, dem.id_equipe)}>
            Accepter
          </button>

          <button
            className="red"
            onClick={() => refuseJoueur(dem.id_user, dem.id_equipe)}
          >
            Refuser
          </button>
        </div>
      ))}

      {/* COACHS */}
      <h3>Demandes des coachs</h3>
      {demandesCoach.map((dem) => (
        <div className="block-card" key={dem.id_user}>
          <p>
            Coach : {dem.user?.prenom} {dem.user?.nom}
          </p>
          <p>Jeu : {dem.jeu}</p>

          <input
            placeholder="Nom de l'équipe à assigner"
            onChange={(e) => setNomEquipe(e.target.value)}
          />

          <button onClick={() => acceptCoach(nomEquipe, dem.id_user)}>
            Accepter
          </button>

          <button className="red" onClick={() => refuseCoach(dem.id_user)}>
            Refuser
          </button>
        </div>
      ))}
    </div>
  );
}
