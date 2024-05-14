import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Saved from "../Saved/Saved";

function App(props) {
  //#region Methods

  //#endregion

  //#region Variables setup

  const [isLoggedIn, setIdLoggedIn] = useState(true);

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
          <Main/>
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