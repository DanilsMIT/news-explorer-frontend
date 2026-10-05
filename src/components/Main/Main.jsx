import { useEffect, useRef } from "react";
import "./Main.css";
import gsap from "gsap";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({ isLoggedIn, articles, savedArticles, onSave, onDelete }) {
  const heroRef = useRef(null);

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

          <form className="search-form">
            <input
              type="text"
              className="search-form__input"
              placeholder="Introduce un tema"
              required
            />

            <button type="submit" className="search-form__button">
              Buscar
            </button>
          </form>
        </div>
      </section>

      <NewsCardList
        articles={articles}
        savedArticles={savedArticles}
        isLoggedIn={isLoggedIn}
        onSave={onSave}
        onDelete={onDelete}
      />
    </main>
  );
}

export default Main;
