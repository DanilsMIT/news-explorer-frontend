import { Link } from "react-router-dom";
import "./Footer.css";
import githubIcon from "../../images/github.svg";
import facebookIcon from "../../images/fb.svg";

function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; 2021 Supersite, Powered by News API
      </p>

      <nav className="footer__nav">
        <Link to="/" className="footer__link" onClick={handleScrollToTop}>
          Inicio
        </Link>
        <a
          href="https://tripleten.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          Practicum
        </a>
      </nav>

      <div className="footer__socials">
        <a
          href="https://github.com/DanilsMIT"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-link"
        >
          <img src={githubIcon} alt="GitHub" className="footer__social-icon" />
        </a>

        <a
          href="https://www.linkedin.com/in/daniloisaacmelgar/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-link"
        >
          <img
            src={facebookIcon}
            alt="LinkedIn"
            className="footer__social-icon"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
