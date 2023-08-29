// import React, { useState } from 'react';
// import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";
// import { darcula } from "@uiw/codemirror-theme-darcula";

// // ...

// const CodeEditor = () => {
//   const initialCode = `function greet(name) {
//   return "Hello, " + name + "!";
// }`;

//   const [editorState, setEditorState] = useState(() =>
//     EditorState.create({
//       doc: initialCode,
//       extensions: [javascript()],
//     })
//   );

//   const handleEditorChange = (newEditorState) => {
//     setEditorState(newEditorState);
//   };

//   return (
//     <div>
//       <h1>JavaScript Code Editor</h1>
//       <EditorView
//         state={editorState}
//         onDispatch={(tr) => handleEditorChange(editorState.update(tr))}
//       />
//       <h2>Preview:</h2>
//       <div>
//         <pre>{editorState.doc.toString()}</pre>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;
import React from 'react'

const codeEditor = () => {
  return (
    <div>codeEditor</div>
  )
}

export default codeEditor