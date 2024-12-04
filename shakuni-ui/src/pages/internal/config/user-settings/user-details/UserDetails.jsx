import { Button, Col, Form, Input, Row, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getAllPermissionOptions, getAllPermissionOptionsByRoleName, getAllUserRoleOptions } from "../user-setting-service";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function UserDetails({item}) {
    const [userDetailsLoaded, setUserDetailsLoaded] = useState(false);
    const [customRole, setCustomRole] = useState(false);
    const permissionOptions =  useSelector((state)=>state.userStoreSetting.allPermissionOptions);
    const [defaultRoleOptions, setDefaultRoleOptions] = useState([]);
    const roleOptions = useSelector((state)=>state.userStoreSetting.allRoles);
    const [selectedPermission, setSelectedPermission] = useState([]);
    const [selectedRole, setSelectedRole] = useState(item.roles.roleName);
    const [editUserDisabled, setEditUserDisabled] = useState(false);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    
    useEffect(()=>{
        setUserDetailsLoaded(false)
        item.userPropertyList.map((item)=>{
            if(item.propertyKey === "name"){
                setName(item.propertyValue);
            }else if(item.propertyKey === "lastName"){
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
    },[])

    function handleUserEditComplete(values) {
    }

    function handleUserEditChange(){
        setEditUserDisabled(!editUserDisabled);
    }

    function handleCustomRoleAction() {
        setCustomRole(!customRole)
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
            <Form onFinish={handleUserEditComplete} layout="vertical" disabled={editUserDisabled} style={{filter: item.defaultUser ? 'grayscale(1)' : 'none'}}>
            <Row style={{ width: '100%', height: '50px' }} justify={'space-between'}>
                <Col span={1} offset={22} >
                    <button type="primary" onClick={()=>handleUserEditChange()} style={{ float: 'right', margin: '10px', backgroundColor: item.defaultUser || !editUserDisabled ? '#585858' : '#000', filter: item.defaultUser ? 'grayscale(1)' : 'none' }}>
                        <Tooltip title={item.defaultUser ? "Can't Edit User" : "Edit User"} placement={"topRight"}>
                            <EditOutlined style={{ fontSize: '17px' }} />
                        </Tooltip>
                    </button>
                </Col>
                <Col span={1}>
                    <button style={{ float: 'right', margin: '10px', backgroundColor: '#d43838', filter: item.defaultUser ? 'grayscale(1)' : 'none' }}>
                        <Tooltip title={item.defaultUser ? "Can't Edit User" : "Delete User"} placement={"topLeft"}>
                            <DeleteOutlined style={{ fontSize: '17px' }} />
                        </Tooltip>
                    </button>
                </Col>
            </Row>
            <Row className="user-form-row"  >
                <Col span={24} className="user-form-col" style={{ filter: editUserDisabled ? 'grayscale(1)' :'none'}}>
                    <Form.Item name="name" label="Name" required={true}>
                        <Input type="text" placeholder="ex. Alexander" required={true} defaultValue={name}></Input>
                    </Form.Item>
                    <div className="form-description">
                        <p>Enter Your Name</p>
                    </div>
                </Col>
            </Row>
            <Row className="user-form-row">
                <Col span={24} className="user-form-col" style={{ filter: editUserDisabled ? '#d6d6d6' : 'white'}}>
                    <Form.Item name="lastName" label="Last Name" required={true}>
                        <Input type="text" placeholder="ex. Hamilton" required={true} defaultValue={lastName}></Input>
                    </Form.Item>
                    <div className="form-description">
                        <p>Enter Your Last Name</p>
                    </div>
                </Col>
            </Row>

            <Row className="user-form-row">
                <Col span={24} className="user-form-col" style={{ filter: editUserDisabled ? '#d6d6d6' : 'white'}}>
                    <Form.Item name="email" label="Email" required={true}>
                        <Input type="email" placeholder="ex. alexander.hamilton@lawlie8.org" readOnly defaultValue={item.userName} required={true}></Input>
                    </Form.Item>
                    <div className="form-description">
                        <p>Enter Your Email</p>
                    </div>
                </Col>
            </Row>


            <Row className="user-form-row" justify={'space-between'}>
                <Col span={11} className="user-form-col" style={{ float: 'left', position: 'relative',filter: editUserDisabled ? '#d6d6d6' : 'white' }}>
                    <Form.Item name="password" label="New Password" required={true}>
                        <Input type="password" placeholder="ex. U=/8!zLm*a}9Pv-RtBb$+F" readOnly required={true}></Input>
                    </Form.Item>
                    <div className="form-description">
                        <p>Enter Secured Password</p>
                    </div>
                </Col>
                <Col span={11} offset={2} className="user-form-col" style={{ filter: editUserDisabled ? '#d6d6d6' : 'white'}}>
                    <Form.Item name="rePassword" label="ReType New Password" required={true}>
                        <Input type="password" placeholder="ex. U=/8!zLm*a}9Pv-RtBb$+F" readOnly required={true}></Input>
                    </Form.Item>
                    <div className="form-description">
                        <p>Re Enter Secured Password</p>
                    </div>
                </Col>
            </Row>
            <Row className="user-form-row" >
                <Col span={24} className="user-form-col" style={{ filter: editUserDisabled ? '#d6d6d6' : 'white'}}>

                    {
                        customRole ?
                            <Form.Item name="role" label="Role" required={true}>
                                <Row>
                                    <Col span={22}>
                                        <Input name="customRole" placeholder="Create New Role" required={true} ></Input>
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
                    <Col span={24} className="user-form-col" style={{ backgroundColor: !customRole ? '#d6d6d6' : 'white', height: '146px' }}>


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
        </Form>
         : "Loading"   
        }
    </div>
}