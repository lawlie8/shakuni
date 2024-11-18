import { Button, Flex, Form, Input, InputNumber, List } from "antd";
import './datasource-jdbc-connection.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
export default function DataSourceJdbcConnection({ jdbcProperties }) {

    let storeJdbcProperties = useSelector((state) => state.dataSource.selectedDataSourceProperties)
    const [jdbcPropertiesList, setJdbcPropertiesList] = useState(storeJdbcProperties);

    useEffect(() => {
        handleTestConnection()
    }, [])

    function handleTestConnection() {
        let entries = Object.entries(jdbcPropertiesList);
        entries.sort(([, a], [, b]) => Number(a.ordinal) - Number(b.ordinal));
        setJdbcPropertiesList(Object.fromEntries(entries));
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
        <Form className="datasource-connection-jdbc-form" onFinish={handleTestConnection} layout="vertical">
            <List>
                {
                    Object.keys(jdbcPropertiesList).map(e => (
                        <List.Item style={{ border: 'none', margin: '0px' }}>
                            <Form.Item className="form-left" label={jdbcPropertiesList[e].propertyLabel} name={jdbcPropertiesList[e].propertyName}>
                                {
                                    {
                                        'Input': <Input placeholder={jdbcPropertiesList[e].example} className="jdbc-connection-user-input"></Input>,
                                        'TextArea': <TextArea placeholder={jdbcPropertiesList[e].example} className="jdbc-connection-user-text"></TextArea>,
                                        'Input.Password': <Input.Password placeholder={jdbcPropertiesList[e].example} className="jdbc-connection-user-password"></Input.Password>,
                                        'InputNumber': <InputNumber placeholder={jdbcPropertiesList[e].example} className="jdbc-connection-user-number"></InputNumber>
                                    }[jdbcPropertiesList[e].dataType]
                                }
                            </Form.Item>
                        </List.Item>
                    ))
                }
            </List>

        </Form>
        <div className="datasource-connection-extra">
            Add Some Extra Card Shit here
        </div>
    </div>
}