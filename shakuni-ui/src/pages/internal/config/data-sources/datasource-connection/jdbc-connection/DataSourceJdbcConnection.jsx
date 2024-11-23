import {Card, Form, Input, InputNumber, List, notification } from "antd";
import './datasource-jdbc-connection.css';
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import Meta from "antd/es/card/Meta";
import { setStoreSelectedAddEditDataSourceType,setStoreFormLoaded } from '../../DataSourceSlice';
import { checkDataSourceConnection, saveDataSourceConnectionProperties } from "../../datasource-service";
import { useState } from "react";

export default function DataSourceJdbcConnection({ jdbcProperties }) {

    let storeJdbcProperties = useSelector((state) => state.dataSource.selectedDataSourceProperties)
    let storeJdbcValues = useSelector((state) => state.dataSource.selectedDataSourceValues)
    const selectedDataSourceTypeLabel = useSelector((state) => state.dataSource.selectedDataSourceTypeLabel);
    const [connectionSucessFullFlag,setConnectionSuccessFullFlag] = useState(false);
    const [propDisabled,setPropDisabled] = useState(selectedDataSourceTypeLabel === "ADD" ? false : true);
    const formLoaded = useSelector((state) => state.dataSource.formLoaded);

    const addEditDataSourceType = useSelector((state)=> state.dataSource.addEditDataSourceType)
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleTestConnection = (values) => {
        if(connectionSucessFullFlag === false){
            checkDataSourceConnection(addEditDataSourceType,values).then((response)=>{
                if(response.status === 200 && response.data === true){
                    notification.success({
                        message:"Success",
                        description:"Connection ok",
                        style:{width:'200px'},
                        duration:1,
                    })
                setConnectionSuccessFullFlag(true);

                }else{
                    notification.error({
                        message:"Error",
                        description:"Connection Failed",
                        style:{width:'200px'},
                    })
                }
            })
    
        } else {
            saveDataSourceConnectionProperties(addEditDataSourceType,values)
            .then((response)=>{
                if(response.status === 200 && response.data === true){
                    notification.success({
                        message:"Success",
                        description:"Connection Saved",
                        style:{width:'200px'},
                        duration:1,
                    })
                }
                setPropDisabled(true)
                setConnectionSuccessFullFlag(false);
            })
        }
    }
    function handleCancelConnection() {
        dispatch(setStoreSelectedAddEditDataSourceType(0));
        setConnectionSuccessFullFlag(false)
        dispatch(setStoreFormLoaded(false))
    }

    function getPropValueByKey(key) {
        const property = storeJdbcValues.find(item => item.propKey === key);
        return property ? property.propValue : null;      
    }

    function handleEdit(){
        setPropDisabled(!propDisabled)
    }



    return <div className="datasource-connection-jdbc-segment">
        {
            formLoaded ? <Form clearOnDestroy form={form} name="jdbc-connection-form" className="datasource-connection-jdbc-form" onFinish={handleTestConnection}  layout="vertical">
            <List>
                {
                    Object.keys(storeJdbcProperties).map(e => (
                        <Form.Item  name={storeJdbcProperties[e].propertyName} initialValue={getPropValueByKey(storeJdbcProperties[e].propertyName)} className="form-left" label={storeJdbcProperties[e].propertyLabel + ":"} required={storeJdbcProperties[e].isRequired === "true" ? true : false}>
                            <List.Item style={{ border: 'none', margin: '0px', padding: '0px' }}>
                                {
                                    {
                                        'Input': <><Input autoComplete="off"
                                            disabled={!storeJdbcProperties[e].isActive || propDisabled}
                                            placeholder={storeJdbcProperties[e].example}
                                            className="jdbc-connection-user-input" defaultValue={getPropValueByKey(storeJdbcProperties[e].propertyName)} ></Input><span className="property-description">{storeJdbcProperties[e].propertyDescription}</span></>,

                                        'TextArea': <><TextArea
                                            disabled={!storeJdbcProperties[e].isActive || propDisabled}
                                            placeholder={storeJdbcProperties[e].example}
                                            className="jdbc-connection-user-text" defaultValue={getPropValueByKey(storeJdbcProperties[e].propertyName)}></TextArea><span className="property-description">{storeJdbcProperties[e].propertyDescription}</span></>,

                                        'Input.Password': <><Input.Password
                                            autoComplete="off"
                                            disabled={!storeJdbcProperties[e].isActive || propDisabled}
                                            placeholder={storeJdbcProperties[e].example}
                                            className="jdbc-connection-user-password" defaultValue={getPropValueByKey(storeJdbcProperties[e].propertyName)}></Input.Password><span className="property-description">{storeJdbcProperties[e].propertyDescription}</span></>,

                                        'InputNumber': <><InputNumber
                                            disabled={!storeJdbcProperties[e].isActive || propDisabled}
                                            placeholder={storeJdbcProperties[e].example}
                                            className="jdbc-connection-user-number"  defaultValue={getPropValueByKey(storeJdbcProperties[e].propertyName)}></InputNumber><span className="property-description">{storeJdbcProperties[e].propertyDescription}</span></>
                                    }[storeJdbcProperties[e].dataType]
                                }
                            </List.Item>
                        </Form.Item>

                    ))
                }

            </List>
            <div className="form-buttons">
                <Form.Item>
                    {
                        connectionSucessFullFlag === true ? 
                        <span style={{display:'none'}}></span>
                        :
                        <button className='datasource-connection-cancel-button' type="button" onClick={() => handleEdit()}>Edit</button>
                }
                    <button className={!propDisabled === true?"datasource-connection-test-connection-button":'datasource-connection-test-connection-button-disabled'} type='submit' disabled={propDisabled === true ? true : false} >{connectionSucessFullFlag === true ? "Save" : "Test Connection"}</button>
                    <button className='datasource-connection-cancel-button' type="button" onClick={() => handleCancelConnection()}>Cancel</button>
                </Form.Item>
            </div>
        </Form> : "Loading Form"
        }
        
        <div className="datasource-connection-extra">
            <List>
                <List.Item>
                    <Card size="small" style={{ width: 200, boxShadow: '0px 0px 5px gray' }} cover={<img alt="example" src="/misc/jdbc-connection-card-1.jpg"></img>}>
                        <Meta
                            title="Data is Secured"
                            description="All Jdbc Properties are Encrypted Locally"
                        />
                    </Card>
                </List.Item>
            </List>
        </div>
    </div>
}