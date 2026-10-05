import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import { useLocation } from "react-router-dom";

function NewsCardList({
  articles = [],
  savedArticles = [],
  isLoggedIn,
  onSave,
  onDelete,
}) {
  const location = useLocation();
  const isSavedNewsRoute = location.pathname === "/saved-news";

  return (
    <section
      className={`search-results ${
        isSavedNewsRoute ? "search-results_saved" : ""
      }`}
    >
      {!isSavedNewsRoute && (
        <h2 className="search-results__title">Resultados de la búsqueda</h2>
      )}

      <ul className="search-results__list">
        {articles.map((card) => {
          const isSaved = savedArticles.some((saved) => saved._id === card._id);

          return (
            <NewsCard
              key={card._id}
              card={card}
              isLoggedIn={isLoggedIn}
              isSaved={isSaved}
              onSave={onSave}
              onDelete={onDelete}
            />
          );
        })}
      </ul>

      {!isSavedNewsRoute && (
        <button className="search-results__show-more" type="button">
          Ver más
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
