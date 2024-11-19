import { Button, Card, Flex, Form, Input, InputNumber, List } from "antd";
import './datasource-jdbc-connection.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import Meta from "antd/es/card/Meta";
export default function DataSourceJdbcConnection({ jdbcProperties }) {

    let storeJdbcProperties = useSelector((state) => state.dataSource.selectedDataSourceProperties)
    const [jdbcPropertiesList, setJdbcPropertiesList] = useState(storeJdbcProperties);

    useEffect(() => {
        sortPropertiesPerOrdinal()
    }, [])

    function sortPropertiesPerOrdinal() {
        let entries = Object.entries(jdbcPropertiesList);
        entries.sort(([, a], [, b]) => Number(a.ordinal) - Number(b.ordinal));
        setJdbcPropertiesList(Object.fromEntries(entries));
    }

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
                    Object.keys(jdbcPropertiesList).map(e => (
                        <List.Item style={{ border: 'none', margin: '0px' }}>
                            <Form.Item className="form-left" label={jdbcPropertiesList[e].propertyLabel} name={jdbcPropertiesList[e].propertyName}>
                                {
                                    {
                                        'Input': <Input required={jdbcPropertiesList[e].isRequired}
                                            disabled={!jdbcPropertiesList[e].isActive}
                                            placeholder={jdbcPropertiesList[e].example}
                                            className="jdbc-connection-user-input"></Input>,

                                        'TextArea': <TextArea
                                            required={jdbcPropertiesList[e].isRequired}
                                            disabled={!jdbcPropertiesList[e].isActive}
                                            placeholder={jdbcPropertiesList[e].example}
                                            className="jdbc-connection-user-text"></TextArea>,

                                        'Input.Password': <Input.Password
                                            required={jdbcPropertiesList[e].isRequired}
                                            disabled={!jdbcPropertiesList[e].isActive}
                                            placeholder={jdbcPropertiesList[e].example}
                                            className="jdbc-connection-user-password"></Input.Password>,

                                        'InputNumber': <InputNumber
                                            required={jdbcPropertiesList[e].isRequired}
                                            disabled={!jdbcPropertiesList[e].isActive}
                                            placeholder={jdbcPropertiesList[e].example}
                                            className="jdbc-connection-user-number"></InputNumber>
                                    }[jdbcPropertiesList[e].dataType]
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