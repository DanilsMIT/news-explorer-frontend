import "./App.css";
import { useState, useEffect, Fragment } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/Popup/FormsPopup/LoginPopup";
import RegisterPopup from "./components/Popup/FormsPopup/RegisterPopup";
import InfoTooltip from "./components/Popup/InfoTooltip/InfoTooltip";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "./context/currentUserContext";
import { newsApi } from "./utils/NewsApi";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("jwt") !== null,
  );

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("mockDatabaseUser");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      return { name: parsed.username || "User" };
    }

    return { name: "User" };
  });

  const [savedArticles, setSavedArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const localSaved =
        JSON.parse(localStorage.getItem("savedArticles")) || [];
      setSavedArticles(localSaved);

      const localSearch =
        JSON.parse(localStorage.getItem("lastSearchResults")) || [];

      if (localSearch.length > 0) {
        setSearchResults(localSearch);
        setHasSearched(true);
      }
    }
  }, [isLoggedIn]);

  const closeAllPopups = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  const handleRegisterSubmit = (userData) => {
    localStorage.setItem("mockDatabaseUser", JSON.stringify(userData));
    closeAllPopups();
    setIsInfoTooltipOpen(true);
  };

  const handleLoginSubmit = ({ email, password, setGeneralError }) => {
    const storedUserString = localStorage.getItem("mockDatabaseUser");

    if (!storedUserString) {
      setGeneralError("No hay usuarios registrados. Inscríbete primero.");
      return;
    }

    const storedUser = JSON.parse(storedUserString);

    if (storedUser.email === email && storedUser.password === password) {
      setIsLoggedIn(true);
      setCurrentUser({ name: storedUser.username || "User" });
      localStorage.setItem("jwt", "token-jwt-valido-12345");
      closeAllPopups();
    } else {
      setGeneralError("Correo o contraseña incorrectos.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ name: "User" });
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const handleSearch = (keyword) => {
    setIsSearching(true);
    setHasSearched(true);
    setSearchError(false);
    setSearchResults([]);

    newsApi
      .getNews(keyword)
      .then((data) => {
        setSearchResults(data.articles || []);
        localStorage.setItem(
          "lastSearchResults",
          JSON.stringify(data.articles || []),
        );
        localStorage.setItem("lastKeyword", keyword);
      })
      .catch((err) => {
        console.error(err);
        setSearchError(true);
      })
      .finally(() => {
        setIsSearching(false);
      });
  };

  const handleSaveArticle = (article) => {
    const savedArticle = savedArticles.find(
      (a) => a.url === (article.url || article.link),
    );

    if (savedArticle) {
      handleDeleteArticle(savedArticle);
    } else {
      const newArticle = {
        ...article,
        _id: Date.now().toString(),
        keyword: localStorage.getItem("lastKeyword") || "Noticias",
      };

      const newSavedArticles = [...savedArticles, newArticle];

      setSavedArticles(newSavedArticles);
      localStorage.setItem("savedArticles", JSON.stringify(newSavedArticles));
    }
  };

  const handleDeleteArticle = (articleToDelete) => {
    const targetId =
      articleToDelete._id || articleToDelete.url || articleToDelete.link;

    const newSavedArticles = savedArticles.filter(
      (a) => a._id !== targetId && a.url !== targetId && a.link !== targetId,
    );

    setSavedArticles(newSavedArticles);
    localStorage.setItem("savedArticles", JSON.stringify(newSavedArticles));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <Header
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  onLoginClick={() => setIsLoginPopupOpen(true)}
                  onSearch={handleSearch}
                />

                <Main
                  isLoggedIn={isLoggedIn}
                  articles={searchResults}
                  savedArticles={savedArticles}
                  isSearching={isSearching}
                  hasSearched={hasSearched}
                  searchError={searchError}
                  onSearch={handleSearch}
                  onSave={handleSaveArticle}
                  onDelete={handleDeleteArticle}
                />

                <About />
              </Fragment>
            }
          />

          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Fragment>
                  <Header
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    onLogout={handleLogout}
                  />

                  <SavedNews
                    isLoggedIn={isLoggedIn}
                    savedArticles={savedArticles}
                    onDelete={handleDeleteArticle}
                    currentUser={currentUser}
                  />
                </Fragment>
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleLoginSubmit}
          onSwitch={() => {
            setIsLoginPopupOpen(false);
            setIsRegisterPopupOpen(true);
          }}
        />

        <RegisterPopup
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleRegisterSubmit}
          onSwitch={() => {
            setIsRegisterPopupOpen(false);
            setIsLoginPopupOpen(true);
          }}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          onLoginClick={() => {
            setIsInfoTooltipOpen(false);
            setIsLoginPopupOpen(true);
          }}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
