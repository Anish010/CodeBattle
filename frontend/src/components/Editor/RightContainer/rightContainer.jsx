import React, { useEffect, useState, Fragment } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { darcula } from "@uiw/codemirror-theme-darcula";
import ButtonComp from "../../utils/ButtonComp";
import { BASE_URL } from "../../../services/rootServices";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { resetUser } from "../../../reducers/userReducer"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./rightContainer.css";

const RightContainer = ({
  questionDetails,
  setActiveButton,
  requestData,
  onSubmissionComplete,
}) => {
  const [userCode, setUserCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flag, setFlag] = useState(null); // New state to store the 'flag'
  const [submitData, setSubmitData] = useState({
    questionId: "",
    userId: "",
    userCode: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setSubmitData({
      questionId: requestData.questionId,
      userId: requestData.userId,
      userCode: userCode,
    });
  }, [userCode, requestData.questionId, requestData.userId]);

  
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
  
  const handleSubmit = async () => {
  
    setError(null); // Clear any previous errors
    setLoading(true);
    axios
      .post(`${BASE_URL}/submitQuestion`, submitData,
        config)
      .then((response) => {
        setLoading(false);
        setActiveButton("submission");
        // Update the 'flag' state based on the response
        setFlag(response.data.flag);

        // Handle other cases based on response
        if (response.data.message === "Wrong Answer") {
          setError(response.data.message);
        }
        onSubmissionComplete();
      })
      .catch((error) => {
        // Handle errors

        console.error("Error submitting data:", error);
        setLoading(false);
        setActiveButton("submission");

        if (error.response) {
          if (error.response.status === 400) {
            // User code error
            console.error("Server error: " + error.response.data.message);
            setError(error.response.data.message);
          } else if (error.response && error.response.status === 401) {
            // Unauthorized, clear authToken and redirect to login
            localStorage.clear();
            Cookies.remove("authToken");
            dispatch(resetUser());
            navigate("/");
          } else {
            // Other server error
            console.error("Server error: " + error.response.data.message);
            setError("Server error: " + error.response.data.message);
          }
        } else {
          // Network error or other client-side error
          console.error("Server error: " + error.response.data.message);
          setError("An error occurred: " + error.message);
        }
        onSubmissionComplete();
      });
  };

  const onChange = React.useCallback((value) => {
    setUserCode(value);
  }, []);

  const style = {
    borderRadius: "4px",
  };

  return (
    <Fragment>
      <div>
        <CodeMirror
          height="500px"
          theme={darcula}
          value={questionDetails.functionPrototype}
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
        />
      </div>
      <div className="bottom-div">
        <ButtonComp
          text="Submit"
          variant="contained"
          color="success"
          style={style}
          onClick={handleSubmit}
        />
        {loading ? (
          <CircularProgress
            className="loading-icon"
            size={35}
            thickness={6}
            value={100}
          />
        ) : (
          <></>
        )}
        {error && (
          <Alert severity="error" className="error-alert">
            {error}
          </Alert>
        )}
        {flag === -1 && (
          <Alert severity="error" className="error-alert">
            All test cases not passing
          </Alert>
        )}
      </div>
    </Fragment>
  );
};

export default RightContainer;
