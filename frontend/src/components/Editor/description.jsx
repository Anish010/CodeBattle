import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
const createData = (title, tags, description, examples, constraints) => {
  return { title, tags, description, examples, constraints };
};

const descData = [
  createData(
    "Two Sum",
    ["Easy", "Array"],
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "",
      },
    ],
    [
      "2 <= nums.length <= 104",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ]
  ),
];
const Description = () => {
  return (
    <>
      {descData.map((data, index) => (
        <div className="editor-desc-container" key={index}>
          <Typography
            variant="h5"
            className="program-title"
            sx={{
              fontWeight: "bold",
              marginLeft: "5px",
              color: "#8200cd",
              letterSpacing: 4,
            }}>
            {data.title}
          </Typography>
          <div className="tags-container">
            {data.tags.map((tags, tagsIndex) => (
              <Chip label={tags} className="problem-tags-chip" />
            ))}
          </div>
          <div className="divider" />
          <div class="description-content" variant="body1">
            {data.description}
          </div>
          <div className="examples-container">
            {data.examples.map((example, exampleIndex) => (
              <div key={exampleIndex}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Example {exampleIndex + 1}:
                </Typography>
                <div sx={{ marginLeft: "16px" }} variant="body1">
                  <span style={{ fontWeight: "bold", marginLeft: "16px" }}>
                    Input:
                  </span>{" "}
                  <span style={{fontWeight: "bold", color: "gray" }}>{example.input}</span>
                </div>
                <div sx={{ marginLeft: "16px" }} variant="body1">
                  <span style={{ fontWeight: "bold", marginLeft: "16px" }}>
                    Output:
                  </span>{" "}
                  <span style={{fontWeight: "bold", color: "gray" }}>{example.output}</span>
                </div>
                {example.explanation && (
                  <div variant="body1" sx={{ marginLeft: "16px" }}>
                    <span style={{ fontWeight: "bold", marginLeft: "16px" }}>
                      Explanation:
                    </span>
                    <span style={{fontWeight: "bold", color: "gray" }}>
                      {" "}
                      {example.explanation}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="constraints-container">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Constraints :
            </Typography>

            <ul>
              {data.constraints.map((constraint, constraintIndex) => (
                <li style={{fontWeight: "bold" }} key={constraintIndex}>{constraint}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};
export default Description;
