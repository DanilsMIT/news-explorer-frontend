import { useState, useEffect } from "react";
import Popup from "../Popup";
import "./PopupForm.css";

function RegisterPopup({ isOpen, onClose, onSwitch, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isInvalid =
    !email ||
    !password ||
    !username ||
    emailError !== "" ||
    passwordError !== "" ||
    usernameError !== "";

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setEmail("");
        setPassword("");
        setUsername("");
        setEmailError("");
        setPasswordError("");
        setUsernameError("");
        setGeneralError("");
        setShowPassword(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(e.target.validationMessage);
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);

    if (!val) {
      setPasswordError("La contraseña es obligatoria.");
    } else if (val.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
    } else if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[#@$]).+$/.test(val)) {
      setPasswordError(
        "Debe contener al menos una mayúscula, un número y un símbolo (#, $, @).",
      );
    } else {
      setPasswordError("");
    }
  };

  const handleUsernameChange = (e) => {
    const val = e.target.value;
    setUsername(val);

    if (!val) {
      setUsernameError("El nombre de usuario es obligatorio.");
    } else if (val.length < 2 || val.length > 30) {
      setUsernameError("El nombre debe tener entre 2 y 30 caracteres.");
    } else {
      setUsernameError(e.target.validationMessage);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isInvalid) return;

    setGeneralError("");
    onSubmit({ email, password, name: username, setGeneralError });
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Inscribirse">
      <form className="popup__form" onSubmit={handleSubmit} noValidate>
        <label className="popup__label">Correo electrónico</label>

        <input
          className="popup__input"
          type="email"
          placeholder="Introduce tu correo electrónico"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <span className="popup__input-error">{emailError}</span>

        <label className="popup__label">Contraseña</label>

        <div className="popup__password-wrapper">
          <input
            className="popup__input"
            type={showPassword ? "text" : "password"}
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="button"
            className={`popup__password-toggle ${
              !showPassword ? "popup__password-toggle_hidden" : ""
            }`}
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Mostrar u ocultar contraseña"
          ></button>
        </div>

        <span className="popup__input-error">{passwordError}</span>

        <label className="popup__label">Nombre de usuario</label>

        <input
          className="popup__input"
          type="text"
          placeholder="Introduce tu nombre de usuario"
          value={username}
          onChange={handleUsernameChange}
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__input-error">{usernameError}</span>

        <span className="popup__general-error">{generalError}</span>

        <button
          className={`popup__submit ${
            isInvalid ? "popup__submit_disabled" : ""
          }`}
          type="submit"
          disabled={isInvalid}
        >
          Inscribirse
        </button>

        <p className="popup__switch">
          o{" "}
          <span className="popup__switch-link" onClick={onSwitch}>
            iniciar sesión
          </span>
        </p>
      </form>
    </Popup>
  );
}

export default RegisterPopup;
