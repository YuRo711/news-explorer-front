import { NavLink } from "react-router-dom";
import "./Header.css";

function Header(props) {
  return (
    <header className="header">
      <h1 className="header__title">NewsExplorer</h1>
      <nav className="header__nav">
        <NavLink className="header__link" to="/">
          <div className="header__link-button">
            Home
          </div>
        </NavLink>
      </nav>
      <button type="button"
        className="header__button">
          Sign in
      </button>
    </header>
  );
}

export default Header;
