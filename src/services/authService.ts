// services/authService.ts

import type { UserCookies } from "../types/user";

const API_URL =
  import.meta.env.VITE_BACKEND_LINK + "/api/auth" ||
  "http://localhost:4000/api/auth";

// Service d'authentification pour communiquer avec le backend j'ai suivi un tuto et je suis a deux doigts de tout suprimer car on a que un systeme de  login
export const authService = {
  checkAuth: async (): Promise<UserCookies | false> => {
    try {
      const response = await fetch(API_URL + "/me", {
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

  login: async (emailOrPseudo: string, password: string): Promise<boolean> => {
    const response = await fetch(API_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ emailOrPseudo, password }),
    });

    return response.ok;
  },

  logout: async (): Promise<void> => {
    await fetch(API_URL + "/logout", {
      method: "POST",
      credentials: "include",
    });
  },
};
