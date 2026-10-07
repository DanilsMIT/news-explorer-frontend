import { useContext, useEffect, useRef } from "react";
import "./SavedNewsHeader.css";
import { CurrentUserContext } from "../../context/currentUserContext";
import gsap from "gsap";

function SavedNewsHeader({ savedArticles = [] }) {
  const currentUser = useContext(CurrentUserContext);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".saved-news-header__anim", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const totalArticles = savedArticles.length;
  const keywordsArray = savedArticles.map((article) => article.keyword);
  const uniqueKeywords = [...new Set(keywordsArray)];

  let keywordsSpan;

  if (uniqueKeywords.length === 1) {
    keywordsSpan = (
      <span className="saved-news-header__keywords_bold">
        {uniqueKeywords[0]}
      </span>
    );
  } else if (uniqueKeywords.length === 2) {
    keywordsSpan = (
      <span className="saved-news-header__keywords_bold">
        {uniqueKeywords[0]} y {uniqueKeywords[1]}
      </span>
    );
  } else if (uniqueKeywords.length > 2) {
    keywordsSpan = (
      <>
        <span className="saved-news-header__keywords_bold">
          {uniqueKeywords[0]}, {uniqueKeywords[1]}
        </span>
        , y{" "}
        <span className="saved-news-header__keywords_bold">
          {uniqueKeywords.length - 2} más
        </span>
      </>
    );
  }

  return (
    <section className="saved-news-header" ref={headerRef}>
      <p className="saved-news-header__subtitle saved-news-header__anim">
        Artículos guardados
      </p>

      <h2 className="saved-news-header__title saved-news-header__anim">
        {currentUser.name}, tienes {totalArticles} artículos guardados
      </h2>

      {totalArticles > 0 && (
        <p className="saved-news-header__keywords saved-news-header__anim">
          Por palabras clave: {keywordsSpan}
        </p>
      )}
    </section>
  );
}

export default SavedNewsHeader;
