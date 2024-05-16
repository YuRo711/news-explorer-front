import Author from "../Author/Author";
import News from "../News/News";
import Search from "../Search/Search";

function Main(props) {
  return (
    <main className="main">
      <Search 
        getNews={props.getNews}
      />
      <News
        news={props.news}
        isSearching={props.isSearching}
        isLoggedIn={props.isLoggedIn}
        handleSave={props.handleSave}
      />
      <Author />
    </main>
  );
}

export default Main;
