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
import { mainApi } from "./utils/MainApi";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "User" });
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      Promise.all([mainApi.getUserInfo(token), mainApi.getArticles(token)])
        .then(([userData, articlesData]) => {
          setCurrentUser({
            name: userData.name || userData.data?.name || "User",
          });

          const articles = Array.isArray(articlesData)
            ? articlesData
            : articlesData.data || [];

          setSavedArticles(articles.reverse());
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token inválido o expirado:", err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser({ name: "User" });
        });
    }
  }, []);

  const closeAllPopups = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  const handleRegisterSubmit = (userData) => {
    mainApi
      .register(userData.email, userData.password, userData.name)
      .then(() => {
        closeAllPopups();
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.error("Error al registrarse:", err);
      });
  };

  const handleLoginSubmit = ({ email, password, setGeneralError }) => {
    mainApi
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);

          Promise.all([
            mainApi.getUserInfo(data.token),
            mainApi.getArticles(data.token),
          ])
            .then(([userData, articlesData]) => {
              setCurrentUser({
                name: userData.name || userData.data?.name || "User",
              });

              const articles = Array.isArray(articlesData)
                ? articlesData
                : articlesData.data || [];

              setSavedArticles(articles.reverse());
              closeAllPopups();
            })
            .catch(console.error);
        }
      })
      .catch((err) => {
        console.error("Error al iniciar sesión:", err);
        setGeneralError("Correo o contraseña incorrectos.");
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ name: "User" });
    localStorage.removeItem("jwt");
    setSearchResults([]);
    setSavedArticles([]);
    setHasSearched(false);
    setCurrentKeyword("");
    navigate("/");
  };

  const handleSearch = (keyword) => {
    setIsSearching(true);
    setHasSearched(true);
    setSearchError(false);
    setSearchResults([]);
    setCurrentKeyword(keyword);

    newsApi
      .getNews(keyword)
      .then((data) => {
        setSearchResults(data.articles || []);
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
      (a) => a.link === (article.url || article.link),
    );

    if (savedArticle) {
      handleDeleteArticle(savedArticle);
    } else {
      const token = localStorage.getItem("jwt");

      const newArticle = {
        keyword: currentKeyword || "Noticias",
        title: article.title,
        text: article.description || "Sin descripción",
        date: article.publishedAt || article.date,
        source: article.source?.name || article.source || "Desconocido",
        link: article.url || article.link,
        image:
          article.urlToImage ||
          article.image ||
          "https://via.placeholder.com/150",
      };

      mainApi
        .saveArticle(token, newArticle)
        .then((saved) => {
          const finalSaved = saved.data || saved;
          setSavedArticles([finalSaved, ...savedArticles]);
        })
        .catch(console.error);
    }
  };

  const handleDeleteArticle = (articleToDelete) => {
    const token = localStorage.getItem("jwt");
    const targetId = articleToDelete._id;

    if (!targetId) return;

    mainApi
      .deleteArticle(token, targetId)
      .then(() => {
        setSavedArticles((prevArticles) =>
          prevArticles.filter((a) => a._id !== targetId),
        );
      })
      .catch(console.error);
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
