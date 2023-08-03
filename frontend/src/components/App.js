import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import api from '../utils/Api';
import * as auth from '../utils/Auth';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardQuestionPopup from './DeleteCardQuestionPopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import resolve from '../images/popup/resolve.svg';
import reject from '../images/popup/reject.svg';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardQuestionPopupOpen, setIsDeleteCardQuestionPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [titleInfoToolTip, setTitleInfoToolTip] = React.useState('');
  const [imageInfoToolTip, setImageInfoToolTip] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardToBeDelete, setCardToBeDelete] = React.useState({});
  const [userData, setUserData] = React.useState({});

  function handleRegister(email, password) {
    auth
      .registerUser(email, password)
      .then(() => {
        setImageInfoToolTip(resolve);
        setTitleInfoToolTip('Вы успешно зарегистрировались!');
        navigate('/sign-in');
      })
      .catch(() => {
        setImageInfoToolTip(reject);
        setTitleInfoToolTip('Что-то пошло не так! Попробуйте ещё раз.');
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogin(email, password) {
    auth
      .loginUser(email, password)
      .then(() => {
        setIsLoggedIn(true);
        setUserData(email);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
    auth
      .getToken()
      .then((res) => {
          setIsLoggedIn(true);
          setUserData(res.user.email);
          navigate('/', { replace: true });
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.error(err);
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([info, cards]) => {
        setCurrentUser(info.user);
        setCards(cards);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(!isLoading);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(name, about) {
    setIsLoading(!isLoading);
    api
      .patchUserInfo(name, about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(!isLoading);
    api
      .patchAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(name, link) {
    setIsLoading(!isLoading);
    api
      .postNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isDeleteCardQuestionPopupOpen ||
      selectedCard ||
      isInfoTooltipOpen
    ) {
      function handleEscClose(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }

      function handleClickWindowClose(evt) {
        if (evt.target.classList.contains('popup')) {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEscClose);
      document.addEventListener('mousedown', handleClickWindowClose);

      return () => {
        document.removeEventListener('keydown', handleEscClose);
        document.removeEventListener('mousedown', handleClickWindowClose);
      };
    }
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isDeleteCardQuestionPopupOpen,
    selectedCard,
    isInfoTooltipOpen,
  ]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setIsDeleteCardQuestionPopupOpen(true);
    setCardToBeDelete(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/login-in');
    setIsLoggedIn(false);
    setUserData('');
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardQuestionPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userData={userData} loggedIn={isLoggedIn} onSignOut={signOut} />
        <Routes>
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                component={Main}
                loggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardDelete={handleCardDeleteClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? '/' : '/sign-in'} />}
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCrad={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <DeleteCardQuestionPopup
          isOpen={isDeleteCardQuestionPopupOpen}
          onClose={closeAllPopups}
          onConfirmCardDelete={handleCardDelete}
          card={cardToBeDelete}
          isLoading={isLoading}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={titleInfoToolTip}
          image={imageInfoToolTip}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
