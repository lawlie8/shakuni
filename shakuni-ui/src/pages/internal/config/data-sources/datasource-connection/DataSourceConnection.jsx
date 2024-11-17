import { Button, Tabs } from 'antd';
import './datasource-connection.css';
import DataSourceDriverConnection from './driver-connection/DataSourceDriverConnection';
import DataSourceJdbcConnection from './jdbc-connection/DataSourceJdbcConnection';

export default function DataSourceConnection({id,label,actionType}){

    const tabsExtraItems = {
        right:<><Button className='datasource-connection-test-connection-button'>Test Connection</Button>
        <Button className='datasource-connection-cancel-button'>Cancel</Button></>,
    }


    const tabItems = [{
        key:'1',
        label:'Connection',
        children:<DataSourceJdbcConnection />,
    },
    {
        key:'2',
        label:'Driver',
        children:<DataSourceDriverConnection />,

    }]


    return <div className="datasource-connection-segment">
       <Tabs className='datasource-details'  tabBarExtraContent={tabsExtraItems} defaultActiveKey="1" items={tabItems} >

       </Tabs>
    </div>
}