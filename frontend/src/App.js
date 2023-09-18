import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/landingPage";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import ProblemList from "./components/ProgramsList/programList";
import Editor from "./components/Editor/editor";
import ProfilePage from "./components/Profile/profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          
         <Route path="/" element={ <LandingPage />} />
          <Route path="/list" element={ <ProblemList />} />
          <Route path="/editor/:id" element={ <Editor />} />
          <Route path="/profile" element={ <ProfilePage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
