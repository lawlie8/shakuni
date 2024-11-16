import { Tabs } from 'antd';
import './jdbc-connection.css';

export default function DataSourceJdbcConnection({id,label,actionType}){

    const tabItems = [{
        key:'1',
        label:'Connection'
    },
    {
        key:'2',
        label:'Driver'
    }]


    return <div className="datasource-jdbc-segment">
       <Tabs className='datasource-details' defaultActiveKey="1" items={tabItems} >

       </Tabs>
    </div>
}