import { Navigate } from "react-router-dom";
import "./Saved.css";
import CardsSection from "../CardsSection/CardsSection";
import { placeholderSaved } from "../../utils/constants";
import News from "../News/News";

function Saved(props) {
  // Everything here is a placeholder for now, since I don't have a backend for 
  // saving articles and keywords yet
    return (
      <main className="saved">
        {
          // if we're not logged in, we can't access the saved page
        props.isLoggedIn ? "" :
        <Navigate to="/"/>
        }
        <div className="saved__info">
          <h3 className="saved__subtitle">Saved articles</h3>
          <h2 className="saved__title">User, you have 1 saved article</h2>
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
  