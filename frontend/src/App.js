import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/landingpage";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ProblemList from "./components/ProgramsList/programList";
import Editor from "./components/Editor/editor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          
         <Route path="/" element={ <LandingPage />} />
          <Route path="/list" element={ <ProblemList />} />
          <Route path="/editor/:id" element={ <Editor />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
