import { useEffect, useState, useSyncExternalStore } from "react";
import "./ArticleCard.css";

/*
  Since this seems to be the only way to contact the reviewer, I'll write it here.
  I couldn't reproduce the non-unique ids warning and the saved articles delete error.
  I am genuinely confused as to what to do. Could you please provide screenshots
  if those repeat this time?
*/

function ArticleCard(props) {
  function formatDate(date) {
    var splitDate = date.toDateString().split(" ");
    var day = splitDate[2].startsWith("0")
      ? splitDate[2].substring(1)
      : splitDate[2];

    return `${splitDate[1]} ${day}, ${splitDate[3]}`;
  }

  function formatAuthor(author) {
    if (!author) return "";
    var splitAuthor = author.split(", ");
    if (splitAuthor.length === 1) return author;
    return splitAuthor[0] === splitAuthor[1] ? splitAuthor[0] : author;
  }

  function showSuggestion() {
    if (!props.isLoggedIn || !props.isOnMain) {
      setSuggestionVisible(true);
    }
  }

  function hideSuggestion() {
    setSuggestionVisible(false);
  }

  function handleSave(e, data) {
    e.stopPropagation();
    if (!isLoggedIn) {
      props.openLoginModal();
      return;
    }

    if (!isSaved) {
      props.handleSave(data)
        .then((saved) => {
          setSaved(true);
          setSavedData(saved.find((article) => article.url === data.url));
        })
        .catch((err) => console.log(err));
    } else {
      props.handleDelete(e, savedData)
        .then(() => {
          setSaved(false);
        })
        .catch((err) => console.log(err));
    }
  }

  const { data, savedArticles, isOnMain, isLoggedIn } = props;
  const publishedAt = formatDate(new Date(data.publishedAt));
  const author = formatAuthor(data.author);
  const [suggestionVisible, setSuggestionVisible] = useState(false);
  const [savedData, setSavedData] = useState(undefined);
  const [isSaved, setSaved] = useState(false);

  useEffect(() => {
    const cardData = savedArticles
      ? savedArticles.find((article) => article.url === data.url)
      : undefined;
    setSavedData(cardData);
    setSaved(cardData !== undefined);
  }, [isLoggedIn]);

  return (
    <div className="card" onClick={() => props.handleArticleClick(data.url)}>
      <button
        className={`card__button 
          ${
            isOnMain
              ? `card__button_type_save 
              ${isSaved ? "card__button_type_save_saved" : ""}`
              : "card__button_type_delete"
          }
        `}
        type="button"
        onMouseEnter={showSuggestion}
        onMouseLeave={hideSuggestion}
        onClick={(e) => {
          isOnMain ? handleSave(e, data) : props.handleDelete(e, data);
        }}
      />
      <div
        className={
          suggestionVisible
            ? "card__suggestion card__suggestion_visible"
            : "card__suggestion"
        }
      >
        {isOnMain ? "Sign in to save articles" : "Remove from saved"}
      </div>

      {isOnMain ? "" : <div className="card__tag">{data.keyword}</div>}

      <img className="card__image" src={data.urlToImage} alt="article cover" />

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
