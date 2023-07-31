import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-edit"
          type="button"
          title="Редактировать аватар"
          onClick={onEditAvatar}
        >
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__image"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            title="Редактировать профиль"
            onClick={onEditProfile}
          ></button>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          title="Добавить изображение"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards" aria-label="фотогалерея">
        <ul className="elements">
          {cards.map((card, id) => (
            <Card
              key={id}
              card={card}
              link={card.link}
              name={card.name}
              likes={card.likes.length}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
