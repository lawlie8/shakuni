import { DeleteFilled, DownOutlined, MoreOutlined, PlusCircleOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import './user-setting.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers } from "./user-setting-service";
import { setStoreSelectedUserSetting } from "./UserSettingSlice";
import { Avatar, Breadcrumb, Button, Col, Divider, Input, List, Row, Space, Tooltip } from "antd";
export default function UserSetting(params = { params }) {

    const [allUserInfo, setAllUserInfo] = useState([])
    const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: (<><UserOutlined style={{ color: 'black' }} onClick={() => { handleBreadCrumbUserConfigureClick() }} /></>) }]);
    const [activeId, setActiveId] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
        getAllUsers().then((response) => {
            setAllUserInfo(response.data)
        })

    }, [])

    function handleActiveId(id) {
        setActiveId((prevSelected) => (prevSelected === id ? null : id));    
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
                    <Row style={{width:'100%'}}  justify={"space-between"}>
                        <Col span={8} >
                            <Space.Compact size="medium" style={{float:'left'}}>
                                <Input addonBefore={<SearchOutlined />} placeholder="Search User" />
                            </Space.Compact>
                        </Col>
                        <Col span={8} offset={8}>
                            <button className="new-user-button" type="primary" iconPosition={"start"}><PlusCircleOutlined /> New User</button>
                        </Col>
                    </Row>
                </div>
                {
                    allUserInfo?.map((item) => (
                        <List.Item style={{ border: '1px solid gray', borderRadius: '10px', minHeight: '70px', padding: '0px', position: 'relative', display: 'inline-block' }} key={item.id} className='configured-user-list-item'>
                            <Row style={{ backgroundColor: 'white', minHeight: '70px', margin: '0px', top: '0px', width: '100%', borderRadius: '10px' }}>
                                <Col span={24} style={{ height: '70px', display: 'flex' }}>
                                    <Row style={{ display: 'flex', width: '100%' }} justify={"space-between"}>
                                        <Col span={1}>
                                            <Avatar className="header-user-logo-avatar" size={40} style={{ backgroundColor: 'purple'}}>{item.userName?.toUpperCase()[0]}</Avatar>
                                        </Col>
                                        <Col span={3} className="header-user-user-name">
                                            <h3>{item.userName}</h3>
                                        </Col>
                                        <Col span={1} offset={19}>
                                            <div className="user-icons">
                                                <Row style={{ width: '100%' }}>
                                                    <Col span={24}>
                                                        <PlusCircleOutlined onClick={()=>handleActiveId(item.id)} style={{ fontSize: '20px', marginRight: '5px', borderRadius: '100%', padding: '10px', alignContent: 'center', boxShadow: ' 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)' }}></PlusCircleOutlined>
                                                    </Col>
                                                </Row>
                                            </div>

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row key={item.id} style={{ backgroundColor: 'white', marginTop: '1px', display: activeId === item.id ? 'block' : 'none' , width: '100%', borderRadius: '10px',height: activeId === item.id ? '90vh' : '0px' }}>
                                <Col span={24}>
                                    tes2
                                </Col>
                            </Row>

                        </List.Item>
                    ))
                }
            </List>
        </div>
    </div>
}