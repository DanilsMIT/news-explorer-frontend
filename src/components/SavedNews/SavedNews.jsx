import "./SavedNews.css";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({ isLoggedIn, savedArticles, onDelete }) {
  return (
    <main className="saved-news">
      <SavedNewsHeader />
      <NewsCardList
        articles={savedArticles}
        savedArticles={savedArticles}
        isLoggedIn={isLoggedIn}
        onDelete={onDelete}
      />
    </main>
  );
}

export default SavedNews;
