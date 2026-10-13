import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({ savedArticles, onDelete, isLoggedIn }) {
  return (
    <main className="saved-news">
      {/* ¡Aquí le pasamos savedArticles al Header para que funcione el contador! */}
      <SavedNewsHeader savedArticles={savedArticles} />

      <section className="saved-news__list-container">
        <NewsCardList
          articles={savedArticles}
          isLoggedIn={isLoggedIn}
          onDelete={onDelete}
        />
      </section>
    </main>
  );
}

export default SavedNews;
