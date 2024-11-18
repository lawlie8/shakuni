import { Button, Flex, Form, Input, InputNumber, List } from "antd";
import './datasource-jdbc-connection.css';
import { useState } from "react";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
export default function DataSourceJdbcConnection({ jdbcProperties }) {

    let storeJdbcProperties = useSelector((state) => state.dataSource.selectedDataSourceProperties)
    const [jdbcPropertiesList, setJdbcPropertiesList] = useState(storeJdbcProperties);

    function handleTestConnection() {
        console.log("jdbc", storeJdbcProperties)

        let entries = Object.entries(jdbcPropertiesList);

        entries.sort(([, a], [, b]) => Number(a.ordinal) - Number(b.ordinal));
        setJdbcPropertiesList(Object.fromEntries(entries));

        Object.keys(jdbcPropertiesList).map(e => {
            console.log(e);

        });


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
        <Form onFinish={handleTestConnection} layout="vertical">
            <List >
                    {
                        Object.keys(jdbcPropertiesList).map(e => (
                            jdbcPropertiesList[e].position === "LEFT" ?
                            <List.Item style={{border:'none'}}>

                                        <Form.Item className="form-left" label={jdbcPropertiesList[e].propertyLabel} name={jdbcPropertiesList[e].propertyName}>
                                            {
                                                {
                                                    'Input': <Input placeholder={jdbcPropertiesList[e].propertyLabel} className="jdbc-connection-user-input"></Input>,
                                                    'TextArea': <TextArea placeholder={jdbcPropertiesList[e].propertyLabel} className="jdbc-connection-user-text"></TextArea>,
                                                    'Input.Password': <Input.Password placeholder={jdbcPropertiesList[e].propertyLabel} className="jdbc-connection-user-password"></Input.Password>,
                                                    'InputNumber': <InputNumber placeholder={jdbcPropertiesList[e].propertyLabel} className="jdbc-connection-user-number"></InputNumber>
                                                }[jdbcPropertiesList[e].dataType]
                                            }
                                        </Form.Item>
                            </List.Item>
                                        :<span style={{display:'none'}}/>

                        ))
                    }
                
                
                    {
                        Object.keys(jdbcPropertiesList).map(e => (
                            jdbcPropertiesList[e].position === "RIGHT" ?
                            <List.Item  style={{border:'none'}}>
                                        <Form.Item className="form-left" label={jdbcPropertiesList[e].propertyLabel} name={jdbcPropertiesList[e].propertyName}>
                                            {
                                                {
                                                    'Input': <Input placeholder={jdbcPropertiesList[e].propertyLabel} className="jdbc-connection-user-input"></Input>,
                                                    'TextArea': <TextArea placeholder={jdbcPropertiesList[e].propertyLabel} className="jdbc-connection-user-text"></TextArea>,
                                                    'Input.Password': <Input.Password placeholder={jdbcPropertiesList[e].propertyLabel} className="jdbc-connection-user-password"></Input.Password>,
                                                    'InputNumber': <InputNumber placeholder={jdbcPropertiesList[e].propertyLabel} className="jdbc-connection-user-number"></InputNumber>
                                                }[jdbcPropertiesList[e].dataType]
                                            }
                                        </Form.Item>
                            </List.Item>
                                        : <span style={{display:'none'}}/>

                        ))
                    }
            </List>

        </Form>

    </div>
}