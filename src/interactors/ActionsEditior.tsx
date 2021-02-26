import React from "react";
import AceEditor from "react-ace";
import { edit } from "../actions";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

export function ActionsEditor() {
  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      onChange={edit}
      showGutter={false}
      tabSize={2}
      enableBasicAutocompletion
      enableLiveAutocompletion
      enableSnippets
      editorProps={{ $blockScrolling: true }}
    />
  );
}
