import { Button, Tabs } from 'antd';
import './datasource-connection.css';
import DataSourceDriverConnection from './driver-connection/DataSourceDriverConnection';
import DataSourceJdbcConnection from './jdbc-connection/DataSourceJdbcConnection';
import { setStoreSelectedAddEditDataSourceType } from '../DataSourceSlice';
import { useDispatch } from 'react-redux';

export default function DataSourceConnection({jdbcProperties,driverProperties,id,label,actionType}){
    const dispatch = useDispatch()
    const tabsExtraItems = {
        right:<><Button className='datasource-connection-test-connection-button'>Test Connection</Button>
        <Button className='datasource-connection-cancel-button' onClick={()=>handleCancelConnection()}>Cancel</Button></>,
    }

    function handleCancelConnection(){
        dispatch(setStoreSelectedAddEditDataSourceType(0));
    }


    const tabItems = [{
        key:'1',
        label:'Connection',
        children:<DataSourceJdbcConnection jdbcProperties={jdbcProperties} />,
    },
    {
        key:'2',
        label:'Driver',
        children:<DataSourceDriverConnection driverProperties={driverProperties} />,

    }]


    return <div className="datasource-connection-segment">
       <Tabs className='datasource-details' tabBarExtraContent={tabsExtraItems} defaultActiveKey="1" items={tabItems} >

       </Tabs>
    </div>
}