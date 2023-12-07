import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BASE_URL } from "../../services/rootServices";
import "./ShowCode.css";

const ShowCode = () => {
  const params = useParams();
  const [submissionDetails, setSubmissionDetails] = useState({
    status: "",
    userCode: "",
    questionId: "",
    userId: "",
  });
  const navigate = useNavigate();

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
    
    // Fetch question details using Axios
    axios
      .get(`${BASE_URL}/submittedCode/${params.id}`, config)
      .then((response) => {
        // Set the question details received from the API in the state
        setSubmissionDetails(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [params.id,  navigate]);

  return (
    <div className="submission-container">
      <div className="submission-detail">
        <div className="mb-3">
          <strong>Question ID:</strong> {submissionDetails.questionId}
        </div>
        <div className="mb-3">
          <strong>User ID:</strong> {submissionDetails.userId}
        </div>
        <div className="mb-3">
          <strong>Status: </strong>
          <span
            style={{
              padding: "0.3em 0.6em",
              borderRadius: "0.25rem",
              color: "#fff",
              backgroundColor:
                submissionDetails.status === "Accepted" ? "#28a745" : "#dc3545",
            }}>
            {submissionDetails.status}
          </span>
        </div>
        <div>
          <strong>Your Code:</strong>
          <pre className="code-block">{submissionDetails.userCode}</pre>
        </div>
      </div>
    </div>
  );
};

export default ShowCode;
