import "./Author.css";

function Author(props) {
  return (
    <section className="author">
      <div className="author__image" />
      <div className="author__info">
        <h2 className="author__title">About the author</h2>
        <p className="author__text">
            This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.
          </p>
          <p className="author__text">
            You can also talk about your experience with TripleTen, what you learned there, and how you can help potential customers.
          </p>
      </div>
    </section>
  );
}

export default Author;