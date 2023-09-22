import React, { Fragment } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { Checkmark } from 'react-checkmark'
import { useNavigate } from "react-router-dom";
const SubmissionTabs = ({ tabData }) => {

  const navigate = useNavigate();
  const formatTimestamp = (timestamp) => {
  const currentTime = new Date();
  const timestampDate = new Date(timestamp);
  const timeDifference = currentTime - timestampDate;

  if (timeDifference < 1000) {
    return 'Just now';
  }

  const seconds = Math.floor(timeDifference / 1000);

  if (seconds < 60) {
    return `${seconds} secs ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} mins ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours <= 9) {
    return `${hours} hours ago`;
  }

  return new Date(timestamp).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  };
  
  const handleSubmissionTab = () => {
    navigate(`/submittedCode/${tabData._id}`)
  } 

  return (
    <Fragment>
      <div className="tab-container">
        <div className="tab" onClick={handleSubmissionTab}>
          <div
            className={
              tabData.submission === "Accepted" ? "accepted-tab" : "wrong-tab"
            }>
            {tabData.submission === "Accepted" ? (
              <Checkmark size='medium' />
            ) : (
                <ImCross sx={{fontSize : "24px"}} />
            )}
            <span className="tab-text">
              {tabData.submission === "Accepted" ? "Accepted" : "Wrong Answer"}
            </span>
          </div>
          <span className="date-section" style={{ marginLeft: "auto" }}>
            {formatTimestamp(tabData.timestamp)}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default SubmissionTabs;
