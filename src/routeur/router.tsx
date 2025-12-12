import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import "../composants/styles/App.css";

import { ProtectedRoute } from "./ProtectedRoute";

// 🔥 Lazy loading pour réduire ton bundle
const Accueil = lazy(() => import("../composants/pages/accueil"));
const ConnexionUtilisateur = lazy(
  () => import("../composants/pages/connexionUtilisateur")
);
const AuthPage = lazy(() => import("../composants/organims/testBackend"));
const AccueilJoueur = lazy(() => import("../composants/pages/AccueilJoueur"));
const PageAdmin = lazy(() => import("../composants/pages/PageAdmin"));
const Postulation = lazy(() => import("../composants/pages/postulation"));
const Calendrier = lazy(() => import("../composants/pages/calendrier"));
const Evenements = lazy(() => import("../composants/pages/evenements"));
const AccueilPortailPatron = lazy(
  () => import("../composants/pages/AccueilPatron")
);
const AccueilPortailCoach = lazy(
  () => import("../composants/pages/AccueilCoach")
);
const CreationEvent = lazy(() => import("../composants/pages/CreationEvent"));
const ModifEvent = lazy(() => import("../composants/pages/ModifEvent"));
const ProfilJoueur = lazy(() => import("../composants/pages/profilJoueur"));
const GestionDesPostulantPortailCoach = lazy(
  () => import("../composants/pages/gestionDesInscriptionCoach")
);
const StateUser = lazy(() => import("../composants/pages/StateUser"));
const AdminJoueurDashbord = lazy(
  () => import("../composants/organims/AdminJoueurDashbord")
);

// Composant wrapper pour Suspense
const Loader = (
  <div style={{ color: "white", textAlign: "center", paddingTop: "30px" }}>
    Chargement...
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loader}>
        <Accueil />
      </Suspense>
    ),
  },
  {
    path: "/connexion",
    element: (
      <Suspense fallback={Loader}>
        <ConnexionUtilisateur />
      </Suspense>
    ),
  },
  {
    path: "/postulation",
    element: (
      <Suspense fallback={Loader}>
        <ProtectedRoute requiredRole="USER">
          <Postulation />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/auth-test",
    element: (
      <Suspense fallback={Loader}>
        <AuthPage />
      </Suspense>
    ),
  },
  {
    path: "/portail-joueur",
    element: (
      <Suspense fallback={Loader}>
        <ProtectedRoute requiredRole="JOUEUR">
          <AccueilJoueur />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/portail-coach",
    element: (
      <Suspense fallback={Loader}>
        <ProtectedRoute requiredRole="COACH">
          <AccueilPortailCoach />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/gestion-postulants-coach",
    element: (
      <Suspense fallback={Loader}>
        <ProtectedRoute requiredRole="COACH">
          <GestionDesPostulantPortailCoach />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/stateJoueur",
    element: (
      <Suspense fallback={Loader}>
        <ProtectedRoute requiredRole="JOUEUR">
          <StateUser />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/creation-evenement",
    element: (
      <Suspense fallback={Loader}>
        <ProtectedRoute requiredRole="COACH">
          <CreationEvent />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/modif-evenement/:id",
    element: (
      <Suspense fallback={Loader}>
        <ProtectedRoute requiredRole="COACH">
          <ModifEvent />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/portail-patron",
    element: (
      <Suspense fallback={Loader}>
        <ProtectedRoute requiredRole="PATRON">
          <AccueilPortailPatron />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={Loader}>
        <ProtectedRoute requiredRole="ADMIN">
          <PageAdmin />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/adminDashboard",
    element: (
      <Suspense fallback={Loader}>
        <ProtectedRoute requiredRole="ADMIN">
          <AdminJoueurDashbord />
        </ProtectedRoute>
      </Suspense>
    ),
  },

  // Pages publiques
  {
    path: "/calendrier",
    element: (
      <Suspense fallback={Loader}>
        <Calendrier />
      </Suspense>
    ),
  },
  {
    path: "/evenements",
    element: (
      <Suspense fallback={Loader}>
        <Evenements />
      </Suspense>
    ),
  },
  {
    path: "/profil",
    element: (
      <Suspense fallback={Loader}>
        <ProfilJoueur />
      </Suspense>
    ),
  },

  // Fallback route
  {
    path: "*",
    element: (
      <Suspense fallback={Loader}>
        <Accueil />
      </Suspense>
    ),
  },
]);

export default router;
