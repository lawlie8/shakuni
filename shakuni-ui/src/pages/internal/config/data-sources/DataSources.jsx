import { useEffect, useState } from 'react';
import './datasource-service.js';
import './datasources.css';
import { deleteConfiguredDataSourceById, fetchConfiguredDataSourcesById, fetchDataSourceTypes } from './datasource-service.js';
import DataSourceItem from './DataSourceItem.jsx';
import { Breadcrumb, Divider, List, notification, Popconfirm, Tooltip } from 'antd';
import DataSourceJdbcConnection from './jdbc-connection/DataSourceJdbcConnection.jsx';
import DataSourceDriverConnection from './jdbc-connection/DataSourceDriverConnection.jsx';
import { DatabaseFilled, DeleteFilled, EditFilled, InfoCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';


export default function DataSources(params = { params }) {




    const [datasourceType, setDataSourceType] = useState([]);
    const [selectedDataSourceType, setSelectedDataSourceType] = useState({ id: null, label: '', actionType: '' })
    const [configuredDataSourceList, setConfiguredDataSourceList] = useState([]);
    const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: (<><DatabaseFilled style={{ color: 'black' }} onClick={() => { handleBreadCrumbDatabaseClick() }} /></>) }]);
    const [selectedDataSourceImageUrl, setSelectedDataSourceImageUrl] = useState('');

    const [addEditDataSourceType, setAddEditDataSourceType] = useState({ id: null, label: '', actionType: '' });

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

    function handleBreadCrumbDatabaseClick() {
        setSelectedDataSourceType({ id: null, label: '', actionType: '' });
        setAddEditDataSourceType({ id: null, label: '', actionType: '' });
        setBreadCrumbItems([{ title: (<><DatabaseFilled style={{ color: 'black' }} onClick={() => { handleBreadCrumbDatabaseClick() }} /></>) }])
    }

    function handleDatasourceItemClick(item) {
        if (item.active) {

            setSelectedDataSourceImageUrl(item.dataSourceImageUrl);
            setSelectedDataSourceType({ id: item.id, label: item.dataSourceLabel, actionType: 'View' });

            fetchConfiguredDataSourcesById(item.id)
                .then((response) => {
                    setBreadCrumbItems([...breadCrumbItems, { title: <span><img src={item.dataSourceImageUrl} onClick={()=>handleBreadCrumbDataSourceClick(item)} className='datasource-breadcrumb-image'></img>{item.dataSourceLabel}</span> }]);
                    setConfiguredDataSourceList(response.data)
                }).catch((error) => {
                    setSelectedDataSourceType({ id: null, label: '', actionType: 'View' })
                    setConfiguredDataSourceList([]);
                });
        } else {
            notification.error({ message: "Error", description: 'Inactive DataSource', duration: 1, style: { width: '250px' } })
        }

    }

    function handleBreadCrumbDataSourceClick(item){
        setSelectedDataSourceType({ id: item.id, label: item.label, actionType: 'Edit' });
        setAddEditDataSourceType({ id: null, label: '', actionType: 'View' });
    }

    function handleConfiguredDataSourceEdit(item) {
        console.log("Editing item  with id", item.id);
        setSelectedDataSourceType({ id: item.id, label: selectedDataSourceType.label, actionType: 'Edit' })
        setAddEditDataSourceType({ id: item.id, label: item.dataSourceLabel, actionType: 'Edit' });

    }

    function handleConfiguredDataSourceAdd(item) {
        setSelectedDataSourceType({ id: item.id, label: item.label, actionType: 'Add' })
        setAddEditDataSourceType({ id: item.id, label: item.label, actionType: 'Add' });
    }

    function handleConfiguredDataSourceDelete(item) {
        deleteConfiguredDataSourceById(item.id)
        .then((response)=>{
            if(response.status === 200){
                notification.success({
                    message:'Success',
                    description:'DataSource Deleted SuccessFully',
                    duration:1
                })
            //useLocation("/");
            }
        })
    }

    return <div className="datasources-main">
        <div className='datasources-view' style={{ display: addEditDataSourceType.id === null ? 'block' : 'none' }}>
            <h2 className='datasources-headline'><DatabaseFilled />  Data Sources</h2>
            <div className='datasource-type-segment' style={{ display: selectedDataSourceType.id === null ? 'block' : 'none' }}>
                <div className='datasource-type-list' style={{ display: selectedDataSourceType.id === null ? 'block' : 'none', marginTop: '20px' }}>
                    {

                        datasourceType?.map((item) => (
                            <div className='datasource-item' onClick={() => handleDatasourceItemClick(item)}>
                                <DataSourceItem params={item} />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='datasources-configured-segment' style={{ display: selectedDataSourceType.id !== null ? 'block' : 'none' }}>
                <Breadcrumb className='datasources-configured-segment-breadcrumb'
                    items={breadCrumbItems}
                />
                <Divider style={{ width: 'calc(100% - 20px)', marginTop: '20px', borderColor: 'lightgray' }} />
                <List className='configured-datasource-list'>
                    {
                        configuredDataSourceList?.map((item, index) => (
                            <List.Item key={item.id} style={{ padding: '5px', border: '1px solid gray', borderRadius: '10px' }} className='configured-datasource-list-item'>
                                <>
                                    <img src={selectedDataSourceImageUrl} height='50px' width='50px' />
                                    <div>
                                        <h3 style={{ margin: '0px' }}>{item.datasourceName}</h3>
                                        <span style={{ margin: '0px', color: 'gray' }}>{item.datasourceDescription}</span>
                                    </div>

                                    <div className='configured-datasources-action-icons'>

                                        {/* <span style={{color:'gray',top:'-5px',position:'relative'}}>{new Date(item.creationDate).getMonth()}
                                            /{new Date(item.creationDate).getDate()}
                                            /{new Date(item.creationDate).getFullYear()}
                                             -{new Date(item.creationDate).getHours()}
                                            :{new Date(item.creationDate).getMinutes()}
                                            :{new Date(item.creationDate).getSeconds()}</span> */}

                                        <Tooltip arrow={false} placement='topLeft' title={`Created By :   ${item.createdBy} Created On : ${new Date(item.creationDate).getMonth()}/${new Date(item.creationDate).getDate()}/${new Date(item.creationDate).getFullYear()}
                                             -${new Date(item.creationDate).getHours()}:${new Date(item.creationDate).getMinutes()}:${new Date(item.creationDate).getSeconds()}`}>
                                            <InfoCircleFilled className='datasource-item-edit-icon' />
                                        </Tooltip>


                                        <Tooltip arrow={false} placement='topLeft' title={'Edit'}>
                                            <EditFilled onClick={() => handleConfiguredDataSourceEdit(item)} className='datasource-item-edit-icon' />
                                        </Tooltip>


                                        <Tooltip arrow={false} placement='topLeft' title={'Delete'}>
                                            <Popconfirm
                                            placement="leftTop"
                                            title="Delete Confirmation"
                                            description="Are you sure you want to delete this Data-Source?"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={() => handleConfiguredDataSourceDelete(item)}>
                                                <DeleteFilled className='datasource-item-delete-icon' />
                                            </Popconfirm>
                                        </Tooltip>
                                    </div>
                                </>
                            </List.Item>
                        ))
                    }
                    <Tooltip arrow={false} placement="bottom" title={'Add New DataSource'} color='black'>
                        <List.Item className='configured-datasource-add' onClick={() => handleConfiguredDataSourceAdd(selectedDataSourceType)}>
                            <PlusCircleFilled className='configured-datasource-add-icon' />
                        </List.Item>
                    </Tooltip>
                </List>

            </div>
        </div>

        <div className='datasources-add-edit' style={{ display: addEditDataSourceType.id !== null ? 'block' : 'none' }}>
            <h2 className='datasources-headline'><DatabaseFilled /> {addEditDataSourceType.actionType} <span style={{ color: 'gray'}}>{selectedDataSourceType.label}</span> Data Source</h2>
            <div className='datasource-type-segment'>
                <Breadcrumb className='datasources-configured-segment-breadcrumb'
                    items={breadCrumbItems}
                />
                <Divider style={{ width: 'calc(100% - 20px)', margin: '20px 0px 0px 0px',paddingBottom:'0px' ,borderColor: 'lightgray' }} />

                <DataSourceJdbcConnection id={addEditDataSourceType.id} label={selectedDataSourceType.label} actionType={addEditDataSourceType.actionType} />
            </div>
        </div>

    </div>

}