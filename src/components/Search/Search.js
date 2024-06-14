import { useState } from "react";
import "./Search.css";

function Search(props) {
  const [query, setQuery] = useState("");
  const { isOnMobile } = props;

  return (
    <section className="search">
      <div className="search__image" />
      <h2 className="search__title">What's going on in the world?</h2>
      <h3 className="search__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </h3>
      <form className="search__form" onSubmit={(e) => props.getNews(e, query)}>
        <div className="search__bar">
          <input
            type="text"
            className="search__input"
            placeholder="Enter topic"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          {isOnMobile ? (
            ""
          ) : (
            <button
              type="submit"
              className="search__button"
              onClick={(e) => props.getNews(e, query)}
            >
              Search
            </button>
          )}
        </div>
        {isOnMobile ? (
          <button
            type="submit"
            className="search__button"
            onClick={(e) => props.getNews(e, query)}
          >
            Search
          </button>
        ) : (
          ""
        )}
      </form>
    </section>
  );
}

export default Search;
