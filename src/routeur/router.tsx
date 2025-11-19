import { createBrowserRouter } from "react-router-dom";
import "../App.css";
import Accueil from "../accueil";
import ConnexionUtilisateur from "../composants/pages/connexionUtilisateur";
import AuthPage from "../composants/organims/testBackend";
import AccueilJoueur from "../composants/pages/AccueilJoueur";

import { ProtectedRoute } from "./ProtectedRoute";
import PageAdmin from "../composants/pages/PageAdmin";

//requiredRole="JOUEUR"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  },
  {
    path: "/connexion",
    element: <ConnexionUtilisateur />,
  },
  {
    path: "/auth-test",
    element: <AuthPage />,
  },
  {
    path: "/portail-joueur",
    element: (
      <ProtectedRoute requiredRole="USER">
        <AccueilJoueur />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="USER">
        <PageAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Accueil />,
  },
]);

export default router;
