import React, {
  useState,
  useEffect,
  useCallback,
  //useMemo,
  type ReactNode,
} from "react";
import { AuthContext } from "./AuthContext";
import { authService } from "../services/authService";

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>("VISITOR");
  const [pseudo, setPseudo] = useState<string>("");
  const [teamSelect, setTeamSelect] = useState<string>("");

  const checkAuthStatus = async () => {
    const response = await authService.checkAuth();
    if (response === false) {
      setIsAuthenticated(false);
      setRole("VISITOR");
      setLoading(false);
      return;
    }
    setIsAuthenticated(true);
    switch (response.role) {
      case 1:
        setRole("ADMIN");
        break;
      case 2:
        setRole("COACH");
        break;
      case 3:
        setRole("JOUEUR");
        break;
      case 4:
        setRole("USER");
        break;
      default:
        setRole("VISITOR");
    }
    setPseudo(response.pseudo);
    setLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const ok = await authService.login(email, password);
    setIsAuthenticated(ok);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setIsAuthenticated(false);
  }, []);

  const setTeamSelectFun = useCallback((team: string) => {
    // TODO : implémenter la sélection d'équipe
    setTeamSelect(team);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        setTeamSelectFun,
        role,
        pseudo,
        loading,
        teamSelect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
