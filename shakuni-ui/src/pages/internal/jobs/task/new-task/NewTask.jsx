import { Col, Form, Input, Modal, notification, Row, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { setIsNewTaskModalOpen, setTasks } from "../../JobSlice"
import TextArea from "antd/es/input/TextArea"
import { ConsoleSqlOutlined, NotificationOutlined, UploadOutlined } from "@ant-design/icons"
import { useState } from "react"
import { createNewTask, fetchTasksByJobId } from "../../jobs-service"

export default function NewTask({ params }) {

    const isNewTaskModalOpen = useSelector((state) => state.jobStore.isNewTaskModalOpen)
    const jobObject = useSelector((state) => state.jobStore.selectedJobItem)
    const [isSelected, setIsSelected] = useState("")
    const tasksList = useSelector((state) => state.jobStore.taskList)

    const dispatch = useDispatch();

    function handleCancel() {
        dispatch(setIsNewTaskModalOpen(false));
    }

    function CreateNewTask(value) {
        if (jobObject.id !== undefined || isSelected !== "") {
            value.jobId = jobObject.id;
            value.taskType = isSelected;

            createNewTask(value).then((response) => {
                if (response.status === 200 && response.data === true) {
                    notification.success({
                        message: "Success",
                        description: "Task Created",
                        duration: 1,
                        style: { width: '250px' }
                    })
                    dispatch(setIsNewTaskModalOpen(false));
                    fetchTasksByJobId(value.jobId).then((response) => {
                        dispatch(setTasks(response.data))
                    })
                } else {
                    notification.error({
                        message: "Error",
                        description: "Task Creation Failed",
                        duration: 1,
                        style: { width: '250px' }
                    })
                }
            })
        } else {
            notification.warning({
                message: "Attributes Missing",
                description: "Some Attributes Required To Create Task Are Missing",
                duration: 1,
                style: { width: '250px' }
            })
        }
    }

    function selectType(value) {
        setIsSelected(value);
    }

    return <div className="new-task">
        <Modal title="Create New Task" open={isNewTaskModalOpen} footer={<></>} onCancel={handleCancel}>
            <Form name="form" layout="vertical" onFinish={CreateNewTask}>
                <Form.Item label="Name" rules={[{ required: true, message: 'Please Enter Task Name' }]} name="TaskName" >
                    <Input type="text" placeholder="Task Name" />
                </Form.Item>
                <Form.Item label="Description" rules={[{ required: false, max: 200, message: 'Please Enter Description' }]} name="description" >
                    <TextArea rows={1} type="text" placeholder="Task Description" />
                </Form.Item>

                <Row style={{ width: '100%' }} justify='end'>
                    <Col span={12}  >
                        <ConsoleSqlOutlined className="new-task-logo" onClick={() => selectType("SQL")} style={{ backgroundColor: isSelected === "SQL" ? '#dfdfdf' : 'white' }} />
                    </Col>

                    <Col span={12}  >
                        <UploadOutlined className="new-task-logo" onClick={() => selectType("FILE")} style={{ backgroundColor: isSelected === "FILE" ? '#dfdfdf' : 'white' }} />
                    </Col>
                </Row>

                <Form.Item>
                    <button style={{ float: 'right', marginTop: '30px' }} type="primary">
                        Submit
                    </button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}