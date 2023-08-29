import React, { useState } from "react";
import Description from "./description";
import Submission from "./submission";
import RighContainer from "./rightContainer";
// import CodeEditor from "./codeEditor";

const Editor = () => {
const [activeButton, setActiveButton] = useState("description");

  const handleToggle = (button) => {
    console.log(button)
    setActiveButton(button);
  };

  const renderLeftContainer = () => {
    if (activeButton === "description") {
      return <Description/>
    } else if (activeButton === "subscription") {
      return <Submission/>
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
        <h1 ><RighContainer /></h1>
      </div>
    </div>
  );
};

export default Editor;
