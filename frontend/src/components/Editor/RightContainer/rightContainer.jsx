import React from "react";
// import CodeEditor from "./codeEditor";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { darcula } from "@uiw/codemirror-theme-darcula";
import ButtonComp from "../../utils/ButtonComp";
const RighContainer = ({ questionDetails, setActiveButton }) => {
  const handleSubmit = () => {
    // Api call
    setActiveButton("submission");
  };

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
        // onChange={onChange}
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

export default RighContainer;
