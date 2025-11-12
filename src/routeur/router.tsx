import { createBrowserRouter } from "react-router-dom";
import "../App.css";
import Accueil from "../accueil";
import ConnexionUtilisateur from "../composants/pages/connexionUtilisateur";
import AuthPage from "../composants/organims/testBackend";
import Calendrier from "../composants/calendar/calendrier";
import Evenements from "../composants/Evenements/evenements";

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
