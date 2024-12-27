import rehypePrism from 'rehype-prism-plus';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { CloseCircleFilled, PlaySquareFilled, SaveFilled, SyncOutlined } from "@ant-design/icons";
import { notification, Tooltip } from 'antd';
import './editor.css';
import { useState } from "react";
import { saveCurrentSQLFile } from './editor-service';
import { useSelector } from 'react-redux';
export default function Editor({ params }) {

  const jobItem = useSelector((state) => state.jobStore.selectedJobItem);
  const selectedTaskId = useSelector((state) => state.jobStore.selectedTaskId);
  const [code, setCode] = useState(``);
  const [isProcessing, setIsProcessing] = useState(false);

  function saveCurrentFile() {
    setIsProcessing(true);
  
    saveCurrentSQLFile(code, selectedTaskId)
      .then((response) => {
        if (response?.status === 200 && response?.data === true) {
          notification.success({
            message: "Success",
            description: "Data Saved",
            duration: 1,
            style: { width: "250px" },
          });
        } else {
          notification.error({
            message: "Error",
            description: "Save Failure",
            duration: 1,
            style: { width: "250px" },
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: "Save Failure",
          duration: 1,
          style: { width: "250px" },
        });
        console.error(error); // For debugging purposes
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }
  

  function runCurrentScript(){
    setIsProcessing(!isProcessing)
  }

  return <div className="editor-main">
    <div className="editor-tool-pick">
      <ul className='editor-tool-pick-ul'>
        <li className='editor-tool-pick-ul-li'>
          <Tooltip title="Execute Query">
            <PlaySquareFilled  onClick={() => runCurrentScript()} style={{ fontSize: '20px', color: '#161b22', cursor: 'pointer' }} />
          </Tooltip>

        </li>
        <li className='editor-tool-pick-ul-li'>
          <Tooltip title="Save Query">
            <SaveFilled onClick={()=>saveCurrentFile()} style={{ fontSize: '20px', color: '#161b22', cursor: 'pointer' }} />
          </Tooltip>
        </li>
        <li style={{ display: 'absolute', left: 'calc(100% - 90px)' }} className='editor-tool-pick-ul-li' >
          {
            isProcessing ?
              <Tooltip title="Saving">
                <SyncOutlined spin style={{ fontSize: '20px', color: '#161b22', cursor: 'pointer' }} />
              </Tooltip>
              :
              <Tooltip title="Close">
                <CloseCircleFilled style={{ fontSize: '20px', color: '#161b22', cursor: 'pointer' }} />
              </Tooltip>
          }
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