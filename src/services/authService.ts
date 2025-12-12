// services/authService.ts

import type { UserCookies } from "../types/user";

const API_URL =
  import.meta.env.VITE_BACKEND_LINK + "/api" || "http://localhost:4000/api";

const API_USER_URL =
  import.meta.env.VITE_BACKEND_LINK + "/api/user" ||
  "http://localhost:4000/api/auth";

// Service d'authentification pour communiquer avec le backend j'ai suivi un tuto et je suis a deux doigts de tout suprimer car on a que un systeme de  login
export const authService = {
  checkAuth: async (): Promise<UserCookies | false> => {
    try {
      const response = await fetch(API_URL + "/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401) return false;
      if (!response.ok) throw new Error("Erreur serveur");

      const data = await response.json();

      if (data.user) {
        return data.user;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Erreur checkAuth:", err);
      return false;
    }
  },

  //et oui j'ai coder ça mais ça ne sert a rien vu que je ne suis pas repaser sur le code de victor pour l'instant
  login: async (emailOrPseudo: string, password: string): Promise<boolean> => {
    const response = await fetch(API_URL + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ emailOrPseudo, password }),
    });

    return response.ok;
  },

  logout: async (): Promise<void> => {
    await fetch(API_URL + "/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  },

  equipeParDefault: async (): Promise<string | null> => {
    const response = await fetch(
      API_URL + "/managmentEquipe/getAllEquipeOfPlayer",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();
    return data.equipes && data.equipes.length > 0 ? data.equipes[0] : null;
  },
};
};export { API_URL, API_USER_URL };
