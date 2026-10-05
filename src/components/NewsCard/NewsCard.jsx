import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./NewsCard.css";

function NewsCard({ card, isLoggedIn }) {
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();
  const isSavedNewsRoute = location.pathname === "/saved-news";

  const handleActionClick = () => {
    if (!isSavedNewsRoute && isLoggedIn) {
      setIsSaved(!isSaved);
    }
  };

  let buttonClass = "news-card__action-button ";

  if (isSavedNewsRoute) {
    buttonClass += "news-card__action-button_trash";
  } else if (isSaved) {
    buttonClass += "news-card__action-button_bookmark_active";
  } else {
    buttonClass += "news-card__action-button_bookmark";
  }

  return (
    <li className="news-card">
      <div className="news-card__image-container">
        <img src={card.image} alt={card.title} className="news-card__image" />

        {isSavedNewsRoute && (
          <div className="news-card__keyword">
            {card.keyword || "Naturaleza"}
          </div>
        )}

        <div className="news-card__action-container">
          {isSavedNewsRoute ? (
            <span className="news-card__tooltip">Eliminar de guardados</span>
          ) : !isLoggedIn ? (
            <span className="news-card__tooltip">
              Inicia sesión para guardar artículos
            </span>
          ) : null}

          <button
            className={buttonClass}
            type="button"
            onClick={handleActionClick}
          ></button>
        </div>
      </div>

      <div className="news-card__info">
        <p className="news-card__date">{card.date}</p>

        <h3 className="news-card__title">{card.title}</h3>

        <p className="news-card__text">{card.text}</p>

        <p className="news-card__source">{card.source}</p>
      </div>
    </li>
  );
}

export default NewsCard;
