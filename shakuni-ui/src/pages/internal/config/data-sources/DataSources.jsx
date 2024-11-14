import { useEffect, useState } from 'react';
import './datasource-service.js';
import './datasources.css';
import { fetchConfiguredDataSourcesbyId, fetchDataSourceTypes } from './datasource-service.js';
import DataSourceItem from './DataSourceItem.jsx';
import { Avatar, Breadcrumb, Button, Divider, List, notification, Tabs, Tooltip } from 'antd';
import DataSourceJdbcConnection from './jdbc-connection/DataSourceJdbcConnection.jsx';
import DataSourceDriverConnection from './jdbc-connection/DataSourceDriverConnection.jsx';
import { DatabaseFilled, EditFilled, PlusCircleFilled } from '@ant-design/icons';
export default function DataSources(params = { params }) {




    const [datasourceType, setDataSourceType] = useState([]);
    const [selectedDataSourceType, setSelectedDataSourceType] = useState(null)
    const [configuredDataSourceList, setConfiguredDataSourceList] = useState([{ id: 1, name: 'maria 10server', description: 'MaraDb Server Description' }, { id: 2, name: 'Postgres 10 Server', description: 'Postgres Server Description' }])
    const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: (<><DatabaseFilled style={{ color: 'black' }} onClick={() => { setSelectedDataSourceType(null); setBreadCrumbItems(breadCrumbItems) }} /></>) }]);
    const [selectedDataSourceImageUrl, setSelectedDataSourceImageUrl] = useState('');

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
            setSelectedDataSourceImageUrl(item.dataSourceImageUrl);
            setSelectedDataSourceType(item.id)
            fetchConfiguredDataSourcesbyId(item.id)
                .then((response) => {
                    setBreadCrumbItems([...breadCrumbItems, { title: item.dataSourceLabel }])
                    //setConfiguredDataSourceList(response.data)
                }).catch((error) => {
                    setSelectedDataSourceType(null)
                    //setConfiguredDataSourceList([]);
                });
        } else {
            notification.error({ message: "Error", description: 'Inactive DataSource', duration: 1, style: { width: '250px' } })
        }

    }

    function handleConfiguredDataSourceEdit(item) {
        console.log("Editing item  with id", item.id);

    }

    function handleConfiguredDataSourceAdd(item) {
        console.log("Editing item  with id", item);

    }

    return <div className="datasources-main">
        <h2 className='datasources-headline'><DatabaseFilled />  Data Sources</h2>
        <div className='datasource-type-segment' style={{ display: selectedDataSourceType === null ? 'block' : 'none' }}>
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
            <Divider style={{ width: 'calc(100% - 20px)', marginTop: '20px', borderColor: 'lightgray' }} />
            <List className='configured-datasource-list'>
                {
                    configuredDataSourceList?.map((item, index) => (
                        <List.Item style={{ padding: '5px' }} className='configured-datasource-list-item'>
                            <>
                                <img src={selectedDataSourceImageUrl} height='50px' width='50px' />
                                <div>
                                    <h3 style={{ margin: '0px' }}>{item.name}</h3>
                                    <span style={{ margin: '0px', color: 'gray' }}>{item.description}</span>
                                </div>
                                <EditFilled onClick={() => handleConfiguredDataSourceEdit(item)} className='datasource-item-edit-icon' />
                            </>
                        </List.Item>
                    ))
                }
                <Tooltip arrow={false} placement="bottom" title={'Add New DataSource'} color='black'>
                    <List.Item className='configured-datasource-add' onClick={()=>handleConfiguredDataSourceAdd(selectedDataSourceType)}>
                        <PlusCircleFilled className='configured-datasource-add-icon' />
                    </List.Item>
                </Tooltip>
            </List>

        </div>


    </div>

}