import { useState } from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import "./CardsSection.css";

function CardsSection(props) {
  function expand() {
    setIsExpanded(true);
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const isOnMain = props.isOnMain;

  return (
    <div className={`cards ${isOnMain ? "" : "cards_saved"}`}>
      {
        isOnMain ? 
        <h2 className="cards__title">Search results</h2>
        : ""
      }
      <div className={`cards__grid ${isOnMain ? "" : "cards__grid_saved"}`}>
        {
          props.news
            .filter((article) => article.title !== "[Removed]")
            .filter((article, i) => isExpanded || i < 3 || !isOnMain)
            .map((article, i) => (
              <ArticleCard
                key={article._id || `card${i}`}
                data={article}
                isLoggedIn={props.isLoggedIn}
                handleSave={props.handleSave}
                handleDelete={props.handleDelete}
                handleArticleClick={props.handleArticleClick}
                isOnMain={isOnMain}
                savedArticles={props.savedArticles}
              />
            ))
        }
      </div>
      {
        props.news.length > 3 && isOnMain ?
        <button type="button"
          className="cards__expand-button"
          onClick={expand}
        >
          Show more
        </button>
        : ""
      }
    </div>
  );
}

export default CardsSection;