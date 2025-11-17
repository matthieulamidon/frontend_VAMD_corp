import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  role: string;
  pseudo: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
