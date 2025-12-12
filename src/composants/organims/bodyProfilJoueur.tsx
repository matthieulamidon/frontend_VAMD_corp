import React, { useState, useEffect } from "react";
import type { User } from "../../types/user";
import TabInfoProfilJoueur from "../molecules/tabInfoProfilJoueur";
import { API_USER_URL } from "../../services/authService";


const BodyProfilJoueur: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_USER_URL}/info`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Erreur lors de la récupération des données."
          );
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Une erreur inattendue est survenue lors du chargement des données.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateUser = async (formData: Partial<User>) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(`${API_USER_URL}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Réponse non-JSON reçue du serveur :", text);
        throw new Error(`Erreur serveur (${response.status}) : L'API n'a pas renvoyé de JSON.`);
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "La mise à jour a échoué.");
      }

      const data = await response.json();
      setUser(data.user); 
      setSuccess("Profil mis à jour avec succès !");
      setIsEditing(false); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inattendue est survenue lors de la mise à jour.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  if (loading && !user) {
    return <div>Chargement de vos informations...</div>;
  }

  if (error && !user) {
    return <div className="form-error">Erreur : {error}</div>;
  }

  return (
    <div className="body-profil-joueur">
      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}
      <TabInfoProfilJoueur
        user={user}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleUpdateUser}
        onCancel={handleCancelEdit}
        isLoading={loading}
      />
    </div>
  );
};

export default BodyProfilJoueur;