import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'avatar'}
      form={'avatar'}
      title={'Обновить аватар'}
      buttonText={'Сохранить'}
      buttonLoadingText={'Сохранение...'}
      isLoading={props.isLoading}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="url"
        name="url"
        placeholder="Ссылка на аватар"
        ref={avatarRef}
        required
      />
      <span className="popup__input-error popup__input-error_type_url"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
