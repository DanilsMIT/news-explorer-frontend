import Popup from "../Popup";

function InfoTooltip({ isOpen, onClose, onLoginClick }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup__info-container">
        <h2 className="popup__title">
          ¡El registro se ha completado con éxito!
        </h2>
        <span
          className="popup__switch-link popup__switch-link_type_info"
          onClick={onLoginClick}
        >
          Iniciar sesión
        </span>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
