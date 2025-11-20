import { createBrowserRouter } from "react-router-dom";
import "../App.css";
import Accueil from "../accueil";
import ConnexionUtilisateur from "../composants/pages/connexionUtilisateur";
import AuthPage from "../composants/organims/testBackend";
import AccueilJoueur from "../composants/pages/AccueilJoueur";

import { ProtectedRoute } from "./ProtectedRoute";
import PageAdmin from "../composants/pages/PageAdmin";
import Postulation from "../composants/pages/postulation";

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
    path: "/postulation",
    element: (
      <ProtectedRoute requiredRole="USER">
        <Postulation />
      </ProtectedRoute>
    ),
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
  {
    path: "/calendrier",
    element: <Calendrier />,
  },
  {
    path: "/evenements",
    element: <Evenements />,
  },
]);

export default router;
