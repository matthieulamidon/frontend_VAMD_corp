import { createBrowserRouter } from "react-router-dom";
import "../App.css";
import Accueil from "../accueil";
import ConnexionUtilisateur from "../composants/pages/connexionUtilisateur";
import AuthPage from "../composants/organims/testBackend";
import Postulation from "../composants/pages/postulation";

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
    element: <Postulation />,
  },
  {
    path: "/auth-test",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <Accueil />,
  },
]);

export default router;
