import React, { useState, useEffect, Fragment } from "react";
import List from "@mui/material/List";
import NoData from "../../../../animations/NoData.json";
import Divider from "@mui/material/Divider";
import SubmissionTabs from "./submissionTab";
import Lottie from 'react-lottie';
import "./submission.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import LoadingSkeleton from "../../../utils/LoadingSkeleton";
import axios from "axios";

const Submission = () => {
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
  const params = useParams();
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    const requestData = {
      questionId: params.id,
      userId: userId,
    };
    console.log(requestData);
    axios
      .get(`http://localhost:4000/api/v1/submission/`, {
        params: requestData,
      })
      .then((response) => {
        console.log(response.data);
        setSubmissionData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

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
          {submissionData.map((tab, index) => (
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
