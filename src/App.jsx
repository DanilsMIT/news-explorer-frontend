import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import SavedNews from "./components/SavedNews/SavedNews";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "./context/currentUserContext";
import Lenis from "lenis";
import newsData from "./utils/newsData.json";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "Danilo" });
  const [savedArticles, setSavedArticles] = useState([newsData[0]]);
  const navigate = useNavigate();

  const handleSaveArticle = (article) => {
    setSavedArticles([article, ...savedArticles]);
  };

  const handleDeleteArticle = (articleId) => {
    setSavedArticles(savedArticles.filter((a) => a._id !== articleId));
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedin}
          userName={currentUser.name}
          onLoginClick={handleLogin}
          onLogoutClick={handleLogout}
        />

        <Routes>
          <Route
            path="/"
            element={
              <React.Fragment>
                <Main
                  isLoggedIn={isLoggedin}
                  articles={newsData}
                  savedArticles={savedArticles}
                  onSave={handleSaveArticle}
                  onDelete={handleDeleteArticle}
                />
                <About />
              </React.Fragment>
            }
          />

          <Route
            path="/saved-news"
            element={
              <SavedNews
                isLoggedIn={isLoggedin}
                savedArticles={savedArticles}
                onDelete={handleDeleteArticle}
              />
            }
          />
        </Routes>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
