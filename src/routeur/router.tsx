import { createBrowserRouter } from "react-router-dom";
import "../composants/styles/App.css";
import Accueil from "../composants/pages/accueil";
import ConnexionUtilisateur from "../composants/pages/connexionUtilisateur";
import AuthPage from "../composants/organims/testBackend";
import AccueilJoueur from "../composants/pages/AccueilJoueur";

import { ProtectedRoute } from "./ProtectedRoute";
import PageAdmin from "../composants/pages/PageAdmin";
import Postulation from "../composants/pages/postulation";
import Calendrier from "../composants/pages/calendrier";
import Evenements from "../composants/pages/evenements";
import AccueilPortailPatron from "../composants/pages/AccueilPatron";
import AccueilPortailCoach from "../composants/pages/AccueilCoach";
import CreationEvent from "../composants/pages/CreationEvent";
import ModifEvent from "../composants/pages/ModifEvent";

//requiredRole="JOUEUR"
import GestionDesPostulantPortailCoach from "../composants/pages/gestionDesInscriptionCoach";
import StateUser from "../composants/pages/StateUser";
import AdminJoueurDashbord from "../composants/organims/AdminJoueurDashbord";

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
      <ProtectedRoute requiredRole="JOUEUR">
        <AccueilJoueur />
      </ProtectedRoute>
    ),
  },
  {
    path: "/portail-coach",
    element: (
      <ProtectedRoute requiredRole="COACH">
        <AccueilPortailCoach />
      </ProtectedRoute>
    ),
  },
  {
    path: "/gestion-postulants-coach",
    element: (
      <ProtectedRoute requiredRole="COACH">
        <GestionDesPostulantPortailCoach />
      </ProtectedRoute>
    ),
  },
  {
    path: "/stateJoueur",
    element: (
      <ProtectedRoute requiredRole="JOUEUR">
        <StateUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "/creation-evenement",
    element: (
      <ProtectedRoute requiredRole="COACH">
        <CreationEvent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/modif-evenement/:id",
    element: (
      <ProtectedRoute requiredRole="COACH">
        <ModifEvent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/portail-patron",
    element: (
      <ProtectedRoute requiredRole="PATRON">
        <AccueilPortailPatron />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="ADMIN">
        <PageAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminDashboard",
    element: (
      <ProtectedRoute requiredRole="ADMIN">
        <AdminJoueurDashbord />
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
