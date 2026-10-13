import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ isLoggedIn, currentUser, onLoginClick, onLogout }) {
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";

  return (
    <header className={`header ${isSavedNews ? "header_theme_light" : ""}`}>
      <Link to="/" className="header__logo">
        NewsExplorer
      </Link>

      <input
        type="checkbox"
        id="mobile-menu"
        className="header__menu-checkbox"
      />

      <label htmlFor="mobile-menu" className="header__menu-button">
        <span
          className={`header__menu-icon ${
            isSavedNews ? "header__menu-icon_theme_light" : ""
          }`}
        ></span>
      </label>

      <nav className="header__nav">
        <Link
          to="/"
          className={`header__link ${
            !isSavedNews ? "header__link_active" : ""
          }`}
        >
          Inicio
        </Link>

        {isLoggedIn && (
          <Link
            to="/saved-news"
            className={`header__link ${
              isSavedNews ? "header__link_active" : ""
            }`}
          >
            Artículos guardados
          </Link>
        )}

        {isLoggedIn ? (
          <button className="header__button" onClick={onLogout}>
            {currentUser?.name}{" "}
            <span
              className={`header__logout-icon ${
                isSavedNews ? "header__logout-icon_theme_light" : ""
              }`}
            ></span>
          </button>
        ) : (
          <button className="header__button" onClick={onLoginClick}>
            Iniciar sesión
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
