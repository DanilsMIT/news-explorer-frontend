import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "./context/currentUserContext";
import { useState, useEffect } from "react";
import Lenis from "lenis";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "Danilo" });
  const navigate = useNavigate();

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
    console.log("abriendo formulario");
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
          <Route path="/" element={<Main />} />
          <Route path="/saved-news" element={<div>Noticias guardadas</div>} />
        </Routes>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
