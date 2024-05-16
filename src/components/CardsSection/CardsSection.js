import ArticleCard from "../ArticleCard/ArticleCard";
import "./CardsSection.css";

function CardsSection(props) {
  return (
    <div className="cards">
      <h2 className="cards__title">Search results</h2>
      <div className="cards__grid">
        {
          props.news
            .filter((article) => article.title !== "[Removed]")
            .map((article, i) => (
              <ArticleCard
                key={i}
                data={article}
                isLoggedIn={props.isLoggedIn}
              />
            ))
        }
      </div>
    </div>
  );
}

export default CardsSection;