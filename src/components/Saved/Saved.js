import { Navigate } from "react-router-dom";
import "./Saved.css";
import { placeholderSaved } from "../../utils/constants";
import News from "../News/News";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Saved(props) {
	const currentUser = useContext(CurrentUserContext);
  const username = currentUser.name;

  return (
    <main className="saved">
      {
      props.isLoggedIn ? "" :
      <Navigate to="/"/>
      }
      <div className="saved__info">
        <h3 className="saved__subtitle">Saved articles</h3>
        <h2 className="saved__title">{username}, you have 1 saved article</h2>
        <p className="saved__keywords">By keywords: 
          <span className="saved__keyword"> Cats</span>
        </p>
      </div>
      <News
        news={placeholderSaved}
        isLoggedIn={props.isLoggedIn}
        handleDelete={props.handleDelete}
        handleArticleClick={props.handleArticleClick}
      />
    </main>
  );
}
  
export default Saved;
  