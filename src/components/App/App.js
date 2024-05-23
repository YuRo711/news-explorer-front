import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Saved from "../Saved/Saved";
import { api } from "../../utils/newsApi.js";
import RegisterModal from "../Modals/RegisterModal/RegisterModal.js";
import SuccessModal from "../Modals/SuccessModal/SuccessModal.js";
import LoginModal from "../Modals/LoginModal/LoginModal.js";

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

  //#endregion

  
  //#region Variables setup

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [news, setNews] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [modalsActivity, setModalsActivity] = useState({
    "signup": false,
    "login": false,
    "success": false,
  });

  //#endregion


  //#region Rendering

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        openLoginModal={() => handleModalOpen("login")}
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
          />
        }/>
        <Route path="*" element={
          <Navigate to="/" replace/>
        }/>
      </Routes>
      <Footer/>
      <RegisterModal
        name="signup"
        onClose={handleModalClose}
        isOpen={modalsActivity["signup"]}
        openAnotherModal={() => openAnotherModal("signup", "login")}
      />
      <SuccessModal
        name="success"
        onClose={handleModalClose}
        isOpen={modalsActivity["success"]}
        openAnotherModal={() => openAnotherModal("success", "login")}
      />
      <LoginModal
        name="login"
        onClose={handleModalClose}
        isOpen={modalsActivity["login"]}
        openAnotherModal={() => openAnotherModal("login", "signup")}
      />
    </div>
  );

  //#endregion
}

export default App;