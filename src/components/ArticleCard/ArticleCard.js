import { useState } from "react";
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

  function showSuggestion() {
    if (!props.isLoggedIn || !props.isOnMain) {
      setSuggestionVisible(true);
    }
  }

  function hideSuggestion() {
    setSuggestionVisible(false);
  }


  const { data } = props;
  const publishedAt = formatDate(new Date(data.publishedAt));
  const author = formatAuthor(data.author);
  const [suggestionVisible, setSuggestionVisible] = useState(false);

  return (
    <div className="card"
      onClick={() => props.handleArticleClick(data.url)}
    >
      <button className={`card__button 
          ${props.isOnMain ? "card__button_type_save" : "card__button_type_delete"}`}
        type="button"
        onMouseEnter={showSuggestion}
        onMouseLeave={hideSuggestion}
        onClick={(e) => {
          props.isOnMain ?
            props.handleSave(e, data) :
            props.handleDelete(e, data)
        }}
      />
      <div className={suggestionVisible ? 
        "card__suggestion card__suggestion_visible" : "card__suggestion"}>
          {
          props.isOnMain ?
            "Sign in to save articles" :
            "Remove from saved"
          }
      </div>

      {
        // This is a placeholder for now, since I don't have a backend for saving articles
        // and keywords yet
        props.isOnMain ? "" :
        <div className="card__tag">
          Cats
        </div>
      }

      <img className="card__image"
        src={data.urlToImage}
        alt="article cover"
      />

      <div className="card__info">
        <p className="card__date">{publishedAt}</p>
        <h3 className="card__title">{data.title}</h3>
        <p className="card__description">{data.description}</p>
        <h3 className="card__author">{author}</h3>
      </div>
    </div>
  );
}

export default ArticleCard;
