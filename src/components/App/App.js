import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Saved from "../Saved/Saved";
import { api } from "../../utils/newsApi.js";

function App(props) {
  //#region Methods

  function getNews(query) {
    if (query) {
      setIsSearching(true);
      api.getNews(query)
        .then((json) => {
          setNews(json["articles"]);
          setIsSearching(false);
          console.log(json["articles"]);
        });
    }
  }

  function handleSave(event, cardData) {
    event.stopPropagation();
  }

  //#endregion

  
  //#region Variables setup

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [news, setNews] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  //#endregion


  //#region Rendering

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
      />
      <Routes>
        <Route path="/saved" element={
          <Saved/>
        }/>
        <Route path="/" element={
          <Main
            getNews={getNews}
            news={news}
            isSearching={isSearching}
            isLoggedIn={isLoggedIn}
            handleSave={handleSave}
          />
        }/>
        <Route path="*" element={
          <Navigate to="/" replace/>
        }/>
      </Routes>
      <Footer/>
    </div>
  );

  //#endregion
}

export default App;