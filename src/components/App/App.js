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
      api.getNews(query)
        .then((json) => {
          setIsSearching(true);
          setNews(json["articles"]);
          console.log(json["articles"]);
        });
    }
  }

  //#endregion

  
  //#region Variables setup

  const [isLoggedIn, setIsLoggedIn] = useState(true);
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