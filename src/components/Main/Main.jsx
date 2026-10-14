import { useEffect, useRef, useState } from "react";
import "./Main.css";
import gsap from "gsap";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";

function Main({
  isLoggedIn,
  articles = [],
  savedArticles,
  onSave,
  onDelete,
  onSearch,
  isSearching,
  hasSearched,
  searchError,
}) {
  const heroRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero__anim", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const sanitizedKeyword = keyword.trim().replace(/\s+/g, " ");

    if (!sanitizedKeyword) {
      setInputError("Por favor, introduce una palabra clave.");
      return;
    }

    if (sanitizedKeyword.length < 2) {
      setInputError("La búsqueda debe tener al menos 2 caracteres.");
      return;
    }

    setInputError("");
    onSearch(sanitizedKeyword);
  };

  return (
    <main className="main">
      <section className="hero" ref={heroRef}>
        <div className="hero__content">
          <h1 className="hero__title hero__anim">
            ¿Qué está pasando en el mundo?
          </h1>

          <p className="hero__subtitle hero__anim">
            Encuentra las últimas noticias sobre cualquier tema y guárdalas en
            tu cuenta personal.
          </p>

          <form className="search-form" onSubmit={handleSearchSubmit}>
            <div
              className="search-form__wrapper"
              style={{ width: "100%", position: "relative" }}
            >
              <input
                type="text"
                className="search-form__input"
                placeholder="Introduce un tema (ej. Tecnología, Marte, IA)"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setInputError("");
                }}
              />

              {inputError && (
                <span
                  className="search-form__error"
                  style={{
                    position: "absolute",
                    bottom: "-25px",
                    left: "20px",
                    color: "#ff0000",
                    fontSize: "12px",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  {inputError}
                </span>
              )}
            </div>

            <button type="submit" className="search-form__button">
              Buscar
            </button>
          </form>
        </div>
      </section>

      {isSearching && <Preloader />}

      {!isSearching &&
        hasSearched &&
        (articles.length === 0 || searchError) && <NotFound />}

      {!isSearching && hasSearched && articles.length > 0 && (
        <NewsCardList
          articles={articles}
          savedArticles={savedArticles}
          isLoggedIn={isLoggedIn}
          onSave={onSave}
          onDelete={onDelete}
        />
      )}
    </main>
  );
}

export default Main;
