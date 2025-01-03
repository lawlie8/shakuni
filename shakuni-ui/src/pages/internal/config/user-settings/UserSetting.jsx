import { DeleteFilled, DeleteOutlined, DownOutlined, LoadingOutlined, MoreOutlined, PlusCircleOutlined, SaveOutlined, SearchOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import './user-setting.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers, getAllUserRoleOptions, getAllPermissionOptions, getAllPermissionOptionsByRoleName, saveUser } from "./user-setting-service";
import { setAllUsers, setStoreAllRoles, setStorePermissionOptions, setStoreSelectedUserSetting } from "./UserSettingSlice";
import { Avatar, Breadcrumb, Button, Col, Divider, Dropdown, Form, Input, List, notification, Radio, Row, Select, Space, Tooltip, Upload } from "antd";
import UserDetails from "./user-details/UserDetails";
export default function UserSetting(params = { params }) {

    const allUserInfo = useSelector((state)=>state.userStoreSetting.allUsers);
    const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: (<><UserOutlined style={{ color: 'black' }} onClick={() => { handleBreadCrumbUserConfigureClick() }} /></>) }]);
    const [activeId, setActiveId] = useState(null)
    const [newUserFormActive, setNewUserFormActive] = useState(false)
    const [roleOptions, setRoleOptions] = useSelector((state)=> state.userStoreSetting.allRoles);
    const permissionOptions =  useSelector((state)=>state.userStoreSetting.allPermissionOptions);
    const [defaultRoleOptions, setDefaultRoleOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [customRole, setCustomRole] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");

    const [apiLoaded, setApiLoaded] = useState(false);

    const [imageUrl, setImageUrl] = useState("");
    const dispatch = useDispatch();

    const uploadButton = (
        <button style={{ border: 0, background: 'none', color: 'black' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusCircleOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    useEffect(() => {
        getAllUsers().then((response) => {
            dispatch(setAllUsers(response.data))
        })

        getAllUserRoleOptions().then((response) => {
            let userAr = [];
            dispatch(setStoreAllRoles([]))
            response.data.map((item) => {
                userAr.push( {
                    value: item.roleName,
                    label: item.roleName
                });
            })
            dispatch(setStoreAllRoles(userAr))
        })

        getAllPermissionOptions().then((response) => {
            let permissionAr = [];

            dispatch(setStorePermissionOptions([]))
            response.data.map((item) => {
                permissionAr.push({
                    value: item.permissionName,
                    label: item.permissionName
                })
            })
            dispatch(setStorePermissionOptions(permissionAr))

        })

        setApiLoaded(true);

    }, [])

    const handleChange = (value) => {
        setSelectedRole(value)
        //Fetch Role Permission Based On User Role
        //and add to default values of Select Permission List
        getAllPermissionOptionsByRoleName(value).then((response) => {
            setDefaultRoleOptions([]);
            response.data.map((item) => {
                setDefaultRoleOptions(arr => [...arr, { value: item.id, label: item.permissionName }]);
            })
        })

    };

    function handleNewUserFormActive() {
        setNewUserFormActive(!newUserFormActive)
    }


    function handleActiveId(id) {
        setActiveId((prevSelected) => (prevSelected === id ? null : id));
    }

    function handleNewUserFormComplete(values) {
        values.customRole = customRole;
        if (customRole === false) {
            values.permissionList = [];
            values.role = selectedRole;
        }

        if (customRole === true && values.permissionList.length === 0) {
            notification.error({
                message: 'Error',
                description: 'Permission List Cannot be Empty',
                duration: 1,
                style: { width: '250px' }
            })
        } else {
            saveUser(values).then((response) => {
                if (response.status === 200) {
                    notification.success({
                        message: 'Sucess',
                        description: 'User Saved',
                        duration: 2,
                        style: { width: '250px' }
                    })
                }
            })
        }

    }

    function beforeUpload() {

    }

    function handleImageChange() {

    }

    function handleCustomRoleAction() {
        setCustomRole(!customRole)
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
                                                        <PlusCircleOutlined onClick={() => handleActiveId(item.id)} style={{ display:item.defaultUser ? 'none' : '', fontSize: '20px', marginRight: '5px', borderRadius: '100%', padding: '10px', alignContent: 'center', boxShadow: ' 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)', transform: activeId === item.id ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}></PlusCircleOutlined>
                                                    </Col>
                                                </Row>
                                            </div>

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row key={item.id} style={{ backgroundColor: 'white', overflow: 'auto', marginTop: activeId === item.id ? '2px' : '0px', width: '100%', borderRadius: '10px', transition: "height 0.3s ease", height: activeId === item.id ? '90vh' : '0px' }}>
                                <Col span={24}>
                                        <UserDetails item={item} />
                                </Col>
                            </Row>

                        </List.Item>
                    ))
                }
                {
                    apiLoaded ? <List.Item>
                        <Row style={{ border: '1px solid gray', overflowY: newUserFormActive === true ? 'scroll' : 'hidden', boxShadow: newUserFormActive === true ? '0px 0px 1px 0px gray' : 'none', overflow: 'hidden', marginTop: '0px', width: '100%', borderRadius: '10px', transition: "height 0.3s ease", height: newUserFormActive === true ? '70vh' : '0px' }}>
                            <Col span={24}>
                                <div className="user-detail">
                                    <h3>Add New User</h3>
                                    <Divider />

                                    <Form onFinish={handleNewUserFormComplete} layout="vertical">
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
                                                    <p>Upload Profile Picture</p>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="user-form-row" >
                                            <Col span={24} className="user-form-col">
                                                <Form.Item name="name" label="Name" required={true}>
                                                    <Input type="text" placeholder="ex. Alexander" required={true}></Input>
                                                </Form.Item>
                                                <div className="form-description">
                                                    <p>Enter Your Name</p>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="user-form-row">
                                            <Col span={24} className="user-form-col">
                                                <Form.Item name="lastName" label="Last Name" required={true}>
                                                    <Input type="text" placeholder="ex. Hamilton" required={true}></Input>
                                                </Form.Item>
                                                <div className="form-description">
                                                    <p>Enter Your Last Name</p>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="user-form-row">
                                            <Col span={24} className="user-form-col">
                                                <Form.Item name="email" label="Email" required={true}>
                                                    <Input type="email" placeholder="ex. alexander.hamilton@lawlie8.org" required={true}></Input>
                                                </Form.Item>
                                                <div className="form-description">
                                                    <p>Enter Your Email</p>
                                                </div>
                                            </Col>
                                        </Row>


                                        <Row className="user-form-row" justify={'space-between'}>
                                            <Col span={11} className="user-form-col" style={{ float: 'left', position: 'relative' }}>
                                                <Form.Item name="password" label="Password" required={true}>
                                                    <Input type="password" placeholder="ex. U=/8!zLm*a}9Pv-RtBb$+F" required={true}></Input>
                                                </Form.Item>
                                                <div className="form-description">
                                                    <p>Enter Secured Password</p>
                                                </div>
                                            </Col>
                                            <Col span={11} offset={2} className="user-form-col">
                                                <Form.Item name="rePassword" label="ReType Password" required={true}>
                                                    <Input type="password" placeholder="ex. U=/8!zLm*a}9Pv-RtBb$+F" required={true}></Input>
                                                </Form.Item>
                                                <div className="form-description">
                                                    <p>Re Enter Secured Password</p>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="user-form-row" >
                                            <Col span={24} className="user-form-col">

                                                {
                                                    customRole ?
                                                        <Form.Item name="role" label="Role" required={true}>
                                                            <Row>
                                                                <Col span={22}>
                                                                    <Input name="customRole" placeholder="Create New Role" required={true}></Input>
                                                                </Col>
                                                                <Col span={2}>
                                                                    <Tooltip title={customRole ? "Select Existing Role" : "Create Custom Role"}>
                                                                        <Button onClick={() => handleCustomRoleAction()} ><PlusCircleOutlined style={{ fontSize: '20px', transform: customRole ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} /></Button>
                                                                    </Tooltip>
                                                                </Col>
                                                            </Row>
                                                        </Form.Item>
                                                        :
                                                        <Form.Item name="role" label="Role" required={true}>
                                                            <Row>
                                                                <Col span={22}>
                                                                    <Select
                                                                        required={true}
                                                                        showSearch
                                                                        allowClear
                                                                        style={{
                                                                            width: '100%',
                                                                        }}
                                                                        placeholder="Select Roles"
                                                                        onChange={handleChange}
                                                                        options={roleOptions}
                                                                        defaultValue={[selectedRole]}
                                                                    />
                                                                </Col>

                                                                <Col span={2}>
                                                                    <Tooltip title={customRole ? "Select Existing Role" : "Create Custom Role"}>
                                                                        <Button onClick={() => handleCustomRoleAction()} ><PlusCircleOutlined style={{ fontSize: '20px', transform: customRole ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} /></Button>
                                                                    </Tooltip>
                                                                </Col>
                                                            </Row>
                                                        </Form.Item>

                                                }


                                                <div className="form-description">
                                                    <p>Enter User Roles</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        {
                                            <Row className="user-form-row" >
                                                <Col span={24} className="user-form-col" style={{ backgroundColor: !customRole ? '#dfdfdf' : 'white', height: '146px' }}>


                                                    <Form.Item name="permissionList" label="Permission List" required={true}>
                                                        {
                                                            customRole ?

                                                                <Select
                                                                    disabled={!customRole}
                                                                    mode="multiple"
                                                                    showSearch
                                                                    allowClear
                                                                    style={{
                                                                        width: '100%',
                                                                    }}
                                                                    placeholder={!customRole ? "" : "Select Permission List"}
                                                                    onChange={() => { }}
                                                                    options={permissionOptions}
                                                                    defaultValue={['VIEW_JOBS']}

                                                                />
                                                                :

                                                                defaultRoleOptions?.map((item) => (
                                                                    <div className="default-select-item">
                                                                        {item.label}
                                                                    </div>
                                                                ))
                                                        }
                                                    </Form.Item>

                                                    <div className="form-description">
                                                        <p>
                                                            {customRole ? "Select Permissions" : "Available Permissions"}
                                                        </p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        }

                                        <Row className="user-form-row" justify={"space-around"}>
                                            
                                            <Col span={22} offset={2}>
                                                <Form.Item required={true}>
                                                    <button className="new-user-button" type="primary" iconPosition={"start"}><SaveOutlined style={{ fontSize: '20px' }} /> Save User</button>
                                                </Form.Item>
                                            </Col>
                                        </Row>


                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </List.Item> : <div></div>
                }

            </List>
        </div>
    </div>
}