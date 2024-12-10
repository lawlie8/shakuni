import { Col, Menu, Row } from 'antd';
import './jobs.css';
import { useState } from 'react';
import { DatabaseOutlined, UserOutlined } from '@ant-design/icons';
import Editor from './editor/Editor';

export default function Jobs(params = { params }) {

    const [menuItems, setMenuItems] = useState([{
        key: "1",
        icon: <DatabaseOutlined />,
        label: "Data Sources",
    },
    {
        key: "2",
        icon: <UserOutlined />,
        label: "User Settings",
    },])



    function onClickDataSource(value) {

    }

    return <div className="jobs-page">
        <Row className="jobs-page-main">
            <Col span={4} className="jobs-page-selection">
                <Menu
                    className='jobs-page-selection-menu'
                    onClick={onClickDataSource}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={menuItems}
                />
            </Col>
            <Col span={20} className="jobs-page-content">
                <Row style={{ width: '100%' }}>
                    <Col span={24}>
                        <div className='job-segment-selection'>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div className='job-segment-content'>
                            <Editor />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}