import React, { useEffect, useState } from "react";
import Description from "./LeftContainer/Description/Description";
import Submission from "./LeftContainer/Submission/Submission";
import RightContainer from "./RightContainer/RightContainer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/rootServices";
import Lottie from "react-lottie";
import Cookies from "js-cookie";
import logoIcon from "../../animations/logo_icon.json";
import axios from "axios";
import "./editor.css";

const Editor = () => {
  const [activeButton, setActiveButton] = useState("description");
  const params = useParams();
  const userId = useSelector((state) => state.user.id);
  const [data, setData] = useState({});
  const [submissionKey, setSubmissionKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleSubmissionComplete = () => {
    // Increment the key to trigger a re-render of Submission component
    setSubmissionKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      navigate("/");
    }

    const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

    axios
      .get(`${BASE_URL}/question/${params.id}`, config)
      .then((response) => {
        // Set the question details received from the API in the state
        setQuestionDetails(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [params.id,  navigate]);

  const handleToggle = (button) => {
    // console.log(button)
    setActiveButton(button);
  };

  const renderLeftContainer = () => {
    if (activeButton === "description") {
      return <Description questionDetails={questionDetails} />;
    } else if (activeButton === "submission") {
      return <Submission requestData={data} submissionKey={submissionKey} />;
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: logoIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {loading ? (
        <Lottie options={defaultOptions} height={400} width={400} />
      ) : (
        <div className="parent-container">
          <div className="left-container">
            <div className="editor-navbar">
              <ul className="navbar-list">
                <li
                  className={`description-button ${
                    activeButton === "description" ? "active" : ""
                  }`}
                  onClick={() => handleToggle("description")}>
                  Description
                </li>
                <li
                  className={`subscription-button ${
                    activeButton === "submission" ? "active" : ""
                  }`}
                  onClick={() => {
                    handleToggle("submission");
                  }}>
                  Submission
                </li>
              </ul>
            </div>
            <div className="content-container"> {renderLeftContainer()}</div>
          </div>
          <div className="right-container">
            <h1>
              <RightContainer
                setActiveButton={setActiveButton}
                questionDetails={questionDetails}
                requestData={data}
                onSubmissionComplete={handleSubmissionComplete}
              />
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;
