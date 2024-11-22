import { Button, Card, Form, Input, InputNumber, List, notification } from "antd";
import './datasource-jdbc-connection.css';
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import Meta from "antd/es/card/Meta";
import { setStoreSelectedAddEditDataSourceType } from '../../DataSourceSlice';
import { checkDataSourceConnection } from "../../datasource-service";

export default function DataSourceJdbcConnection({ jdbcProperties }) {

    let storeJdbcProperties = useSelector((state) => state.dataSource.selectedDataSourceProperties)
    const addEditDataSourceType = useSelector((state)=> state.dataSource.addEditDataSourceType)
    const dispatch = useDispatch();

    const handleTestConnection = (values) => {
        checkDataSourceConnection(addEditDataSourceType,values).then((response)=>{
            if(response.status === 200 && response.data === true){
                notification.success({
                    message:"Success",
                    description:"Connection ok",
                    style:{width:'200px'},
                    duration:1,
                })
            }else{
                notification.error({
                    message:"Error",
                    description:"Connection Failed",
                    style:{width:'200px'},
                })
            }
        })
    }
    function handleCancelConnection() {
        dispatch(setStoreSelectedAddEditDataSourceType(0));
    }


    return <div className="datasource-connection-jdbc-segment">
        <Form name="jdbc-connection-form" className="datasource-connection-jdbc-form" onFinish={handleTestConnection} layout="vertical">
            <List>
                {
                    Object.keys(storeJdbcProperties).map(e => (
                        <Form.Item className="form-left" label={storeJdbcProperties[e].propertyLabel + ":"} required={storeJdbcProperties[e].isRequired === "true" ? true : false} name={storeJdbcProperties[e].propertyName}>
                            <List.Item style={{ border: 'none', margin: '0px', padding: '0px' }}>
                                {
                                    {
                                        'Input': <><Input autoComplete="off"
                                            disabled={!storeJdbcProperties[e].isActive}
                                            placeholder={storeJdbcProperties[e].example}
                                            className="jdbc-connection-user-input" /><span className="property-description">{storeJdbcProperties[e].propertyDescription}</span></>,

                                        'TextArea': <><TextArea
                                            disabled={!storeJdbcProperties[e].isActive}
                                            placeholder={storeJdbcProperties[e].example}
                                            className="jdbc-connection-user-text"></TextArea><span className="property-description">{storeJdbcProperties[e].propertyDescription}</span></>,

                                        'Input.Password': <><Input.Password
                                            autoComplete="off"
                                            disabled={!storeJdbcProperties[e].isActive}
                                            placeholder={storeJdbcProperties[e].example}
                                            className="jdbc-connection-user-password"></Input.Password><span className="property-description">{storeJdbcProperties[e].propertyDescription}</span></>,

                                        'InputNumber': <><InputNumber
                                           
                                            disabled={!storeJdbcProperties[e].isActive}
                                            placeholder={storeJdbcProperties[e].example}
                                            className="jdbc-connection-user-number"></InputNumber><span className="property-description">{storeJdbcProperties[e].propertyDescription}</span></>
                                    }[storeJdbcProperties[e].dataType]
                                }
                            </List.Item>
                        </Form.Item>

                    ))
                }

            </List>
            <div className="form-buttons">
                <Form.Item>
                    <button className='datasource-connection-test-connection-button' type='submit'>Test Connection</button>
                    <button className='datasource-connection-cancel-button' onClick={() => handleCancelConnection()}>Cancel</button>
                </Form.Item>
            </div>
        </Form>
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