import { useEffect, useState } from 'react';
import './datasource-service.js';
import './datasources.css';
import { deleteConfiguredDataSourceById, fetchConfiguredDataSourcePropertiesByDataSourceTypeId, fetchConfiguredDataSourcePropertyValuesByConfiguredDataSourceId, fetchConfiguredDataSourcesById, fetchDataSourceTypes } from './datasource-service.js';
import DataSourceItem from './DataSourceItem.jsx';
import { Avatar, Breadcrumb, Button, Divider, Dropdown, List, notification, Popconfirm, Tooltip } from 'antd';
import { DatabaseFilled, DeleteFilled, EditFilled, InfoCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import DataSourceConnection from './datasource-connection/DataSourceConnection.jsx';
import { setStoreConfiguredDataSourceList, setStoreFormLoaded, setStoreSelectedAddEditDataSourceType, setStoreSelectedDataSourceImageUrl, 
    setStoreSelectedDataSourceProperties, setStoreSelectedDataSourceType, setStoreSelectedDataSourceTypeAction, 
    setStoreSelectedDataSourceTypeLabel,setStoreSelectedDataSourceValues } from './DataSourceSlice.js';
import { useDispatch, useSelector } from 'react-redux';
export default function DataSources(params = { params }) {

    const [datasourceType, setDataSourceType] = useState([]);
    const addEditDataSourceType = useSelector((state) => state.dataSource.addEditDataSourceType);
    const selectedDataSourceType = useSelector((state) => state.dataSource.selectedDataSourceType);
    const selectedDataSourceTypeLabel = useSelector((state) => state.dataSource.selectedDataSourceTypeLabel);
    const selectedDataSourceTypeAction = useSelector((state) => state.dataSource.selectedDataSourceTypeAction);
    const formLoaded = useSelector((state) => state.dataSource.formLoaded);

    const configuredDataSourceList = useSelector((state) => state.dataSource.configuredDataSourceList);
    const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: (<><DatabaseFilled style={{ color: 'black' }} onClick={() => { handleBreadCrumbDatabaseClick() }} /></>) }]);
    const selectedDataSourceImageUrl = useSelector((state) => state.dataSource.selectedDataSourceImageUrl);
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
        if (item.active) {
            dispatch(setStoreSelectedDataSourceImageUrl(item.dataSourceImageUrl));

            dispatch(setStoreSelectedDataSourceType(item.id));
            fetchConfiguredDataSourcesById(item.id)
                .then((response) => {
                    setBreadCrumbItems([...breadCrumbItems, { title: <span><img src={item.dataSourceImageUrl} onClick={() => handleBreadCrumbDataSourceClick(item)} className='datasource-breadcrumb-image'></img>{item.dataSourceLabel}</span> }]);
                    dispatch(setStoreSelectedDataSourceTypeLabel(item.dataSourceLabel));
                    dispatch(setStoreConfiguredDataSourceList(response.data));
                }).catch((error) => {
                    dispatch(setStoreSelectedDataSourceType(0));
                    dispatch(setStoreConfiguredDataSourceList([]));
                });
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

        dispatch(setStoreSelectedDataSourceType(item.id));
        dispatch(setStoreSelectedAddEditDataSourceType(item.id));
        dispatch(setStoreSelectedDataSourceTypeLabel(selectedDataSourceTypeLabel));
        dispatch(setStoreSelectedDataSourceTypeAction("Edit"));

        fetchConfiguredDataSourcePropertiesByDataSourceTypeId(item.id)
            .then(response => {
                setDataSourcePropList(response.data)
                dispatch(setStoreSelectedDataSourceProperties(response.data));
            })

        fetchConfiguredDataSourcePropertyValuesByConfiguredDataSourceId(item.id)
        .then((response)=>{
            dispatch(setStoreSelectedDataSourceValues(response.data))
            dispatch(setStoreFormLoaded(true))
        })
    }

    function handleConfiguredDataSourceAdd(item) {
        
        dispatch(setStoreSelectedAddEditDataSourceType(item));
        dispatch(setStoreSelectedDataSourceTypeLabel(selectedDataSourceTypeLabel));
        dispatch(setStoreSelectedDataSourceTypeAction("Add"));

        fetchConfiguredDataSourcePropertiesByDataSourceTypeId(item)
            .then(response => {
                setDataSourcePropList(response.data)
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
            <h2 className='datasources-headline'><DatabaseFilled />  Data Sources</h2>
            <div className='datasource-type-segment' style={{ display: selectedDataSourceType === 0 ? 'block' : 'none' }}>
                <div className='datasource-type-list' style={{ display: selectedDataSourceType === 0 ? 'block' : 'none', marginTop: '20px' }}>
                    {

                        datasourceType?.map((item) => (
                            <div className='datasource-item' onClick={() => handleDatasourceItemClick(item)}>
                                <DataSourceItem params={item} />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='datasources-configured-segment' style={{ display: selectedDataSourceType !== 0 ? 'block' : 'none' }}>
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


                                        {<span style={{ color: 'gray', top: '-2px', position: 'relative' ,fontStyle:'oblique',margin:'5px' }}>{new Date(item.creationDate).getMonth()}
                                            /{new Date(item.creationDate).getDate()}
                                            /{new Date(item.creationDate).getFullYear()}
                                            -{new Date(item.creationDate).getHours()}
                                            :{new Date(item.creationDate).getMinutes()}
                                            :{new Date(item.creationDate).getSeconds()}</span>}

                                        <Tooltip arrow={false} placement='topLeft' title={`Created By :   ${item.createdBy}`}>
                                            <Avatar className="header-user-logo-avatar"  size={30} style={{ backgroundColor: 'purple' }}>{item.createdBy?.toUpperCase()[0]}</Avatar>
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

        <div className='datasources-add-edit' style={{ display: addEditDataSourceType !== 0 ? 'block' : 'none' }}>
            <h2 className='datasources-headline'><DatabaseFilled /> {selectedDataSourceTypeAction} <span style={{ color: 'gray' }}>{selectedDataSourceTypeLabel}</span> Data Source</h2>
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