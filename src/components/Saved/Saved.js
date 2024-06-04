import { Navigate } from "react-router-dom";
import "./Saved.css";
import { placeholderSaved } from "../../utils/constants";
import News from "../News/News";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Saved(props) {

  function getKeywords(articles) {
    if (!articles)
      return;

    const keywords = articles
      .map((data) => data.keyword );
    const uniqueKeywords = keywords
      .filter(i => keywords.indexOf(i) === keywords.lastIndexOf(i));

    return uniqueKeywords
      .filter((keyword, i) => i < 2)
      .join(", ") +
      (uniqueKeywords.length < 3 ? "" : `, and ${uniqueKeywords.length - 2} other`);
  }

	const currentUser = useContext(CurrentUserContext);
  const username = currentUser.name;
  const keywords = getKeywords(props.articles);

  return (
    <main className="saved">
      {
      props.isLoggedIn ? "" :
      <Navigate to="/"/>
      }
      <div className="saved__info">
        <h3 className="saved__subtitle">Saved articles</h3>
        <h2 className="saved__title">
          {username}, you have {props.articles.length} saved article
          {props.articles.length != 1 ? "s" : ""}
        </h2>
        <p className="saved__keywords">
          By keywords: 
          <span className="saved__keyword"> {keywords}</span>
        </p>
      </div>
      <News
        news={props.articles}
        isLoggedIn={props.isLoggedIn}
        handleDelete={props.handleDelete}
        handleArticleClick={props.handleArticleClick}
      />
    </main>
  );
}
  
export default Saved;
  