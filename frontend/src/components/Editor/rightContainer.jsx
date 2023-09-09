import React from "react";
// import CodeEditor from "./codeEditor";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { darcula } from "@uiw/codemirror-theme-darcula";
const RighContainer = ({ questionDetails }) => {

  
  return (
    <div>
     <CodeMirror
        height="500px"
        theme={darcula}
        value={questionDetails.functionPrototype}
        extensions={[javascript({ jsx: true })]}
        // onChange={onChange}
      />
    </div>
  );
};

export default RighContainer;
