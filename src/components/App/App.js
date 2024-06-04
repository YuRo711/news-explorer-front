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

function App(props) {
  //#region Methods

  function getNews(query) {
    if (query) {
      setIsSearching(true);
      api.getNews(query)
        .then((json) => {
          setNews(json["articles"]);
          setIsSearching(false);
        });
    }
  }

  function handleSave(event, cardData) {
    event.stopPropagation();
    // no saving is implemented yet, as there is no database to store the saved articles in
  }

  function handleDelete(event, cardData) {
    event.stopPropagation();
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
        setIsLoggedIn(true);
      });
  }

  async function signIn(email, password) {
    return userApi.signIn({ email, password })
      .then((res) => {
        setToken(res.token);
        setIsLoggedIn(true);
      });
  }

  function logOut() {
    removeToken();
    setIsLoggedIn(false);
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
  const [isOnMobile, setIsOnMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const token = getToken();
    if (token) {
      userApi.auth(token)
        .then((res) => {
          userApi.setTokenHeader(token);
          setCurrentUser(res.data);
          setIsLoggedIn(true);
        })
        .catch((err) => { console.log(err) });
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
          <Saved
            isLoggedIn={isLoggedIn}
            handleArticleClick={handleArticleClick}
            handleDelete={handleDelete}
          />
        }/>
        <Route path="/" element={
          <Main
            getNews={getNews}
            news={news}
            isSearching={isSearching}
            isLoggedIn={isLoggedIn}
            handleSave={handleSave}
            handleArticleClick={handleArticleClick}
            isOnMobile={isOnMobile}
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