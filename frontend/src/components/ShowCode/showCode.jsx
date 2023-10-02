import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from '../../services/rootServices';
const ShowCode = () => {
    const params = useParams();
    const [submissionDetails, setSubmissionDetails] = useState({
        status: "",
        userCode: "",
        questionId: "",
        userId: "",
    })
    useEffect(() => {
    // Fetch question details using Axios
    axios
      .get(`${BASE_URL}/submittedCode/${params.id}`)
      .then((response) => {
        // Set the question details received from the API in the state
          setSubmissionDetails(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [params.id]);
  return (
    <div>
      <h1>Submission Details</h1>
      <div>
        <h2>Status: {submissionDetails.status}</h2>
        <h2>User Code:</h2>
        <pre>{submissionDetails.userCode}</pre>
        <h2>Question ID: {submissionDetails.questionId}</h2>
        <h2>User ID: {submissionDetails.userId}</h2>
      </div>
    </div>
  )
}

export default ShowCode