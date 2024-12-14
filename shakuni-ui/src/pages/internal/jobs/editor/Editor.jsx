import rehypePrism from 'rehype-prism-plus';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { CloseCircleFilled, PlaySquareFilled, SaveFilled } from "@ant-design/icons";
import { Tooltip } from 'antd';
import './editor.css';
import { useState } from "react";
export default function Editor({ params }) {

  const [code, setCode] = useState(
    `CREATE TABLE dbo.EmployeePhoto
(
    EmployeeId INT NOT NULL PRIMARY KEY,
    Photo VARBINARY(MAX) FILESTREAM NULL,
    MyRowGuidColumn UNIQUEIDENTIFIER NOT NULL ROWGUIDCOL
                    UNIQUE DEFAULT NEWID()
);

GO

/*
text_of_comment
/* nested comment */
*/

-- line comment

CREATE NONCLUSTERED INDEX IX_WorkOrder_ProductID
    ON Production.WorkOrder(ProductID)
    WITH (FILLFACTOR = 80,
        PAD_INDEX = ON,
        DROP_EXISTING = ON);
GO

WHILE (SELECT AVG(ListPrice) FROM Production.Product) < $300
BEGIN
   UPDATE Production.Product
      SET ListPrice = ListPrice * 2
   SELECT MAX(ListPrice) FROM Production.Product
   IF (SELECT MAX(ListPrice) FROM Production.Product) > $500
      BREAK
   ELSE
      CONTINUE
END
PRINT 'Too much for the market to bear';

MERGE INTO Sales.SalesReason AS [Target]
USING (VALUES ('Recommendation','Other'), ('Review', 'Marketing'), ('Internet', 'Promotion'))
       AS [Source] ([NewName], NewReasonType)
ON [Target].[Name] = [Source].[NewName]
WHEN MATCHED
THEN UPDATE SET ReasonType = [Source].NewReasonType
WHEN NOT MATCHED BY TARGET
THEN INSERT ([Name], ReasonType) VALUES ([NewName], NewReasonType)
OUTPUT $action INTO @SummaryOfChanges;

SELECT ProductID, OrderQty, SUM(LineTotal) AS Total
FROM Sales.SalesOrderDetail
WHERE UnitPrice < $5.00
GROUP BY ProductID, OrderQty
ORDER BY ProductID, OrderQty
OPTION (HASH GROUP, FAST 10);
`
  );


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