import { useContext, useEffect, useRef } from "react";
import "./SavedNewsHeader.css";
import { CurrentUserContext } from "../../context/currentUserContext";
import gsap from "gsap";

function SavedNewsHeader() {
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

  return (
    <section className="saved-news-header" ref={headerRef}>
      <p className="saved-news-header__subtitle saved-news-header__anim">
        Artículos guardados
      </p>

      <h2 className="saved-news-header__title saved-news-header__anim">
        {currentUser.name}, tienes 5 artículos guardados
      </h2>

      <p className="saved-news-header__keywords saved-news-header__anim">
        Por palabras clave:{" "}
        <span className="saved-news-header__keywords_bold">
          Naturaleza, Yellowstone
        </span>
        , y <span className="saved-news-header__keywords_bold">2 más</span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
