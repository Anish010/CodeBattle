import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import ProblemList from "./components/ProgramsList/ProgramList";
import Editor from "./components/Editor/Editor";
import ProfilePage from "./components/Profile/Profile";
import ShowCode from "./components/ShowCode/ShowCode";
import Discussion from "./components/Discussion/Discussion";
import PrivateRoutes from "./components/Routings/PrivateRoutes";
import { useEffect } from "react";
function App() {

  useEffect(() => {
    document.title = 'CodeBattle'; // Change 'Your Website Name' to the desired name
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          
          <Route path="/" element={<LandingPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/list" element={ <ProblemList />} />
          </Route>
          
          <Route path="/editor/:id" element={ <Editor />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/submittedCode/:id" element={<ShowCode />} />
          <Route path="/discussion" element={<Discussion />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
