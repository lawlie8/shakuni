import { DeleteFilled, MoreOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import './user-setting.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers } from "./user-setting-service";
import { setStoreSelectedUserSetting } from "./UserSettingSlice";
import { Avatar, Breadcrumb, Col, Divider, Input, List, Row, Space, Tooltip } from "antd";
export default function UserSetting(params = { params }) {

    const [allUserInfo, setAllUserInfo] = useState([])
    const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: (<><UserOutlined style={{ color: 'black' }} onClick={() => { handleBreadCrumbUserConfigureClick() }} /></>) }]);

    const dispatch = useDispatch();
    useEffect(() => {
        getAllUsers().then((response) => {
            setAllUserInfo(response.data)
            //            dispatch(setStoreSelectedUserSetting(response.data))
        })

    }, [])

    return <div className="user-main">
        <h2 className='user-headline'><UserOutlined /> User Settings</h2>
        <div className='user-type-segment'>
            <Breadcrumb className='users-configured-segment-breadcrumb'
                items={breadCrumbItems}
            />
            <Divider style={{ width: 'calc(100% - 20px)', marginTop: '20px', borderColor: 'lightgray' }} />

            <List className='configured-user-list' >
                <div className="user-search-div">
                    <Row>
                        <Col>
                            <Space.Compact size="medium">
                                <Input addonBefore={<SearchOutlined />} placeholder="Search User" />
                            </Space.Compact>
                        </Col>
                    </Row>



                </div>
                {
                    allUserInfo?.map((item) => (
                        <List.Item style={{ border: '1px solid gray', borderRadius: '10px' }} key={item.id} className='configured-user-list-item'>
                            <Row>
                                <Col style={{alignContent:'center',paddingLeft:'10px'}} span={4}><Avatar className="header-user-logo-avatar" size={35} style={{ backgroundColor: 'purple'}}>{item.userName?.toUpperCase()[0]}</Avatar></Col>                                
                                <Col style={{paddingLeft:'30px'}} span={4}><h3>{item.userName}</h3></Col>
                            </Row>
                            <div className="user-icons">
                                <MoreOutlined style={{fontSize:'30px',margin:'0px'}}></MoreOutlined>
                                <DeleteFilled style={{fontSize:'30px',margin:'10px',color:'red'}}></DeleteFilled>
                            </div>
                        </List.Item>
                    ))
                }
            </List>
        </div>
    </div>
}