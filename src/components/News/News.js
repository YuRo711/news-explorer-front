import "./News.css";
import loadingIcon from "../../images/loading.png";
import notFoundIcon from "../../images/not-found_v1.svg";

function News(props) {
  if (!props.isSearching && !props.news) {
    return;
  }
  
  if (!props.news) {
    return (
      <section className="news news_result_loading">
        <img className="news__loading-icon" src={loadingIcon}/>
        <p className="news__loading-text">Searching for news...</p>
      </section>
    );
  }

  if (props.news.length === 0) {
    return (
      <section className="news news_result_none">
        <img className="news__not-found-icon" src={notFoundIcon}/>
        <h2 className="news__not-found-title">Nothing found</h2>
        <p className="news__not-found-text">Sorry, but nothing matched your search terms.</p>
      </section>
    );
  }

  return (
    <section className="news">
    </section>
  );
}

export default News;