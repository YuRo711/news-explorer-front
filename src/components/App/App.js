import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Saved from "../Saved/Saved";
import { api } from "../../utils/newsApi.js";
import RegisterModal from "../Modals/RegisterModal/RegisterModal.js";
import SuccessModal from "../Modals/SuccessModal/SuccessModal.js";
import LoginModal from "../Modals/LoginModal/LoginModal.js";
import { userApi } from "../../utils/mainApi.js";
import { getToken, removeToken, setToken } from "../../utils/token.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

function App(props) {
  //#region Methods

  function getNews(query) {
    if (query) {
      setKeyword(query);
      setIsSearching(true);
      api.getNews(query).then((newJson) => {
          setNews(newJson["articles"]);
          setIsSearching(false);
        });
    }
  }

  function getSavedArticles() {
    if (!isLoggedIn) {
      setArticles(null);
      return;
    }
    
    userApi.getArticles()
      .then((res) => {
        const json = res.data.map((data) => {
          const newData = 
            {
              _id: data._id,
              keyword: data.keyword.charAt(0).toUpperCase() + data.keyword.slice(1),
              title: data.title,
              description: data.text,
              publishedAt: data.date,
              author: data.source,
              url: data.link,
              urlToImage: data.image,
          };
          return newData;
        });
        return json;
      })
      .then((json) => {
        setArticles(json);
      });
  }

  function handleSave(event, cardData) {
    event.stopPropagation();
    userApi.saveArticle(
      { 
        keyword,
        title: cardData.title,
        text: cardData.description || "[Empty]",
        date: cardData.publishedAt,
        source: cardData.author || "Unknown",
        link: cardData.url,
        image: cardData.urlToImage,
    });
  }

  function handleDelete(event, cardData) {
    event.stopPropagation();
    userApi.deleteArticle(cardData._id)
      .then(() => {
        setArticles(articles.filter((data) => data._id !== cardData._id));
      });
  }

  function handleArticleClick(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleModalClose(modalId) {
    setModalsActivity({...modalsActivity, [modalId]: false});
  }

  function handleModalOpen(modalId) {
    setModalsActivity({...modalsActivity, [modalId]: true});
  }

  function openAnotherModal(modalId, newModalId) {
    setModalsActivity({...modalsActivity, 
      [modalId]: false, [newModalId]: true});
  }

  async function registerUser(name, email, password) {
    return userApi.addUser({ name, email, password })
      .then((res) => {
        setToken(res.token);
        auth(res.token);
        handleModalClose("signup");
      });
  }

  async function signIn(email, password) {
    return userApi.signIn({ email, password })
      .then((res) => {
        setToken(res.token);
        auth(res.token);
        handleModalClose("login");
      })
      .then(() => {
        if (keyword) {
          getNews(keyword);
          getSavedArticles();
        }
      });
  }

  function logOut() {
    removeToken();
    setIsLoggedIn(false);
    setArticles(null);
  }

  function auth(token) {
    userApi.auth(token)
      .then((res) => {
        userApi.setTokenHeader(token);
        setCurrentUser(res.data);
        setIsLoggedIn(true);
        getSavedArticles();
      })
      .catch((err) => { console.log(err) });
  }

  //#endregion

  
  //#region Variables setup

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [news, setNews] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [modalsActivity, setModalsActivity] = useState({
    "signup": false,
    "login": false,
    "success": false,

  });
  const [currentUser, setCurrentUser] = useState({});
  const [articles, setArticles] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [isOnMobile, setIsOnMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const token = getToken();
    if (token) {
      auth(token);
    }
    
    window.addEventListener("resize", () => {
      setIsOnMobile(window.innerWidth < 600);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setIsOnMobile(window.innerWidth < 600);
      })
      }
  }, []);

  useEffect(() => {
    getSavedArticles();
  }, [currentUser])

  //#endregion


  //#region Rendering

  return (
    <div className="page">
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        isLoggedIn={isLoggedIn}
        openLoginModal={() => handleModalOpen("login")}
        isOnMobile={isOnMobile}
        logOut={logOut}
      />
      <Routes>
        <Route path="/saved" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Saved
              isLoggedIn={isLoggedIn}
              handleArticleClick={handleArticleClick}
              handleDelete={handleDelete}
              articles={articles}
            />
          </ProtectedRoute>
        }/>
        <Route path="/" element={
          <Main
            getNews={getNews}
            news={news}
            isSearching={isSearching}
            isLoggedIn={isLoggedIn}
            handleSave={handleSave}
            handleDelete={handleDelete}
            handleArticleClick={handleArticleClick}
            isOnMobile={isOnMobile}
            savedArticles={articles}
          />
        }/>
        <Route path="*" element={
          <Navigate to="/" replace/>
        }/>
      </Routes>
      <Footer/>
      <SuccessModal
        name="success"
        onClose={handleModalClose}
        isOpen={modalsActivity["success"]}
        openAnotherModal={() => openAnotherModal("success", "login")}
      />
      <RegisterModal
        name="signup"
        onClose={handleModalClose}
        isOpen={modalsActivity["signup"]}
        openAnotherModal={() => openAnotherModal("signup", "login")}
        registerUser={registerUser}
      />
      <LoginModal
        name="login"
        onClose={handleModalClose}
        isOpen={modalsActivity["login"]}
        openAnotherModal={() => openAnotherModal("login", "signup")}
        signIn={signIn}
      />
    </CurrentUserContext.Provider>
    </div>
  );

  //#endregion
}

export default App;