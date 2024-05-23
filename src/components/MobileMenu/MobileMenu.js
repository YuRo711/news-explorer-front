import { NavLink } from "react-router-dom";
import logoutWhite from "../../images/logout white.svg";
import "./MobileMenu.css";

function MobileMenu(props) {

  function openLoginModal() {
    props.setMenuOpen(false)
    props.openLoginModal();
  }

  const { isLoggedIn } = props;

  return (
    <div className={`menu ${props.isMenuOpen ? " menu__opened" : ""}`}>
      <div className="menu__container">
        <div className="menu__header">
          <h1 className="header__title">NewsExplorer</h1>
          <button className="menu__close-button"
            onClick={() => props.setMenuOpen(false)}
          />
        </div>
        <div className="menu__main">
          <nav className="menu__nav">
              <NavLink className="menu__link" to="/">
                Home
              </NavLink>
              {
                isLoggedIn ? 
                  <NavLink className="menu__link" to="/saved">
                    Saved articles
                  </NavLink>
                : ""
              }
            </nav>
            {
              isLoggedIn ?
                <button type="button"
                  className="menu__button"
                >
                  Elise
                  <img className="menu__button-icon" 
                    src={logoutWhite}
                    alt="logout icon"
                  />
                </button>
              :
                <button type="button"
                  className="menu__button"
                  onClick={openLoginModal}
                >
                    Sign in
                </button>
            }
          </div>
        </div>
    </div>
  );
}

export default MobileMenu;