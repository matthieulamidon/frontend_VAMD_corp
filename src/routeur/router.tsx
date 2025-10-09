import { createBrowserRouter } from "react-router-dom";
import '../App.css';
import Accueil from "../accueil";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  }
]);



export default router;
