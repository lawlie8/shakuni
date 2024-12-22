import { Col,Row, Select } from "antd";
import './task.css';
import {useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
export default function TaskViewDetails({ params }) {

    const jobItem = useSelector((state)=>state.jobStore.selectedJobItem);
    const [jobDetails, setJobDetails] = useState([])

    useEffect(()=>{        
        setJobDetails([
            {
                key: "Id",
                value: jobItem?.id
            },
            {
                key: "Name",
                value: jobItem?.jobName
            },
            {
                key: "Tasks",
                value: "2"
            },
            {
                key: "Owner",
                value: jobItem?.createdBy
            }
        ])
    },[jobItem])

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



    function handleJobShareUpdate(){
        console.log("Updating Job Share Value",jobId);
    }

    return <div className="task-view-details">
        <h3 style={{ textAlign: 'start' }}>Job Details</h3>
        <Row style={{ width: '100%', textAlign: 'start',color:'black' }}>
            {
                jobDetails.map((item) => (
                    <Col span={24} style={{ borderBottom: '1px solid #dfdfdf', fontWeight: "600" }}>
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
            <h3 style={{ textAlign: 'start' }}>Share Job With</h3>
            <Row>
                <Col span={24}>
                    <Select
                        suffixIcon={<UserOutlined style={{color:'black'}} />}
                        defaultValue={['admin@lawlie8.org']}
                        mode="multiple"
                        style={{ width: '100%' }}
                        options={selectUserOptions} />
                </Col>
                <Col style={{position:'relative'}} span={24}>
                    <button style={{width:'100%',marginTop:'10px'}} onClick={()=>handleJobShareUpdate()}>Share</button>
                </Col>
            </Row>

        </div>
    </div>
}