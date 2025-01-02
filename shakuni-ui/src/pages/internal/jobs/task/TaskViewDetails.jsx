import { Col, Row, Select } from "antd";
import './task.css';
import { useEffect, useState } from "react";
import { DeleteFilled, DeleteOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../config/user-settings/user-setting-service";
import { setAllUsers } from "../../config/user-settings/UserSettingSlice";
export default function TaskViewDetails({ params }) {
    const jobItem = useSelector((state) => state.jobStore.selectedJobItem);
    const [jobDetails, setJobDetails] = useState([]);
    const dispatch = useDispatch();
    const [selectedUserOptions, setSelectedUserOptions] = useState([]);
    const [currentTask, setCurrentTask] = useState(undefined);

    const tasksList = useSelector((state) => state.jobStore.taskList)
    const selectedTaskId = useSelector((state) => state.jobStore.selectedTaskId)

    useEffect(() => {
        getAllUsers().then((response) => {
            setSelectedUserOptions([])
            response.data.map((item) => {
                setSelectedUserOptions(x => [...x,
                {
                    value: item.id,
                    label: item.userName
                }])
            })
            dispatch(setAllUsers(response.data))
        })
    }, [])

    useEffect(() => {
        setCurrentTask(tasksList.find((x) => x.id === selectedTaskId))
        console.log(currentTask);

    }, [selectedTaskId])

    useEffect(() => {
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
    }, [jobItem])


    function handleJobShareUpdate() {
        console.log("Updating Job Share Value", jobId);
    }

    return <div className="task-view-details">
        <h3 style={{ textAlign: 'start' }}>Job Details</h3>
        <Row style={{ width: '100%', textAlign: 'start', color: 'black' }}>
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
                        (selectedUserOptions.length === 0 && jobDetails.length === 0) ? <SyncOutlined spin />
                            :
                            <Select
                                placeholder={"Select User"}
                                suffixIcon={<UserOutlined style={{ color: 'black' }} />}
                                defaultValue={[]}
                                mode="multiple"
                                style={{ width: '100%' }}
                                options={selectedUserOptions} />
                    }

                </Col>
                <Col style={{ position: 'relative' }} span={6} offset={18}>
                    <button className='task-back-button' style={{ width: '100%', marginTop: '10px' }} onClick={() => handleJobShareUpdate()}>Share</button>
                </Col>
            </Row>
        </div>

        <div className="current-task-details" style={{ overflow: 'scroll', marginTop: '20px' }}>
            <Row style={{ width: '100%', textAlign: 'start', color: 'black' }}>
                <Col span={12}>
                    <h3 style={{ textAlign: 'start' }}>{currentTask?.taskName}</h3>
                </Col>
                <Col span={2} offset={10}>
                    <DeleteFilled style={{ fontSize: '25px', top: '50%', transform: 'translateY(-50%)', position: 'relative', color: 'red' }} />
                </Col>
            </Row>
            <Row style={{ width: '100%', textAlign: 'start', color: 'black' }}>
                <Col span={12} style={{ borderBottom: '1px solid #dfdfdf', fontWeight: "600" }}>
                    {"Type"}
                </Col>
                <Col span={12} style={{ borderBottom: '1px solid #dfdfdf', fontWeight: "600" }}>
                    {currentTask?.taskTypeEnum}
                </Col>

                <Col span={12} style={{ borderBottom: '1px solid #dfdfdf', fontWeight: "600" }}>
                    {"Date"}
                </Col>
                <Col span={12} style={{ borderBottom: '1px solid #dfdfdf', fontWeight: "600" }}>
                    {currentTask?.taskCreationDate === undefined ? "" : new Date(currentTask?.taskCreationDate).toISOString().split("T")[0]}
                </Col>
                <Col span={12} style={{ borderBottom: '1px solid #dfdfdf', fontWeight: "600" }}>
                    {"Time"}
                </Col>
                <Col span={12} style={{ borderBottom: '1px solid #dfdfdf', fontWeight: "600" }}>
                    {currentTask?.taskCreationDate === undefined ? "" : new Date(currentTask?.taskCreationDate).toTimeString().split(" ")[0]}
                </Col>
                <Col span={12} style={{ borderBottom: '1px solid #dfdfdf', fontWeight: "600" }}>
                    {"File Name"}
                </Col>
                <Col span={12} style={{ borderBottom: '1px solid #dfdfdf', fontWeight: "600" }}>
                    {currentTask?.filePath.split("\\").pop()}
                </Col>
                <Col span={12} style={{ borderBottom: '1px solid #dfdfdf', fontWeight: "600" }}>
                    {"Created By"}
                </Col>
                <Col span={12} style={{ borderBottom: '1px solid #dfdfdf', fontWeight: "600" }}>
                    {currentTask?.createdBy}
                </Col>
            </Row>

        </div>
    </div>
}