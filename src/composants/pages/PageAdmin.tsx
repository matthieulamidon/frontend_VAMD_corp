import AdminEquipePage from "../organims/AdminEquipePage";
import NavbarAdmin from "../organims/navbarAdmin";

// <Navbar />
function PageAdmin() {
  return (
    <>
      <NavbarAdmin />
      <br></br>
      <br></br>
      <AdminEquipePage />
    </>
  );
}
// todo : ajouter la gestion des utilisateurs supression/modification/imposition d'equipe

export default PageAdmin;
