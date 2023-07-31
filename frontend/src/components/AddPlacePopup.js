import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [nameCard, setNameCard] = React.useState('');
  const [linkCard, setLinkCard] = React.useState('');

  React.useEffect(() => {
    if (props.isOpen) {
      setNameCard('');
      setLinkCard('');
    }
  }, [props.isOpen]);

  function handleNameCardChange(evt) {
    setNameCard(evt.target.value);
  }

  function handlelinkCardChange(evt) {
    setLinkCard(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddCrad(nameCard, linkCard);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'image'}
      form={'card'}
      title={'Новое место'}
      buttonText={'Создать'}
      buttonLoadingText={'Сохранение...'}
      isLoading={props.isLoading}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          className="popup__input"
          type="text"
          name="name-image"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={nameCard}
          onChange={handleNameCardChange}
          required
        />
        <span className="popup__input-error popup__input-error_type_name-image"></span>
        <input
          className="popup__input"
          type="url"
          name="link"
          value={linkCard}
          onChange={handlelinkCardChange}
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error popup__input-error_type_link"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
