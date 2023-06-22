import { NavLink, Link } from "react-router-dom";
import "./Header.scss";

function Header({ isLoggedIn, username }) {
  // Adds class to active page's link
  const navLinkActive = ({ isActive }) => {
    if (isActive) {
      return "header__link header__link--active";
    } else {
      return "header__link";
    }
  };

  return (
    <header className="header">
      <div className="header__user"></div>
      <Link to="/home">
        <div className="header__title">
          <div className="header__title header__title--1">go</div>
          <div className="header__title header__title--2">to</div>
          <div className="header__title header__title--3">karaoke</div>
        </div>
      </Link>
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__list-item">
            <NavLink className={navLinkActive} to="/home">
              SONG FINDER
            </NavLink>
          </li>
          {isLoggedIn ? (
            <li className="header__list-item">
              <NavLink className={navLinkActive} to="/profile">
                Profile
              </NavLink>
            </li>
          ) : (
            <li className="header__list-item">
              <NavLink className={navLinkActive} to="/login">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
