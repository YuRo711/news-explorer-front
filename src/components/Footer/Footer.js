import "./Footer.css";
import github from "../../images/github.svg";

function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © 2024 YuRo711, Powered by News API
      </p>
      <ul className="footer__links">
        <li className="footer__link-item">
          <a className="footer__link" href="/">
            Home
          </a>
        </li>
        <li className="footer__link-item">
          <a className="footer__link" href="https://tripleten.com">
            TripleTen
          </a>
        </li>
      </ul>
      <ul className="footer__icons">
        <li className="footer__icon-item">
          <a className="footer__link" href="https://github.com/YuRo711">
            <img className="footer__icon"
              src={github}
            />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;