import { Col, Descriptions, Row, Select } from "antd";
import './task.css';
import { useState } from "react";
export default function TaskViewDetails({ params }) {


    const [jobDetails, setJobDetails] = useState([
        {
            key:"Job Name",
            value:"Testing 1"
        },
        {
            key:"Tasks",
            value:"2"
        },
        {
            key:"Owner",
            value:"admin@lawlie8.org"
        }
    ])

    const items = [
        {
            key: '1',
            label: 'Name',
            children: 'Job Name',
            span: 3,
        },
        {
            key: '2',
            label: 'Total Tasks',
            children: '2',
            span: 3,
        },
        {
            key: '3',
            label: 'Owner',
            children: 'admin@lawlie8.org',
            span: 3,
        },]

    const selectUserOptions = [
        {
            label: 'admin@lawlie8.org',
            value: 'admin@lawlie8.org'
        },
        {
            label: 'test@gmail.com',
            value: 'test@gmail.com'
        },
        {
            label: 'admin@lawlie8.org',
            value: 'lawlie8'
        }
    ]
    return <div className="task-view-details">
        <h3 style={{textAlign:'start'}}>Job Details</h3>
        <Row style={{ width: '100%',textAlign:'start' }}>
            {
                jobDetails.map((item) => (
                    <Col span={24} style={{borderBottom:'1px solid #dfdfdf',fontWeight:"600"}}>
                        <Row>
                            <Col span={12}>
                                {item.key}
                            </Col>
                            <Col span={12}>
                                {item.value}
                            </Col>
                        </Row>
                    </Col>

                ))
            }
        </Row>
        <div className="user-share-details">
            <h3 style={{textAlign:'start'}}>Share Options</h3>
            <Select
                defaultValue={['admin@lawlie8.org']}
                mode="multiple"
                style={{ width: '100%' }}
                options={selectUserOptions} />
        </div>
    </div>
}