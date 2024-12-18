import { useEffect, useState } from 'react';
import './datasource-service.js';
import './datasources.css';
import { deleteConfiguredDataSourceById, fetchConfiguredDataSourcePropertiesByDataSourceTypeId, fetchConfiguredDataSourcePropertyValuesByConfiguredDataSourceId, fetchConfiguredDataSourcesById, fetchDataSourceTypes } from './datasource-service.js';
import DataSourceItem from './DataSourceItem.jsx';
import { Avatar, Breadcrumb, Divider, List, notification, Popconfirm, Tooltip } from 'antd';
import { DatabaseOutlined, DeleteFilled, EditFilled, PlusCircleFilled } from '@ant-design/icons';
import DataSourceConnection from './datasource-connection/DataSourceConnection.jsx';
import {
    setStoreConfiguredDataSourceList, setStoreFormLoaded, setStorePropDisabled, setStoreSelectedAddEditDataSourceType, setStoreSelectedDataSourceImageUrl,
    setStoreSelectedDataSourceProperties, setStoreSelectedDataSourceType, setStoreSelectedDataSourceTypeAction,
    setStoreSelectedDataSourceTypeLabel, setStoreSelectedDataSourceValues, setStoreSelectedAddEditConfiguredDataSourceId
} from './DataSourceSlice.js';
import { useDispatch, useSelector } from 'react-redux';
export default function DataSources(params = { params }) {

    const [datasourceType, setDataSourceType] = useState([]);
    const addEditDataSourceType = useSelector((state) => state.dataStoreSource.addEditDataSourceType);
    const selectedDataSourceTypeId = useSelector((state) => state.dataStoreSource.selectedDataSourceType);
    const selectedDataSourceTypeLabel = useSelector((state) => state.dataStoreSource.selectedDataSourceTypeLabel);
    const selectedDataSourceTypeAction = useSelector((state) => state.dataStoreSource.selectedDataSourceTypeAction);
    const formLoaded = useSelector((state) => state.dataStoreSource.formLoaded);
    const addEditDataSourceId = useSelector((state) => state.dataStoreSource.addEditConfiguredDataSourceId)

    const configuredDataSourceList = useSelector((state) => state.dataStoreSource.configuredDataSourceList);
    const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: (<><DatabaseOutlined style={{ color: 'black' }} onClick={() => { handleBreadCrumbDatabaseClick() }} /></>) }]);
    const selectedDataSourceImageUrl = useSelector((state) => state.dataStoreSource.selectedDataSourceImageUrl);
    const [dataSourcePropList, setDataSourcePropList] = useState([]);
    const [driverPropList, setDriverPropList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchDataSourceTypes().then((response) => {
            setDataSourceType(response.data)
        })
    }, [])

    function handleBreadCrumbDatabaseClick() {

        dispatch(setStoreSelectedDataSourceType(0));
        dispatch(setStoreSelectedAddEditDataSourceType(0));
        dispatch(setStoreSelectedDataSourceTypeLabel(''));
        dispatch(setStoreFormLoaded(false))

        setBreadCrumbItems([{ title: (<><DatabaseFilled style={{ color: 'black' }} onClick={() => { handleBreadCrumbDatabaseClick() }} /></>) }])
    }

    function handleDatasourceItemClick(item) {
        dispatch(setStoreSelectedDataSourceType(item.id));
        console.log("selectedDataSourceType", selectedDataSourceTypeId, "item", item.id);

        if (item.active) {
            dispatch(setStoreSelectedDataSourceImageUrl(item.dataSourceImageUrl));

            fetchConfiguredDataSourcesById(item.id)
                .then((response) => {
                    setBreadCrumbItems([...breadCrumbItems, { title: <span><img src={item.dataSourceImageUrl} onClick={() => handleBreadCrumbDataSourceClick(item)} className='datasource-breadcrumb-image'></img>{item.dataSourceLabel}</span> }]);
                    dispatch(setStoreSelectedDataSourceTypeLabel(item.dataSourceLabel));
                    dispatch(setStoreConfiguredDataSourceList(response.data));
                })
        } else {
            notification.error({ message: "Error", description: 'Inactive DataSource', duration: 1, style: { width: '250px' } })
        }

    }

    function handleBreadCrumbDataSourceClick(item) {
        dispatch(setStoreSelectedDataSourceType(item.id));
        dispatch(setStoreSelectedAddEditDataSourceType(0));
        dispatch(setStoreFormLoaded(false))

    }

    function handleConfiguredDataSourceEdit(item) {
        dispatch(setStoreSelectedDataSourceTypeLabel(selectedDataSourceTypeLabel));
        dispatch(setStoreSelectedDataSourceTypeAction("Edit"));
        dispatch(setStorePropDisabled(true));
        dispatch(setStoreSelectedAddEditDataSourceType(item.datasourceType));
        dispatch(setStoreSelectedAddEditConfiguredDataSourceId(item.id));

        fetchConfiguredDataSourcePropertiesByDataSourceTypeId(item.datasourceType)
            .then(response => {
                setDataSourcePropList(response.data)
                dispatch(setStoreSelectedDataSourceProperties(response.data));
            })

        fetchConfiguredDataSourcePropertyValuesByConfiguredDataSourceId(item.id)
            .then((response) => {
                dispatch(setStoreSelectedDataSourceValues(response.data))
                dispatch(setStoreFormLoaded(true))
            })
    }

    function handleConfiguredDataSourceAdd(item) {

        dispatch(setStoreSelectedAddEditDataSourceType(item));
        dispatch(setStoreSelectedDataSourceTypeLabel(selectedDataSourceTypeLabel));
        dispatch(setStoreSelectedDataSourceTypeAction("Add"));
        dispatch(setStorePropDisabled(false));

        fetchConfiguredDataSourcePropertiesByDataSourceTypeId(item)
            .then(response => {
                setDataSourcePropList(response.data)
                dispatch(setStoreFormLoaded(true))
                dispatch(setStoreSelectedDataSourceProperties(response.data));
            })

    }

    function handleConfiguredDataSourceDelete(item) {
        deleteConfiguredDataSourceById(item.id)
            .then((response) => {
                if (response.status === 200) {
                    notification.success({
                        message: 'Success',
                        description: 'DataSource Deleted SuccessFully',
                        duration: 1,
                        width: '200px'
                    })
                    dispatch(setStoreConfiguredDataSourceList(configuredDataSourceList.filter(a => a.id !== item.id)));
                }
            })
    }

    return <div className="datasources-main">
        <div className='datasources-view' style={{ display: addEditDataSourceType === 0 ? 'block' : 'none' }}>
            <h2 className='datasources-headline'><DatabaseOutlined />  Data Sources</h2>
            <div className='datasource-type-segment' style={{ display: selectedDataSourceTypeId === 0 ? 'block' : 'none' }}>
                <div className='datasource-type-list' style={{ display: selectedDataSourceTypeId === 0 ? 'block' : 'none', marginTop: '20px' }}>
                    {

                        datasourceType?.map((item) => (
                            <div className='datasource-item' onClick={() => handleDatasourceItemClick(item)}>
                                <DataSourceItem params={item} />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='datasources-configured-segment' style={{ display: selectedDataSourceTypeId !== 0 ? 'block' : 'none' }}>
                <Breadcrumb className='datasources-configured-segment-breadcrumb'
                    items={breadCrumbItems}
                />
                <Divider style={{ width: 'calc(100% - 20px)', marginTop: '20px', borderColor: 'lightgray' }} />
                <List className='configured-datasource-list'>
                    {
                        configuredDataSourceList?.map((item, index) => (
                            <List.Item key={item.id} style={{ padding: '5px', border: '1px solid gray',boxShadow:'0px 0px 1px 0px gray', borderRadius: '10px' }} className='configured-datasource-list-item'>
                                <>

                                        <ul style={{margin:'0px',padding:'0px',listStyle:'none'}}>

                                        <li style={{display:'inline',float:'left',margin:'10px'}}>
                                            <img src={selectedDataSourceImageUrl} height='50px' width='50px' />
                                        </li>
                                        <li  style={{display:'relative',float:'left',margin:'10px',paddingLeft:'10px'}}>
                                            <h3>{item.datasourceName}</h3>
                                        </li>
                                        </ul>


                                    <div>
                                        <span style={{ margin: '0px', color: 'gray' }}>{item.datasourceDescription}</span>
                                    </div>

                                    <div className='configured-datasources-action-icons'>


                                        {<span style={{ color: 'gray', top: '-2px', position: 'relative', fontStyle: 'oblique', margin: '5px' }}>{new Date(item.creationDate).getMonth()}
                                            /{new Date(item.creationDate).getDate()}
                                            /{new Date(item.creationDate).getFullYear()}
                                            -{new Date(item.creationDate).getHours()}
                                            :{new Date(item.creationDate).getMinutes()}
                                            :{new Date(item.creationDate).getSeconds()}</span>}

                                        <Tooltip arrow={false} placement='topLeft' title={`Last Modified By :   ${item.createdBy}`}>
                                            <Avatar size={30} style={{ backgroundColor: 'purple',position:'relative',top:'-6px' }}>{item.createdBy?.toUpperCase()[0]}</Avatar>
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
                        <List.Item className='configured-datasource-add' onClick={() => handleConfiguredDataSourceAdd(selectedDataSourceTypeId)}>
                            <PlusCircleFilled className='configured-datasource-add-icon' />
                        </List.Item>
                    </Tooltip>
                </List>

            </div>
        </div>

        <div className='datasources-add-edit' style={{ display: addEditDataSourceType !== 0 ? 'block' : 'none' }}>
            <h2 className='datasources-headline'><DatabaseOutlined /> {selectedDataSourceTypeAction} <span style={{ color: 'gray' }}>{selectedDataSourceTypeLabel}</span> Data Source</h2>
            <div className='datasource-type-segment'>
                <Breadcrumb className='datasources-configured-segment-breadcrumb'
                    items={breadCrumbItems}
                />
                <Divider style={{ width: 'calc(100% - 20px)', margin: '20px 0px 0px 0px', paddingBottom: '0px', borderColor: 'lightgray' }} />

                <DataSourceConnection jdbcProperties={dataSourcePropList} driverProperties={driverPropList} id={addEditDataSourceType} label={selectedDataSourceTypeLabel} actionType={selectedDataSourceTypeAction} />
            </div>
        </div>

    </div>

}