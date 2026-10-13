import "./NotFound.css";
import notFoundIcon from "../../images/not-found.svg";

function NotFound() {
  return (
    <div className="not-found">
      <img className="not-found__icon" src={notFoundIcon} alt="Lupa triste" />
      <h3 className="not-found__title">Nada encontrado</h3>
      <p className="not-found__text">
        Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.
      </p>
    </div>
  );
}

export default NotFound;
