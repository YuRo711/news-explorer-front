import "./Search.css";

function Search(props) {
    return (
      <section className="search">
        <div className="search__image"/>
        <h1 className="search__title">
          What's going on in the world?
        </h1>
        <h2 className="seatch__subtitle">
          Find the latest news on any topic and save them 
          in your personal account.
        </h2>
        <div className="search__bar">
          <input type="text"
            className="search__input"
            placeholder="Enter topic"
          />
          <button type="button" className="search__button">
            Search
          </button>
        </div>
      </section>
    );
  }
  
  export default Search;
  