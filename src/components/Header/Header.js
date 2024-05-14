import { NavLink, useLocation } from "react-router-dom";
import logoutWhite from "../../images/logout white.svg";
import logoutBlack from "../../images/logout black.svg";
import "./Header.css";

function Header(props) {
  const { isLoggedIn } = props;
  const path = useLocation().pathname;
  const isOnMain = path === "/";

  return (
    <header className={"header" + (isOnMain ? " header_page_main" : "")}>
      <h1 className="header__title">NewsExplorer</h1>
      <nav className="header__nav">
        <NavLink className="header__link" to="/">
          <div className={"header__link-button" + 
            (isOnMain ? " header__link-button_page_main" : "") +
            (path === "/" ? " header__link-button_chosen" : "")}
          >
            Home
          </div>
        </NavLink>
        {
          isLoggedIn ? 
            <NavLink className="header__link" to="/saved">
              <div className={"header__link-button" + 
                (isOnMain ? " header__link-button_page_main" : "") +
                (path === "/saved" ? " header__link-button_chosen" : "")}
              >
                Saved articles
              </div>
          </NavLink>
          : ""
        }
      </nav>
      {
        isLoggedIn ?
          <button type="button"
          className={"header__button header__button_type_logout" +
            (isOnMain ? " header__button_page_main" : "")
          }>
            Elise
            <img className="header__button-icon" 
              src={isOnMain ? logoutWhite : logoutBlack}
            />
          </button>
        :
          <button type="button"
            className={"header__button header__button_page_main header__button_type_login"}>
              Sign in
          </button>
      }
    </header>
  );
}

export default Header;
