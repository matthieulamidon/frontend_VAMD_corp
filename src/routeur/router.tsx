import { createBrowserRouter } from "react-router-dom";
import '../App.css';
import Accueil from "../accueil";
import ConnexionUtilisateur from "../composants/pages/connexionUtilisateur";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  }
  ,
  {
    path: "/connexion",
    element: <ConnexionUtilisateur />,
  }
]);



export default router;
