import rehypePrism from 'rehype-prism-plus';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { CloseCircleFilled, PlaySquareFilled, SaveFilled } from "@ant-design/icons";
import { Tooltip } from 'antd';
import './editor.css';
import { useState } from "react";
export default function Editor({ params }) {

  const [code, setCode] = useState(``);


  return <div className="editor-main">
    <div className="editor-tool-pick">
      <ul className='editor-tool-pick-ul'>
        <li className='editor-tool-pick-ul-li'>
          <Tooltip title="Execute Query">
            <PlaySquareFilled style={{ fontSize: '20px', color: '#161b22',cursor:'pointer' }} />
          </Tooltip>

        </li>
        <li className='editor-tool-pick-ul-li'>
          <Tooltip title="Save Query">
            <SaveFilled style={{ fontSize: '20px', color: '#161b22',cursor:'pointer' }} />
          </Tooltip>
        </li>
        <li style={{display:'absolute', left:'calc(100% - 90px)'}} className='editor-tool-pick-ul-li' >
          <Tooltip title="Close">
            <CloseCircleFilled style={{ fontSize: '20px', color: '#161b22',cursor:'pointer'}} />
          </Tooltip>
        </li>

      </ul>
    </div>
    <CodeEditor
      value={code}
      language="sql"
      placeholder="Please enter SQL Query to Execute."
      onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      rehypePlugins={[
        [rehypePrism, { ignoreMissing: true, showLineNumbers: true, }]
      ]}

      style={{
        backgroundColor: "#161b22",
        height: "calc(100vh - 270px)",
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        overflowY: 'scroll',
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />

  </div>
}