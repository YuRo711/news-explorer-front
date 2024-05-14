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
    api.getNews(query)
      .then((json) => {
        setNews(json["articles"]);
        console.log(json["articles"]);
      })
  }

  //#endregion

  
  //#region Variables setup

  const [isLoggedIn, setIdLoggedIn] = useState(true);
  const [news, setNews] = useState(null);

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