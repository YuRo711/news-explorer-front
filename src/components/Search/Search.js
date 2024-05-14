import { useState } from "react";
import "./Search.css";

function Search(props) {
  const [query, setQuery] = useState("");

  return (
    <section className="search">
      <div className="search__image"/>
      <h2 className="search__title">
        What's going on in the world?
      </h2>
      <h3 className="seatch__subtitle">
        Find the latest news on any topic and save them 
        in your personal account.
      </h3>
      <div className="search__bar">
        <input type="text"
          className="search__input"
          placeholder="Enter topic"
          onChange={(e) => {setQuery(e.target.value)}}
        />
        <button type="button" className="search__button"
          onClick={() => props.getNews(query)}
        >
          Search
        </button>
      </div>
    </section>
  );
}
  
  export default Search;
  