import { NavLink, useLocation } from "react-router-dom";
import logoutWhite from "../../images/logout white.svg";
import logoutBlack from "../../images/logout black.svg";
import "./Header.css";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header(props) {
  const { isLoggedIn, isOnMobile } = props;
  const path = useLocation().pathname;
  const isOnMain = path === "/";
  const [isMenuOpen, setMenuOpen] = useState(false);

  const currentUser = useContext(CurrentUserContext);
  const [username, setUsername] = useState(currentUser.name);

  useEffect(() => {
    setUsername(currentUser.name);
  }, [currentUser.name]);

  return (
    <header className={"header" + (isOnMain ? " header_page_main" : "")}>
      <h1 className="header__title">NewsExplorer</h1>
      {isOnMobile ? (
        <button
          className={
            "header__menu-button " +
            (isOnMain
              ? " header__menu-button_white"
              : "header__menu-button_black")
          }
          onClick={() => setMenuOpen(true)}
        />
      ) : (
        <nav className="header__nav">
          <NavLink className="header__link" to="/">
            <div
              className={
                "header__link-button" +
                (isOnMain ? " header__link-button_page_main" : "") +
                (path === "/" ? " header__link-button_chosen" : "")
              }
            >
              Home
            </div>
          </NavLink>
          {isLoggedIn ? (
            <NavLink className="header__link" to="/saved">
              <div
                className={
                  "header__link-button" +
                  (isOnMain ? " header__link-button_page_main" : "") +
                  (path === "/saved" ? " header__link-button_chosen" : "")
                }
              >
                Saved articles
              </div>
            </NavLink>
          ) : (
            ""
          )}
        </nav>
      )}
      {isOnMobile ? (
        ""
      ) : isLoggedIn ? (
        <button
          type="button"
          className={
            "header__button header__button_type_logout" +
            (isOnMain ? " header__button_page_main" : "")
          }
          onClick={props.logOut}
        >
          {username}
          <img
            className="header__button-icon"
            src={isOnMain ? logoutWhite : logoutBlack}
            alt="logout icon"
          />
        </button>
      ) : (
        <button
          type="button"
          className={
            "header__button header__button_page_main header__button_type_login"
          }
          onClick={props.openLoginModal}
        >
          Sign in
        </button>
      )}
      {isOnMobile ? (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
          openLoginModal={props.openLoginModal}
          logOut={props.logOut}
          username={username}
        />
      ) : (
        ""
      )}
    </header>
  );
}

export default Header;
