import React, { useEffect, useState } from "react";
import Description from "./description";
import Submission from "./submission";
import RighContainer from "./rightContainer";
import { useParams } from "react-router-dom";
import axios from "axios";

const Editor = () => {
const [activeButton, setActiveButton] = useState("description");
  const params = useParams();

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
    console.log(button)
    setActiveButton(button);
  };

  const renderLeftContainer = () => {
    if (activeButton === "description") {
      return <Description questionDetails={questionDetails} />
    } else if (activeButton === "subscription") {
      return <Submission />
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
                activeButton === "subscription" ? "active" : ""
              }`}
              onClick={() => handleToggle("subscription")}
            >
              Subscription
            </li>
          </ul>
        </div>
        <div className="content-container"> {renderLeftContainer()}</div>
      </div>
      <div className="right-container">
        <h1 ><RighContainer questionDetails={questionDetails}/></h1>
      </div>
    </div>
  );
};

export default Editor;
