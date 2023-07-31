function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_viewer ${props.card ? 'popup_opened' : ''}`}
    >
      <div className="popup__container-image">
        <img
          className="popup__image"
          src={props.card ? props.card.link : ''}
          alt={props.card ? props.card.name : ''}
        />
        <h2 className="popup__heading-image">
          {props.card ? props.card.name : ''}
        </h2>
        <button
          className="popup__button-close"
          type="button"
          title="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
