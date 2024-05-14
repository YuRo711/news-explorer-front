import "./News.css";
import loadingIcon from "../../images/loading.png";

function News(props) {
  if (!props.isSearching) {
    return;
  }
  
  if (props.news) {
    return (
      <section className="news news_loading">
        <img className="news__loading-icon" src={loadingIcon}/>
        <p className="news__loading-text">Searching for news...</p>
      </section>
    );
  }

  return (
    <section className="news">
    </section>
  );
}

export default News;