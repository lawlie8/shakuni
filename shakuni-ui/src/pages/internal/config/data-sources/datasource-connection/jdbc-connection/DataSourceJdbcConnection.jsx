import { Card, Col, Form, Input, InputNumber, List, notification, Row } from "antd";
import './datasource-jdbc-connection.css';
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import Meta from "antd/es/card/Meta";
import { setStoreSelectedAddEditDataSourceType, setStoreFormLoaded, setStoreConfiguredDataSourceList, setStorePropDisabled, setStoreSelectedDataSourceTypeLabel } from '../../DataSourceSlice';
import { checkDataSourceConnection, saveDataSourceConnectionProperties } from "../../datasource-service";
import { useState } from "react";

export default function DataSourceJdbcConnection({ jdbcProperties }) {

    const selectedDataSourceTypeAction = useSelector((state) => state.dataStoreSource.selectedDataSourceTypeAction);
    const storeJdbcProperties = useSelector((state) => state.dataStoreSource.selectedDataSourceProperties)
    const storeJdbcValues = useSelector((state) => state.dataStoreSource.selectedDataSourceValues)
    const [connectionSucessFullFlag, setConnectionSuccessFullFlag] = useState(false);
    const propDisabled = useSelector((state) => state.dataStoreSource.propDisabled)
    const formLoaded = useSelector((state) => state.dataStoreSource.formLoaded);
    const configuredDataSourceList = useSelector((state) => state.dataStoreSource.configuredDataSourceList);

    const addEditDataSourceType = useSelector((state) => state.dataStoreSource.addEditDataSourceType)
    const addEditDataSourceId = useSelector((state) => state.dataStoreSource.addEditConfiguredDataSourceId)

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleTestConnection = (values) => {
        if (connectionSucessFullFlag === false) {
            checkDataSourceConnection(addEditDataSourceType, values).then((response) => {
                if (response.status === 200 && response.data === true) {
                    notification.success({
                        message: "Success",
                        description: "Connection ok",
                        style: { width: '200px' },
                        duration: 2,
                    })
                    setConnectionSuccessFullFlag(true);

                } else {
                    notification.error({
                        message: "Error",
                        description: "Connection Failed",
                        style: { width: '200px' },
                    })
                }
            })

        } else {
            saveDataSourceConnectionProperties(addEditDataSourceType, addEditDataSourceId, selectedDataSourceTypeAction, values)
                .then((response) => {
                    if (response.status === 200 && response.data === true) {
                        notification.success({
                            message: "Success",
                            description: "Connection Saved",
                            style: { width: '200px' },
                            duration: 2,
                        })
                    }
                    dispatch(setStorePropDisabled(true));
                    setConnectionSuccessFullFlag(false);
                    dispatch(setStoreConfiguredDataSourceList(configuredDataSourceList.filter(a => a.id !== item.id)));

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

    function handleEdit() {
        dispatch(setStorePropDisabled(!propDisabled));
    }



    return <div className="datasource-connection-jdbc-segment">
        {
            formLoaded ? <Form clearOnDestroy form={form} name="jdbc-connection-form" className="datasource-connection-jdbc-form" onFinish={handleTestConnection} layout="vertical">
                <List>
                    {
                        Object.keys(storeJdbcProperties).map(e => (
                            <Row className="datasource-form-row" >

                                <Col span={24} className="datasource-form-col">

                                    <Form.Item name={storeJdbcProperties[e].propertyName} initialValue={selectedDataSourceTypeAction === "Add" ? null : getPropValueByKey(storeJdbcProperties[e].propertyName)} className="form-left" label={storeJdbcProperties[e].propertyLabel + ":"} required={storeJdbcProperties[e].isRequired === "true" ? true : false}>
                                        <List.Item style={{ border: 'none', margin: '0px', padding: '0px' }}>
                                            {
                                                {
                                                    'Input': <><Input autoComplete="off"
                                                        required={storeJdbcProperties[e].isRequired === "true" ? true : false}
                                                        disabled={!storeJdbcProperties[e].isActive || propDisabled}
                                                        placeholder={storeJdbcProperties[e].example}
                                                        className="jdbc-connection-user-input" defaultValue={selectedDataSourceTypeAction === "Add" ? null : getPropValueByKey(storeJdbcProperties[e].propertyName)} ></Input></>,

                                                    'TextArea': <><TextArea
                                                        required={storeJdbcProperties[e].isRequired === "true" ? true : false}    
                                                        disabled={!storeJdbcProperties[e].isActive || propDisabled}
                                                        placeholder={storeJdbcProperties[e].example}
                                                        className="jdbc-connection-user-text" defaultValue={selectedDataSourceTypeAction === "Add" ? null : getPropValueByKey(storeJdbcProperties[e].propertyName)}></TextArea></>,

                                                    'Input.Password': <><Input.Password
                                                        autoComplete="off"
                                                        required={storeJdbcProperties[e].isRequired === "true" ? true : false}
                                                        disabled={!storeJdbcProperties[e].isActive || propDisabled}
                                                        placeholder={storeJdbcProperties[e].example}
                                                        className="jdbc-connection-user-password" defaultValue={selectedDataSourceTypeAction === "Add" ? null : getPropValueByKey(storeJdbcProperties[e].propertyName)}></Input.Password></>,

                                                    'InputNumber': <><InputNumber
                                                        required={storeJdbcProperties[e].isRequired === "true" ? true : false}
                                                        disabled={!storeJdbcProperties[e].isActive || propDisabled}
                                                        placeholder={storeJdbcProperties[e].example}
                                                        className="jdbc-connection-user-number" defaultValue={selectedDataSourceTypeAction === "Add" ? null : getPropValueByKey(storeJdbcProperties[e].propertyName)}></InputNumber></>
                                                }[storeJdbcProperties[e].dataType]
                                            }
                                        </List.Item>
                                    </Form.Item>
                                    <div className="datasource-form-description">
                                        <p>
                                        {storeJdbcProperties[e].propertyDescription}

                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        ))
                    }

                </List>
                <div className="form-buttons">
                    <Form.Item>
                        {
                            (connectionSucessFullFlag || selectedDataSourceTypeAction === "Add") === true ?
                                <span style={{ display: 'none' }}></span>
                                :
                                <button className='datasource-connection-cancel-button' type="button" onClick={() => handleEdit()}>Edit</button>
                        }
                        <button className={!propDisabled === true ? "datasource-connection-test-connection-button" : 'datasource-connection-test-connection-button-disabled'} type='submit' disabled={propDisabled === true ? true : false} >{connectionSucessFullFlag === true ? "Save" : "Test Connection"}</button>
                        <button className='datasource-connection-cancel-button' type="button" onClick={() => handleCancelConnection()}>Cancel</button>
                    </Form.Item>
                </div>
            </Form> : "Loading Form"
        }

        {/* <div className="datasource-connection-extra">
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
        </div> */}
    </div>
}