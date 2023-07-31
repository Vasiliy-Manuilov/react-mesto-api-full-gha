import headerlogo from '../images/header/header-logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ userData, loggedIn, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img
        src={headerlogo}
        alt="логотип с
надписью Mesto"
        className="header__logo"
      />
      <ul className="header__nav">
        {loggedIn && (
          <li>
            <p className="header__user-email">{userData}</p>
          </li>
        )}
        {loggedIn && (
          <li>
            <button type="button" className="header__btn" onClick={onSignOut}>
              Выйти
            </button>
          </li>
        )}

        {location.pathname !== '/sign-in' && location.pathname !== '/' && (
          <li>
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          </li>
        )}
        {location.pathname !== '/sign-up' && location.pathname !== '/' && (
          <li>
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
