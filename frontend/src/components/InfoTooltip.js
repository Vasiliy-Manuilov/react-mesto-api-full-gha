function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_infotooltip ${
        props.isOpen ? `popup_opened` : ''
      }`}
    >
      <div className="popup__info-tool-tip">
        <img className="popup__image-status" src={props.image} alt={props.title} />
        <h2 className="popup__message">{props.title}</h2>
        <button
          className="popup__button-close"
          type="button"
          title="Закрыть"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
