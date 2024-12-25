import { Col, Form, Input, Modal, Row, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { setIsNewTaskModalOpen } from "../../JobSlice"
import TextArea from "antd/es/input/TextArea"
import { ConsoleSqlOutlined, UploadOutlined } from "@ant-design/icons"

export default function NewTask({params}){

    const isNewTaskModalOpen = useSelector((state) => state.jobStore.isNewTaskModalOpen)

    const dispatch = useDispatch();

    function handleCancel(){
        dispatch(setIsNewTaskModalOpen(false));
    }

    function CreateNewTask(value){
        console.log(value);
        
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

                <Row style={{width:'100%'}} justify='end'>
                    <Col span={12}>
                        <ConsoleSqlOutlined className="new-task-logo" />
                    </Col>

                    <Col span={12}>
                        <UploadOutlined  className="new-task-logo" />
                    </Col>
                </Row>

                <Form.Item>
                    <button style={{ float: 'right',marginTop:'30px' }} type="primary">
                        Submit
                    </button>
                </Form.Item>
            </Form>   
            </Modal>
    </div>
}