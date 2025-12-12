import React, { useState, useEffect } from "react";
import { SexeEnum } from "../../types/enum.d";
import type { User } from "../../types/user";
import "../styles/profilJoueur.css";

interface TabInfoProfilJoueurProps {
  user: User | null;
  isEditing: boolean;
  isLoading: boolean;
  onEdit: () => void;
  onSave: (formData: Partial<User>) => void;
  onCancel: () => void;
}

const TabInfoProfilJoueur: React.FC<TabInfoProfilJoueurProps> = ({
  user,
  isEditing,
  isLoading,
  onEdit,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        pseudo: user.pseudo || "",
        email: user.email || "",
        nom: user.nom || "",
        prenom: user.prenom || "",
        description: user.description || "",
        date_naissance: user.date_naissance
          ? new Date(user.date_naissance).toISOString().split("T")[0]
          : "",
        sexe: user.sexe || SexeEnum.AUTRE,
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSend = { ...formData };

    if (!dataToSend.date_naissance) {
      (dataToSend as Record<string, unknown>).date_naissance = null;
    }

    onSave(dataToSend);
  };

  if (!user) {
    return null; 
  }

  if (!isEditing) {
    return (
      <div className="profil-joueur-container">
        <h1>Profil de {user.pseudo}</h1>
        <p><strong>Pseudo:</strong> {user.pseudo}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Nom:</strong> {user.nom}</p>
        <p><strong>Prénom:</strong> {user.prenom}</p>
        <p><strong>Description:</strong> {user.description || "Non renseignée"}</p>
        <p><strong>Date de naissance:</strong> {user.date_naissance ? new Date(user.date_naissance).toLocaleDateString() : "Non renseignée"}</p>
        <button onClick={onEdit} className="btn-edit-profil">Modifier le profil</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="profil-joueur-container">
      <h1>Modifier mon profil</h1>
      
      <label>Pseudo:</label>
      <input type="text" name="pseudo" value={formData.pseudo || ""} onChange={handleChange} />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email || ""} onChange={handleChange} />

      <label>Nom:</label>
      <input type="text" name="nom" value={formData.nom || ""} onChange={handleChange} />

      <label>Prénom:</label>
      <input type="text" name="prenom" value={formData.prenom || ""} onChange={handleChange} />

      <label>Date de naissance:</label>
      <input type="date" name="date_naissance" value={formData.date_naissance?.toString() || ""} onChange={handleChange} />

      <label>Sexe:</label>
      <select name="sexe" value={formData.sexe || ""} onChange={handleChange}>
        <option value={SexeEnum.HOMME}>Homme</option>
        <option value={SexeEnum.FEMME}>Femme</option>
        <option value={SexeEnum.AUTRE}>Autre</option>
      </select>

      <label>Description:</label>
      <textarea name="description" value={formData.description || ""} onChange={handleChange} />

      <div className="form-actions">
        <button type="submit" className="btn-save" disabled={isLoading}>
          {isLoading ? "Sauvegarde..." : "Sauvegarder"}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel} disabled={isLoading}>
          Annuler
        </button>
      </div>
    </form>
  );
};

export default TabInfoProfilJoueur;