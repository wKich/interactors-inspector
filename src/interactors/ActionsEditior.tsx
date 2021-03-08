import AceEditor from "react-ace";
import { useStore } from "effector-react";
import { $code, edit } from "../actions";

import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

export function ActionsEditor() {
  const code = useStore($code);
  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      onChange={edit}
      defaultValue={code}
      showGutter={false}
      tabSize={2}
      enableBasicAutocompletion
      enableLiveAutocompletion
      enableSnippets
      editorProps={{ $blockScrolling: true }}
    />
  );
}
