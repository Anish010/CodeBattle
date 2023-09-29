import React, {useEffect, useState} from "react";
// import CodeEditor from "./codeEditor";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { darcula } from "@uiw/codemirror-theme-darcula";
import ButtonComp from "../../utils/ButtonComp";
import axios from "axios";

const RightContainer = ({ questionDetails, setActiveButton, requestData }) => {
  const [userCode, setUserCode] = useState("");
  const [submitData, setSubmitData] = useState({
    questionId: "",
    userId: "",
    userCode: "",
  });

useEffect(() => {
  setSubmitData({
    questionId: requestData.questionId,
    userId: requestData.userId,
    userCode: userCode,
  });
}, [userCode, requestData.questionId, requestData.userId]);

  
  const handleSubmit = async () => {
    console.log(submitData)
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/submitQuestion",
      submitData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setActiveButton("submission");
    // Handle the response as needed
    console.log("Submission successful:", response.data);

    // Optionally, set state or perform other actions based on the response
  } catch (error) {
    // Handle errors
    console.error("Error submitting data:", error);

    // Check if there's a response from the server (e.g., error.response)
    if (error.response) {
      console.error("Server response data:", error.response.data);
    }
  }
};


  const onChange = React.useCallback((value) => {
    setUserCode(value);
  }, []);

  
  
  const style = {
    borderRadius: "0",
  };

  return (
    <div>
      <CodeMirror
        height="500px"
        theme={darcula}
        value={questionDetails.functionPrototype}
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
      <ButtonComp
        text="Submit"
        variant="contained"
        color="primary"
        style={style}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default RightContainer;
