import { Col,Row, Select } from "antd";
import './task.css';
import {useEffect, useState } from "react";
import { SyncOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../config/user-settings/user-setting-service";
import { setAllUsers } from "../../config/user-settings/UserSettingSlice";
export default function TaskViewDetails({ params }) {
    const allUserInfo = useSelector((state)=>state.userStoreSetting.allUsers);
    const jobItem = useSelector((state)=>state.jobStore.selectedJobItem);
    const [jobDetails, setJobDetails] = useState([]);
    const dispatch = useDispatch();
    const [selectedUserOptions, setSelectedUserOptions] = useState([]);

    useEffect(()=>{
        getAllUsers().then((response) => {
        }).catch((e)=>{
            console.log(e);
        }).finally(()=>{
            dispatch(setAllUsers(response.data))
        })

        setSelectedUserOptions([]);

        allUserInfo.map((item)=>{
            setSelectedUserOptions(x=>[...x,
                {
                value:item.id,
                label:item.userName
            }])
        })
    },[])

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
        //Fetch Tasks here
    },[jobItem])


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
                    {
                        selectedUserOptions.length === 0 ? <SyncOutlined spin/>
                        :
                        <Select
                        suffixIcon={<UserOutlined style={{color:'black'}} />}
                        defaultValue={[jobItem?.createdBy]}
                        mode="multiple"
                        style={{ width: '100%' }}
                        options={selectedUserOptions} />
                    }

                </Col>
                <Col style={{position:'relative'}} span={6} offset={18}>
                    <button className='task-back-button' style={{width:'100%',marginTop:'10px'}} onClick={()=>handleJobShareUpdate()}>Share</button>
                </Col>
            </Row>

        </div>
    </div>
}