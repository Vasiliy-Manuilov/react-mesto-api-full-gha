import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  useEffect(() => {
    if (props.isOpen) {
    setName(currentUser.name);
    setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'profile'}
      form={'profile'}
      title={'Редактировать профиль'}
      buttonText={'Сохранить'}
      buttonLoadingText={'Сохранение...'}
      isLoading={props.isLoading}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          className="popup__input"
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
          required
        />
        <span className="popup__input-error popup__input-error_type_name"></span>
        <input
          className="popup__input"
          type="text"
          name="occupation"
          placeholder="Занятость"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <span className="popup__input-error popup__input-error_type_occupation"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
