import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardQuestionPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onConfirmCardDelete(props.card);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'confirm'}
      form={'confirm'}
      title={'Вы уверены?'}
      buttonText={'Подтвердить'}
      buttonLoadingText={'Удаление...'}
      isLoading={props.isLoading}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardQuestionPopup;
