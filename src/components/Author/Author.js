import "./Author.css";

function Author(props) {
  return (
    <section className="author">
      <div className="author__image" />
      <div className="author__info">
        <h2 className="author__title">About the author</h2>
        <p className="author__text">
          The creator of this page is totally human and enjoys doing normal
          human things, such as breathing oxygen and consuming carbohydrates!
        </p>
      </div>
    </section>
  );
}

export default Author;
