import { Button, Col, Form, Input, Row, Select, Switch, Tag, Tooltip, Upload } from "antd";
import { useEffect, useState } from "react";
import { editUser, getAllPermissionOptions, getAllPermissionOptionsByRoleName, getAllUserRoleOptions } from "../user-setting-service";
import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function UserDetails({ item }) {
    const [userDetailsLoaded, setUserDetailsLoaded] = useState(false);
    const [customRole, setCustomRole] = useState(false);
    const permissionOptions = useSelector((state) => state.userStoreSetting.allPermissionOptions);
    const [defaultRoleOptions, setDefaultRoleOptions] = useState([]);
    const roleOptions = useSelector((state) => state.userStoreSetting.allRoles);
    const [selectedPermission, setSelectedPermission] = useState([]);
    const [selectedRole, setSelectedRole] = useState(item.roles.roleName);
    const [editUserDisabled, setEditUserDisabled] = useState(true);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordSwitch, setPaswordSwitch] = useState(false);

    const uploadButton = (
        <button style={{ border: 0, background: 'none', color: 'black' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusCircleOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    useEffect(() => {
        setUserDetailsLoaded(false)
        item.userPropertyList.map((item) => {
            if (item.propertyKey === "name") {
                setName(item.propertyValue);
            } else if (item.propertyKey === "lastName") {
                setLastName(item.propertyValue);
            }
        })

        getAllPermissionOptionsByRoleName(selectedRole).then((response) => {
            setDefaultRoleOptions([]);
            response.data.map((item) => {
                setDefaultRoleOptions(arr => [...arr, { value: item.id, label: item.permissionName }]);
            })
        })
        setUserDetailsLoaded(true);
    }, [])

    function handleUserEditComplete(values) {
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
            editUser(values).then((response) => {
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
        console.log(values);
    }

    function handleUserEditChange() {
        setEditUserDisabled(!editUserDisabled);
    }

    function handleCustomRoleAction() {
        setCustomRole(!customRole)
    }
    function beforeUpload() {

    }

    function handleImageChange() {

    }


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



    return <div className="user-details-segment">
        {
            userDetailsLoaded ?
                <>
                    <Row style={{ width: '100%', height: '50px' }} justify={'end'}>
                        <Col span={4} offset={20} style={{ display: 'flex', position: 'absolute', alignItems: 'end', marginTop: '10px', marginRight: '5px' }}>
                            <button type="primary" onClick={() => handleUserEditChange()} style={{ float: 'right', margin: '5px', backgroundColor: item.defaultUser || !editUserDisabled ? '#2caa34' : '#000', filter: item.defaultUser ? 'grayscale(1)' : 'none' }}>
                                <Tooltip title={item.defaultUser ? "Can't Edit User" : "Edit User"} placement={"topRight"}>
                                    <EditOutlined style={{ fontSize: '17px' }} />
                                </Tooltip>
                            </button>
                            <button style={{ float: 'right', margin: '5px', backgroundColor: '#d43838', filter: item.defaultUser ? 'grayscale(1)' : 'none' }}>
                                <Tooltip title={item.defaultUser ? "Can't Edit User" : "Delete User"} placement={"topLeft"}>
                                    <DeleteOutlined style={{ fontSize: '17px' }} />
                                </Tooltip>
                            </button>
                        </Col>
                    </Row>
                    <Form onFinish={handleUserEditComplete} layout="vertical" disabled={editUserDisabled} style={{ filter: item.defaultUser ? 'grayscale(1)' : 'none' }}>

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
                        <Row className="user-form-row"  >
                            <Col span={24} className="user-form-col" style={{ filter: editUserDisabled ? 'grayscale(1)' : 'none' }}>
                                <Form.Item name="name" label="Name" required={true} initialValue={name}>
                                    <Input type="text" placeholder="ex. Alexander" required={true} defaultValue={name}></Input>
                                </Form.Item>
                                <div className="form-description">
                                    <p>Enter Your Name</p>
                                </div>
                            </Col>
                        </Row>
                        <Row className="user-form-row">
                            <Col span={24} className="user-form-col" style={{ filter: editUserDisabled ? '#d6d6d6' : 'white' }}>
                                <Form.Item name="lastName" label="Last Name" required={true} initialValue={lastName}>
                                    <Input type="text" placeholder="ex. Hamilton" required={true} defaultValue={lastName}></Input>
                                </Form.Item>
                                <div className="form-description">
                                    <p>Enter Your Last Name</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="user-form-row">
                            <Col span={24} className="user-form-col" style={{ filter: editUserDisabled ? '#d6d6d6' : 'white' }}>
                                <Form.Item name="email" label="Email" required={true} initialValue={item.userName}>
                                    <Input type="email" placeholder="ex. alexander.hamilton@lawlie8.org" readOnly required={true}></Input>
                                </Form.Item>
                                <div className="form-description">
                                    <Tag color="error" >Email Cannot Be Updated</Tag>
                                </div>
                            </Col>
                        </Row>

                        <Row justify={'start'} className="user-form-row" style={{ marginBottom: '10px' }}>
                            <Col span={12} style={{ margin: '10px', display: 'inline-flex', position: 'relative', float: 'right' }}>
                                <Switch onChange={() => { setPaswordSwitch(!passwordSwitch) }} />
                                <Tag color="warning" style={{ marginLeft: '10px' }}>Change Password</Tag>
                            </Col>
                        </Row>

                        <div className="user-edit-password-seg" style={{ height: passwordSwitch ? '124px' : '0px', opacity: passwordSwitch ? '1' : '0', transition: "height 0.3s ease" }}>
                            <Row className="user-form-row" justify={'space-between'} >
                                <Col span={11} className="user-form-col" style={{ float: 'left', position: 'relative', filter: editUserDisabled ? '#d6d6d6' : 'white' }}>
                                    <Form.Item name="password" label="New Password" required={passwordSwitch ? true : false}>
                                        <Input type="password" placeholder="ex. U=/8!zLm*a}9Pv-RtBb$+F" ></Input>
                                    </Form.Item>
                                    <div className="form-description">
                                        <p>Enter Secured Password</p>
                                    </div>
                                </Col>
                                <Col span={11} offset={2} className="user-form-col" style={{ filter: editUserDisabled ? '#d6d6d6' : 'white' }}>
                                    <Form.Item name="rePassword" label="ReType New Password" required={passwordSwitch ? true : false}>
                                        <Input type="password" placeholder="ex. U=/8!zLm*a}9Pv-RtBb$+F"  ></Input>
                                    </Form.Item>
                                    <div className="form-description">
                                        <p>Re Enter Secured Password</p>
                                    </div>
                                </Col>
                            </Row>

                        </div>
                        <Row className="user-form-row" >
                            <Col span={24} className="user-form-col" style={{ filter: editUserDisabled ? '#d6d6d6' : 'white' }}>

                                {
                                    customRole ?
                                        <Form.Item name="role" label="Role" required={!customRole ? true : false}>
                                            <Row>
                                                <Col span={22}>
                                                    <Input name="customRole" placeholder="Create New Role" />
                                                </Col>
                                                <Col span={2}>
                                                    <Tooltip title={customRole ? "Select Existing Role" : "Create Custom Role"}>
                                                        <Button onClick={() => handleCustomRoleAction()} ><PlusCircleOutlined style={{ fontSize: '20px', transform: customRole ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} /></Button>
                                                    </Tooltip>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        :
                                        <Form.Item name="role" label="Role" initialValue={[selectedRole]}>
                                            <Row>
                                                <Col span={22}>
                                                    <Select
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

                        <Row className="user-form-row" >
                            <Col span={24} className="user-form-col" style={{ backgroundColor: !customRole ? '#d6d6d6' : 'white', height: '146px' }}>
                                <Form.Item name="permissionList" label="Permission List" required={true} initialValue={!customRole ? permissionOptions : []}>
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
                        <Row className="user-form-row" justify={"space-around"}>
                            <Col span={22} offset={2}>
                                <Form.Item required={true}>
                                    <button disabled={editUserDisabled} className="new-user-button" type="primary" iconPosition={"start"}><SaveOutlined style={{ fontSize: '20px' }} /> Save User</button>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </>

                : "Loading"
        }
    </div>
}