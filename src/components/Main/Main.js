import Author from "../Author/Author";
import News from "../News/News";
import Search from "../Search/Search";

function Main(props) {
  return (
    <main className="main">
      <Search 
        getNews={props.getNews}
        isOnMobile={props.isOnMobile}
      />
      <News
        news={props.news}
        isSearching={props.isSearching}
        isLoggedIn={props.isLoggedIn}
        handleSave={props.handleSave}
        handleDelete={props.handleDelete}
        handleArticleClick={props.handleArticleClick}
      />
      <Author />
    </main>
  );
}

export default Main;
