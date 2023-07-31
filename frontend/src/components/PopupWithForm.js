function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? `popup_opened` : ''
      }`}
    >
      <div className="popup__container">
        <form
          className="popup__form"
          name={props.form}
          onSubmit={props.onSubmit}
          noValidate
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            className="popup__button-save"
            type="submit"
            title="Сохранить"
          >
            {props.isLoading ? props.buttonLoadingText : props.buttonText}
          </button>
        </form>
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

export default PopupWithForm;
