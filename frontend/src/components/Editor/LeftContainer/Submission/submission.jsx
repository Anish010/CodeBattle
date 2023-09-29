import React, { useState, useEffect, Fragment } from "react";
import List from "@mui/material/List";
import NoData from "../../../../animations/NoData.json";
import Divider from "@mui/material/Divider";
import SubmissionTabs from "./submissionTab";
import Lottie from "react-lottie";
import "./submission.css";
import Stack from "@mui/material/Stack";
import LoadingSkeleton from "../../../utils/LoadingSkeleton";
import axios from "axios";

const Submission = ({ requestData }) => {
  const NoDataLottie = {
    loop: true,
    autoplay: true,
    animationData: NoData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [submissionData, setSubmissionData] = useState([]);
  const [loading, setLoading] = useState(true);

  
useEffect(() => {
  axios
    .post(`http://localhost:4000/api/v1/submission`, requestData, {
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    })
    .then((response) => {
      setSubmissionData(response.data.data.reverse());
      setLoading(false);

      // dispatch(setSubmissions(submissionsData));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setLoading(false);
    });
}, [requestData]);
  
  const style = {
    width: "100%",
    bgcolor: "background.paper",
  };

  return (
    <Fragment>
      {loading ? ( // Conditional rendering for the loader
        <LoadingSkeleton />
      ) : submissionData.length === 0 ? ( // Check if submissionData is empty
        <Lottie
          style={{ display: "inline-block", verticalAlign: "middle" }}
          options={NoDataLottie}
          height={450}
          width={450}
        />
      ) : (
        <List sx={style} component="nav" aria-label="mailbox folders">
          {submissionData.map((tab) => (
            <Fragment key={tab._id}>
              <Stack spacing={1}>
                <SubmissionTabs tabData={tab} />
                <Divider />
              </Stack>
            </Fragment>
          ))}
              
        </List>
      )}
    </Fragment>
  );
};

export default Submission;
