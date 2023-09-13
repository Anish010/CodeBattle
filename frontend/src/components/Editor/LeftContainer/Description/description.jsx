import React from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import "./description.css";

const Description = ({questionDetails}) => {

  return (
    <>
      {questionDetails && (
        <div className="editor-desc-container">
          <Typography
            variant="h5"
            className="program-title"
            sx={{
              fontWeight: "bold",
              marginLeft: "5px",
              color: "#8200cd",
              letterSpacing: 4,
            }}>
            {questionDetails.title}
          </Typography>
          <div className="tags-container">
            {questionDetails.tags.map((tag, tagIndex) => (
              <Chip label={tag} className="problem-tags-chip" key={tagIndex} />
            ))}
          </div>
          <div className="divider" />
          <div className="description-content" variant="body1">
            {questionDetails.description}
          </div>
          <div className="examples-container">
            {questionDetails.exampleTestCases.map((example, exampleIndex) => (
              <div key={exampleIndex}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Example {exampleIndex + 1}:
                </Typography>
                <div sx={{ marginLeft: "16px" }} variant="body1">
                  <span style={{ fontWeight: "bold", marginLeft: "16px" }}>
                    Input:
                  </span>{" "}
                  <span style={{ fontWeight: "bold", color: "gray" }}>
                    {example.input}
                  </span>
                </div>
                <div sx={{ marginLeft: "16px" }} variant="body1">
                  <span style={{ fontWeight: "bold", marginLeft: "16px" }}>
                    Output:
                  </span>{" "}
                  <span style={{ fontWeight: "bold", color: "gray" }}>
                    {example.output}
                  </span>
                </div>
                {example.explanation && (
                  <div variant="body1" sx={{ marginLeft: "16px" }}>
                    <span style={{ fontWeight: "bold", marginLeft: "16px" }}>
                      Explanation:
                    </span>
                    <span style={{ fontWeight: "bold", color: "gray" }}>
                      {" "}
                      {example.explanation}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {questionDetails.constraints &&
            questionDetails.constraints.length > 0 && (
              <div className="constraints-container">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Constraints :
                </Typography>
                <ul>
                  {questionDetails.constraints.map(
                    (constraint, constraintIndex) => (
                      <li style={{ fontWeight: "bold" }} key={constraintIndex}>
                        {constraint}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
        </div>
      )}
    </>
  );
};
export default Description;
