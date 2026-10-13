import "./NewsCard.css";

function NewsCard({
  card,
  isLoggedIn,
  isSaved,
  onSave,
  onDelete,
  isSavedNewsRoute,
}) {
  const title = card.title;
  const text = card.description || card.text;
  const rawDate = card.publishedAt || card.date;
  const source = card.source?.name || card.source;
  const image = card.urlToImage || card.image;
  const link = card.url || card.link;
  const keyword =
    card.keyword || localStorage.getItem("lastKeyword") || "Noticias";

  const formattedDate = new Date(rawDate).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn && !isSavedNewsRoute) return;

    if (isSaved || isSavedNewsRoute) {
      onDelete(card);
    } else {
      onSave(card);
    }
  };

  return (
    <li className="news-card">
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="news-card__link"
      >
        <img className="news-card__image" src={image} alt={title} />

        {isSavedNewsRoute && (
          <span className="news-card__keyword">{keyword}</span>
        )}

        <button
          className={`news-card__button ${
            isSavedNewsRoute
              ? "news-card__button_type_delete"
              : isSaved
                ? "news-card__button_type_saved"
                : "news-card__button_type_save"
          }`}
          type="button"
          onClick={handleSaveClick}
        ></button>

        {!isLoggedIn && !isSavedNewsRoute && (
          <span className="news-card__tooltip">
            Inicia sesión para guardar artículos
          </span>
        )}

        {isSavedNewsRoute && (
          <span className="news-card__tooltip">Eliminar de guardados</span>
        )}

        <div className="news-card__info">
          <p className="news-card__date">{formattedDate}</p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__text">{text}</p>
          <p className="news-card__source">{source}</p>
        </div>
      </a>
    </li>
  );
}

export default NewsCard;
