import { useEffect, useState } from 'react';
import './datasource-service.js';
import './datasources.css';
import { fetchConfiguredDataSourcesbyId, fetchDataSourceTypes } from './datasource-service.js';
import DataSourceItem from './DataSourceItem.jsx';
import { Avatar, Breadcrumb, Button, List, notification, Tabs } from 'antd';
import DataSourceJdbcConnection from './jdbc-connection/DataSourceJdbcConnection.jsx';
import DataSourceDriverConnection from './jdbc-connection/DataSourceDriverConnection.jsx';
import { DatabaseFilled } from '@ant-design/icons';
export default function DataSources(params = { params }) {




    const [datasourceType, setDataSourceType] = useState([]);
    const [selectedDataSourceType, setSelectedDataSourceType] = useState(null)
    const [configuredDataSourceList, setConfiguredDataSourceList] = useState([{ id: 1, name: 'maria 10server' }, { id: 2, name: 'Postgres 10 Server' }])
    const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: (<><DatabaseFilled style={{ color: 'black' }} onClick={() => { setSelectedDataSourceType(null); setBreadCrumbItems(breadCrumbItems) }} /></>) }]);

    const dataSourceTabItems = [{
        key: '1',
        lebel: 'Connection Properties',
        childrem: <DataSourceJdbcConnection />
    }, {
        key: '2',
        lebel: 'Driver Properties',
        childrem: <DataSourceDriverConnection />
    },]


    useEffect(() => {
        fetchDataSourceTypes().then((response) => {
            setDataSourceType(response.data)
        }).catch((error) => {

        })
    }, [])

    function handleDatasourceItemClick(item) {
        if (item.active) {

            setSelectedDataSourceType(item.id)
            fetchConfiguredDataSourcesbyId(item.id)
                .then((response) => {
                    setBreadCrumbItems([...breadCrumbItems, { title: item.dataSourceTypeName }])
                    //setConfiguredDataSourceList(response.data)
                }).catch((error) => {
                    setSelectedDataSourceType(null)
                    //setConfiguredDataSourceList([]);
                });
        } else {
            notification.error({ message: "Error", description: 'Inactive DataSource', duration: 1, style: { width: '250px' } })
        }

    }

    return <div className="datasources-main">
        <h2 className='datasources-headline'><DatabaseFilled />  Data Sources</h2>
        <div className='datasource-type-segment' style={{display: selectedDataSourceType === null ? 'block' : 'none'}}>
            <div className='datasource-type-list' style={{ display: selectedDataSourceType === null ? 'block' : 'none', marginTop: '20px' }}>
                {

                    datasourceType?.map((item) => (
                        <div className='datasource-item' onClick={() => handleDatasourceItemClick(item)}>
                            <DataSourceItem params={item} />
                        </div>
                    ))
                }
            </div>

        </div>

        <div className='datasources-configured-segment' style={{ display: selectedDataSourceType !== null ? 'block' : 'none' }}>
            <Breadcrumb className='datasources-configured-segment-breadcrumb'
                items={breadCrumbItems}
            />
        </div>

        {/* <Tabs className='datasources-configured-segment' items={dataSourceTabItems} style={{display: selectedDataSourceType !== null ? 'block' : 'none'}}>

    </Tabs> */}
    </div>

}