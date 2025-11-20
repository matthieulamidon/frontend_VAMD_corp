import "../styles/App.css";

const Footer = () => (
  <footer className="footer-vamd">
    <div className="footer-content-row">
      <div className="footer-section footer-catalogue">
        <h3>Catalogue</h3>
        <a href="/produits" className="footer-link">
          Produits
        </a>
        <a href="/calendrier" className="footer-link">
          Calendrier
        </a>
      </div>
      <div className="footer-section footer-infos">
        <h3>Informations</h3>
        <a href="/a-propos" className="footer-link">
          À propos
        </a>
        <a href="/mentions-legales" className="footer-link">
          Mentions légales
        </a>
      </div>
      <div className="footer-section footer-contacts">
        <h3>Contacts</h3>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener"
          className="footer-link"
        >
          Instagram
        </a>
        <a href="mailto:contact@vamd.com" className="footer-link">
          Mail
        </a>
      </div>
    </div>
    <div className="footer-copyright">
      © {new Date().getFullYear()} VAMD Corp. Tous droits réservés.
    </div>
  </footer>
);

export default Footer;
