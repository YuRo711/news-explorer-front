import "./ArticleCard.css";

function ArticleCard(props) {
  function formatDate(date) {
    var splitDate = date.toDateString().split(" ");
    var day = splitDate[2].startsWith("0") ?
      splitDate[2].substring(1) : splitDate[2];
      
    return `${splitDate[1]} ${day}, ${splitDate[3]}`;
  }

  function formatAuthor(author) {
    if (!author)
      return "";
    var splitAuthor = author.split(", ");
    if (splitAuthor.length === 1)
      return author;
    return splitAuthor[0] === splitAuthor[1] ?
      splitAuthor[0] : author;
  }


  const { data } = props;
  const publishedAt = formatDate(new Date(data.publishedAt));
  const author = formatAuthor(data.author);

  return (
    <a className="card" href={data.url}>
      <img className="card__image" src={data.urlToImage}/>
      <div className="card__info">
        <p className="card__date">{publishedAt}</p>
        <h3 className="card__title">{data.title}</h3>
        <p className="card__description">{data.description}</p>
        <h3 className="card__author">{author}</h3>
      </div>
    </a>
  );
}

export default ArticleCard;
