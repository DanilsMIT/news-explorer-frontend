import "./About.css";
import authorImage from "../../images/author.jpg";

function About() {
  return (
    <section className="about">
      <img src={authorImage} alt="Danilo Isaac" className="about__image" />

      <div className="about__content">
        <h2 className="about__title">Acerca del autor</h2>

        <p className="about__text">
          Mi nombre es Danilo Isaac, estudiante de Tripleteen y Saint Leo
          University. Me apasiona el desarrollo web, la ciberseguridad y el
          software con enfoque UX/UI.
        </p>
        <p className="about__text">
          Conozco los lenguajes necesarios para el frontend, node y express.js
          para el backend, así como mongodb para una base de datos no
          relacionada.
        </p>
      </div>
    </section>
  );
}

export default About;
