import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./App.css";

function App(props) {
  //#region Methods

  //#endregion


  //#region Rendering

  return (
    <div className="page">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );

  //#endregion
}

export default App;