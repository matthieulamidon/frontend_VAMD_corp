import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  role: string;
  pseudo: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setTeamSelectFun: (team: string) => void;
  teamSelect: string;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
