import React, { useEffect, useState } from "react";
import Description from "./LeftContainer/Description/description";
import Submission from "./LeftContainer/Submission/submission";
import RightContainer from "./RightContainer/rightContainer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./editor.css";

const Editor = () => {
const [activeButton, setActiveButton] = useState("description");
  const params = useParams();
  const userId = useSelector((state) => state.user.id);
  const [data, setData] = useState({});

useEffect(() => {
  const questionId = params.id;

  setData({
    userId: userId,
    questionId: questionId,
  });
}, [params.id, userId]); 

  const [questionDetails, setQuestionDetails] = useState({
    title: "",
    tags: [],
    description: "",
    exampleTestCases: [],
    constraints: [],
  });

  useEffect(() => {
    // Fetch question details using Axios
    axios
      .get(`http://localhost:4000/api/v1/question/${params.id}`)
      .then((response) => {
        // Set the question details received from the API in the state
        setQuestionDetails(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [params.id]);

  
  const handleToggle = (button) => {
    // console.log(button)
    setActiveButton(button);
  };

  const renderLeftContainer = () => {
    if (activeButton === "description") {
      return <Description questionDetails={questionDetails} />
    } else if (activeButton === "submission") {
      return <Submission requestData={data} />
    }
  }

  

  return (
    <div className="parent-container">
      <div className="left-container">
        <div className="editor-navbar">
          <ul className="navbar-list">
            <li
              className={`description-button ${
                activeButton === "description" ? "active" : ""
              }`}
              onClick={() => handleToggle("description")}
            >
              Description
            </li>
            <li
              className={`subscription-button ${
                activeButton === "submission" ? "active" : ""
              }`}
              onClick={() => handleToggle("submission")}
            >
              Submission
            </li>
          </ul>
        </div>
        <div className="content-container"> {renderLeftContainer()}</div>
      </div>
      <div className="right-container">
        <h1 ><RightContainer setActiveButton={setActiveButton} questionDetails={questionDetails} requestData={data} /></h1>
      </div>
    </div>
  );
};

export default Editor;
