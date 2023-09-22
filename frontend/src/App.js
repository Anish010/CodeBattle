import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/landingPage";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import ProblemList from "./components/ProgramsList/programList";
import Editor from "./components/Editor/editor";
import ProfilePage from "./components/Profile/profile";
import ShowCode from "./components/ShowCode/showCode";
import Discussion from "./components/Discussion/discussion";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          
         <Route path="/" element={ <LandingPage />} />
          <Route path="/list" element={ <ProblemList />} />
          <Route path="/editor/:id" element={ <Editor />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/submittedCode/:id" element={<ShowCode />} />
          <Route path="/discussion" element={<Discussion />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
