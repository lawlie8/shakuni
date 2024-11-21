import { Card, Form, Input, InputNumber, List } from "antd";
import './datasource-jdbc-connection.css';
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import Meta from "antd/es/card/Meta";
export default function DataSourceJdbcConnection({ jdbcProperties }) {

    let storeJdbcProperties = useSelector((state) => state.dataSource.selectedDataSourceProperties)


    function handleTestConnection(values){
        console.log(values);
    }

    // LEFT  <tr><td>LEFT</td> 
    // RIGHT <td>RIGHT</td></tr>
    // LEFT  <tr><td>LEFT</td>
    // RIGHT <td>RIGHT</td></tr>
    // LEFT  <tr><td>LEFT</td><td></td></tr>
    // LEFT  <tr><td>LEFT</td>
    // RIGHT <td>RIGHT</td></tr>
    // RIGHT <tr><td></td><td>RIGHT</td></tr> 


    // <input type={jdbcPropertiesList[e].dataType} placeholder={jdbcPropertiesList[e].propertyLabel} className="jdbc-connection-user-input"></input>

    return <div className="datasource-connection-jdbc-segment">
        <Form name="jdbc-connection-form" className="datasource-connection-jdbc-form" onFinish={()=>handleTestConnection(values)} layout="vertical">
            <List>
                {
                    Object.keys(storeJdbcProperties).map(e => (
                        <List.Item style={{ border: 'none', margin: '0px' }}>
                            <Form.Item className="form-left" label={storeJdbcProperties[e].propertyLabel + ":"} name={storeJdbcProperties[e].propertyName}>
                                {
                                    {
                                        'Input': <><Input required={Boolean(storeJdbcProperties[e].isRequired)}
                                            disabled={!storeJdbcProperties[e].isActive}
                                            placeholder={storeJdbcProperties[e].example}
                                            className="jdbc-connection-user-input"></Input><span className="property-description">{storeJdbcProperties[e].propertyDescription}</span></> ,

                                        'TextArea': <><TextArea
                                            required={Boolean(storeJdbcProperties[e].isRequired)}
                                            disabled={!storeJdbcProperties[e].isActive}
                                            placeholder={storeJdbcProperties[e].example}
                                            className="jdbc-connection-user-text"></TextArea><span className="property-description">{storeJdbcProperties[e].propertyDescription}</span></>,

                                        'Input.Password': <><Input.Password
                                            required={Boolean(storeJdbcProperties[e].isRequired)}
                                            disabled={!storeJdbcProperties[e].isActive}
                                            placeholder={storeJdbcProperties[e].example}
                                            className="jdbc-connection-user-password"></Input.Password><span className="property-description">{storeJdbcProperties[e].propertyDescription}</span></>,

                                        'InputNumber': <><InputNumber
                                            required={Boolean(storeJdbcProperties[e].isRequired)}
                                            disabled={!storeJdbcProperties[e].isActive}
                                            placeholder={storeJdbcProperties[e].example}
                                            className="jdbc-connection-user-number"></InputNumber><span className="property-description">{storeJdbcProperties[e].propertyDescription}</span></>
                                    }[storeJdbcProperties[e].dataType]
                                }
                            </Form.Item>
                        </List.Item>
                    ))
                }
            </List>

        </Form>
        <div className="datasource-connection-extra">
            <List>
                <List.Item>
                    <Card size="small" style={{width: 200,boxShadow:'0px 0px 5px gray'}} cover={<img alt="example" src="/misc/jdbc-connection-card-1.jpg"></img>}>
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