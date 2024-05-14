import Author from "../Author/Author";
import Search from "../Search/Search";


function Main(props) {
  return (
    <main className="main">
      <Search 
        getNews={props.getNews}
      />
      <Author />
    </main>
  );
}

export default Main;
