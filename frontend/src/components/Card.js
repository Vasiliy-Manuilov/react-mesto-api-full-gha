import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__button-like ${
    isLiked && 'card__button-like_active'
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          type="button"
          title="Удалить"
          className="card__btn-delete"
          onClick={handleDeleteClick}
        />
      )}
      <div className="card__info">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            title="Лайкнуть"
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-count">{props.likes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
