import "./News.css";
import loadingIcon from "../../images/loading.svg";
import notFoundIcon from "../../images/not-found_v1.svg";
import CardsSection from "../CardsSection/CardsSection";
import { useLocation } from "react-router-dom";

function News(props) {
  const path = useLocation().pathname;
  if (!props.isSearching && !props.news) {
    return;
  }
  const isOnMain = path === "/";

  
  if (!props.news) {
    return (
      <section className="news news_result_loading">
        <img className="news__loading-icon" src={loadingIcon} alt="loading icon"/>
        <p className="news__loading-text">Searching for news...</p>
      </section>
    );
  }

  if (props.news.length === 0) {
    return (
      <section className="news news_result_none">
        <img className="news__not-found-icon" src={notFoundIcon} alt="not found icon"/>
        <h2 className="news__not-found-title">Nothing found</h2>
        <p className="news__not-found-text">
          {isOnMain ? 
            "Sorry, but nothing matched your search terms." : 
            "No saved articles yet."}
        </p>
      </section>
    );
  }

  return (
    <section className={`news ${isOnMain ? "" : "news_saved"}`}>
      <CardsSection
        news={props.news}
        handleSave={props.handleSave}
        handleDelete={props.handleDelete}
        handleArticleClick={props.handleArticleClick}
        isOnMain={isOnMain}
        isLoggedIn={props.isLoggedIn}
        savedArticles={props.savedArticles}
      />
    </section>
  );
}

export default News;