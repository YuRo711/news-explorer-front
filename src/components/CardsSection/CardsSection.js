import { useState } from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import "./CardsSection.css";

function CardsSection(props) {
  function expand() {
    setIsExpanded(true);
  }


  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="cards">
      <h2 className="cards__title">Search results</h2>
      <div className="cards__grid">
        {
          props.news
            .filter((article) => article.title !== "[Removed]")
            .filter((article, i) => isExpanded || i < 3)
            .map((article, i) => (
              <ArticleCard
                key={i}
                data={article}
                isLoggedIn={props.isLoggedIn}
                handleSave={props.handleSave}
                handleArticleClick={props.handleArticleClick}
              />
            ))
        }
      </div>
      <button type="button"
        className="cards__expand-button"
        onClick={expand}
      >
        Show more
      </button>
    </div>
  );
}

export default CardsSection;