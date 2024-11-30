import { DeleteFilled, DeleteOutlined, DownOutlined, LoadingOutlined, MoreOutlined, PlusCircleOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import './user-setting.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers, getAllUserRoleOptions } from "./user-setting-service";
import { setStoreSelectedUserSetting } from "./UserSettingSlice";
import { Avatar, Breadcrumb, Button, Col, Divider, Dropdown, Form, Input, List, Row, Select, Space, Tooltip, Upload } from "antd";
export default function UserSetting(params = { params }) {

    const [allUserInfo, setAllUserInfo] = useState([])
    const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: (<><UserOutlined style={{ color: 'black' }} onClick={() => { handleBreadCrumbUserConfigureClick() }} /></>) }]);
    const [activeId, setActiveId] = useState(null)
    const [newUserFormActive, setNewUserFormActive] = useState(false)
    const [roleOptions, setRoleOptions] = [];
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const dispatch = useDispatch();
    const uploadButton = (
        <button style={{ border: 0, background: 'none',color:'black' }} type="button">
          {loading ? <LoadingOutlined /> : <PlusCircleOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      );
    useEffect(() => {
        getAllUsers().then((response) => {
            setAllUserInfo(response.data)
        })
        getAllUserRoleOptions().then((response) => {
            setRoleOptions(response.data)
        })

    }, [])

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    function handleNewUserFormActive() {
        setNewUserFormActive(!newUserFormActive)
    }


    function handleActiveId(id) {
        setActiveId((prevSelected) => (prevSelected === id ? null : id));
    }

    function handleNewUserFormComplete(values) {

    }

    function beforeUpload(){

    }

    function handleImageChange(){

    }

    return <div className="user-main">
        <h2 className='user-headline'><UserOutlined /> User Settings</h2>
        <div className='user-type-segment'>
            <Breadcrumb className='users-configured-segment-breadcrumb'
                items={breadCrumbItems}
            />
            <Divider style={{ width: 'calc(100% - 20px)', marginTop: '20px', borderColor: 'lightgray' }} />

            <List className='configured-user-list' >
                <div className="user-search-div">
                    <Row style={{ width: '100%' }} justify={"space-between"}>
                        <Col span={8} >
                            <Space.Compact size="medium" style={{ float: 'left' }}>
                                <Input addonBefore={<SearchOutlined />} placeholder="Search User" />
                            </Space.Compact>
                        </Col>
                        <Col span={8} offset={8}>
                            <button className="new-user-button" type="primary" iconPosition={"start"} style={{ backgroundColor: newUserFormActive === true ? 'gray' : 'black' }} onClick={() => handleNewUserFormActive()}><PlusCircleOutlined /> New User</button>
                        </Col>
                    </Row>
                </div>
                {
                    allUserInfo?.map((item) => (
                        <List.Item style={{ border: '1px solid gray', boxShadow: '0px 0px 1px 0px gray', borderRadius: '10px', minHeight: '70px', padding: '0px', position: 'relative', display: 'inline-block' }} key={item.id} className='configured-user-list-item'>
                            <Row style={{ backgroundColor: 'white', minHeight: '70px', margin: '0px', top: '0px', width: '100%', borderRadius: '10px' }}>
                                <Col span={24} style={{ height: '70px', display: 'flex' }}>
                                    <Row style={{ display: 'flex', width: '100%' }} justify={"space-between"}>
                                        <Col span={1}>
                                            <Avatar className="header-user-logo-avatar" size={40} style={{ backgroundColor: 'purple' }}>{item.userName?.toUpperCase()[0]}</Avatar>
                                        </Col>
                                        <Col span={3} className="header-user-user-name">
                                            <h3>{item.userName}</h3>
                                        </Col>
                                        <Col span={1} offset={19}>
                                            <div className="user-icons">
                                                <Row style={{ width: '100%' }}>
                                                    <Col span={24}>
                                                        <PlusCircleOutlined onClick={() => handleActiveId(item.id)} style={{ fontSize: '20px', marginRight: '5px', borderRadius: '100%', padding: '10px', alignContent: 'center', boxShadow: ' 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)', transform: activeId === item.id ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}></PlusCircleOutlined>
                                                    </Col>
                                                </Row>
                                            </div>

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row key={item.id} style={{ backgroundColor: 'white', overflow: 'hidden', marginTop: activeId === item.id ? '2px' : '0px', width: '100%', borderRadius: '10px', transition: "height 0.3s ease", height: activeId === item.id ? '90vh' : '0px' }}>
                                <Col span={24}>
                                    <div className="user-detail">
                                        <Row style={{ width: '100%', height: '50px' }} justify={'space-between'}>
                                            <Col span={8} offset={16}>
                                                <button style={{ float: 'right', margin: '10px', backgroundColor: '#d43838', filter: item.defaultUser ? 'grayscale(1)' : 'none' }}>
                                                    <Tooltip title={item.defaultUser ? "User Cannot be Deleted" : "Delete User"} placement={"topLeft"}>
                                                        <DeleteOutlined style={{ fontSize: '17px' }} />
                                                    </Tooltip>

                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>

                        </List.Item>
                    ))
                }
                <List.Item>
                    <Row style={{ border: '1px solid gray', overflowY: newUserFormActive === true ? 'scroll' : 'hidden', boxShadow: newUserFormActive === true ? '0px 0px 1px 0px gray' : 'none', overflow: 'hidden', marginTop: '0px', width: '100%', borderRadius: '10px', transition: "height 0.3s ease", height: newUserFormActive === true ? '70vh' : '0px' }}>
                        <Col span={24}>
                            <div className="user-detail">
                                <h3>Add New User</h3>
                                <Divider />

                                <Form onFinish={() => handleNewUserFormComplete()} layout="vertical">

                                    <Row className="user-form-row" >
                                        <Col span={24} className="user-form-col">
                                            <Upload
                                            name="avatar"
                                            listType="picture-circle"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                            beforeUpload={beforeUpload}
                                            onChange={handleImageChange}
                                          >
                                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                          </Upload>
                                          <div className="form-description">
                                                <p>Upload Profile Image</p>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="user-form-row" >
                                        <Col span={24} className="user-form-col">
                                            <Form.Item label="Name" required={true}>
                                                <Input type="text" placeholder="ex. Alexander"></Input>
                                            </Form.Item>
                                            <div className="form-description">
                                                <p>Enter Your Name</p>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="user-form-row">
                                        <Col span={24} className="user-form-col">
                                            <Form.Item label="Last Name" required={true}>
                                                <Input type="text" placeholder="ex. Hamilton"></Input>
                                            </Form.Item>
                                            <div className="form-description">
                                                <p>Enter Your Last Name</p>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="user-form-row">
                                        <Col span={24} className="user-form-col">
                                            <Form.Item label="Email" required={true}>
                                                <Input type="email" placeholder="ex. alexander.hamilton@broadway.com"></Input>
                                            </Form.Item>
                                            <div className="form-description">
                                                <p>Enter Your Email</p>
                                            </div>
                                        </Col>
                                    </Row>


                                    <Row className="user-form-row" justify={'space-between'}>
                                        <Col span={11} className="user-form-col" style={{ float: 'left', position: 'relative' }}>
                                            <Form.Item label="Password" required={true}>
                                                <Input type="password" placeholder="ex. U=/8!zLm*a}9Pv-RtBb$+F"></Input>
                                            </Form.Item>
                                            <div className="form-description">
                                                <p>Enter Secured Password</p>
                                            </div>
                                        </Col>
                                        <Col span={11} offset={2} className="user-form-col">
                                            <Form.Item label="ReType Password" required={true}>
                                                <Input type="password" placeholder="ex. U=/8!zLm*a}9Pv-RtBb$+F"></Input>
                                            </Form.Item>
                                            <div className="form-description">
                                                <p>Re Enter Secured Password</p>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="user-form-row" >
                                        <Col span={24} className="user-form-col">
                                            <Form.Item label="Role" required={true}>
                                                <Select
                                                    mode="multiple"
                                                    allowClear
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    placeholder="select Roles"
                                                    defaultValue={['ROLE_USER']}
                                                    onChange={handleChange}
                                                    options={roleOptions}
                                                >

                                                </Select>
                                            </Form.Item>
                                            <div className="form-description">
                                                <p>Enter User Roles</p>
                                            </div>
                                        </Col>
                                    </Row>

                                </Form>
                            </div>
                        </Col>
                    </Row>
                </List.Item>
            </List>
        </div>
    </div>
}