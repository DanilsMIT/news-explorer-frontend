import { useState, useEffect } from "react";
import Popup from "../Popup";
import "./PopupForm.css";

function LoginPopup({ isOpen, onClose, onSwitch, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setEmail("");
        setPassword("");
        setGeneralError("");
        setShowPassword(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setGeneralError("Por favor ingresa tu correo y contraseña.");
      return;
    }

    setGeneralError("");
    onSubmit({ email, password, setGeneralError });
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Iniciar sesión">
      <form className="popup__form" onSubmit={handleSubmit} noValidate>
        <label className="popup__label">Correo electrónico</label>

        <input
          className="popup__input"
          type="email"
          placeholder="Introduce tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="popup__label">Contraseña</label>

        <div className="popup__password-wrapper">
          <input
            className="popup__input"
            type={showPassword ? "text" : "password"}
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={`popup__password-toggle ${!showPassword ? "popup__password-toggle_hidden" : ""}`}
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Mostrar u ocultar contraseña"
          ></button>
        </div>

        <span className="popup__general-error">{generalError}</span>

        <button
          className={`popup__submit ${
            !email || !password ? "popup__submit_disabled" : ""
          }`}
          type="submit"
          disabled={!email || !password}
        >
          Iniciar sesión
        </button>

        <p className="popup__switch">
          o{" "}
          <span className="popup__switch-link" onClick={onSwitch}>
            inscribirse
          </span>
        </p>
      </form>
    </Popup>
  );
}

export default LoginPopup;
