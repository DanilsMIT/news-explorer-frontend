import { useState, useEffect } from "react";
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

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => setVisibleCount(3), 0);
    return () => clearTimeout(timer);
  }, [articles]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const displayedArticles = isSavedNewsRoute
    ? articles
    : articles.slice(0, visibleCount);

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
        {displayedArticles.map((card, index) => {
          const uniqueKey = card._id || card.url || card.link || index;

          const isSaved = savedArticles.some((saved) => {
            const savedIdentifier = saved.url || saved.link;
            const cardIdentifier = card.url || card.link;
            return savedIdentifier === cardIdentifier;
          });

          return (
            <NewsCard
              key={uniqueKey}
              card={card}
              isLoggedIn={isLoggedIn}
              isSaved={isSaved}
              onSave={onSave}
              onDelete={onDelete}
              isSavedNewsRoute={isSavedNewsRoute}
            />
          );
        })}
      </ul>

      {!isSavedNewsRoute && visibleCount < articles.length && (
        <button
          className="search-results__show-more"
          type="button"
          onClick={handleShowMore}
        >
          Ver más
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
