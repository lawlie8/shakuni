import { Col, Menu, Row, Tooltip } from 'antd';
import './jobs.css';
import { useState } from 'react';
import { CodeFilled, DatabaseOutlined, FileTextFilled, PlusCircleFilled, UserOutlined } from '@ant-design/icons';
import Editor from './editor/Editor';
import { useHorizontalScroll } from '../../../util/scroll';

export default function Jobs(params = { params }) {

    const [segmentItemList, setSegmentItemList] = useState([1, 2]);

    const [menuItems, setMenuItems] = useState([{
        key: "1",
        icon: <img src='/datasource_logo/hive_logo.svg' height="50px" width="50px" />,
        label: "Hive Sources",
    },
    {
        key: "2",
        icon: <img src='/datasource_logo/oracle_logo.svg' height="50px" width="50px" />,
        label: "Hive Sources",
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
                        <div className='job-segment-selection' >
                            <ul className='job-segment-selection-ul'>
                                <li className='job-segment-selection-ul-li'>
                                    <CodeFilled style={{ fontSize: '30px', position: 'relative', top: '50%', transform: 'translateY(-50%)' }} />
                                </li>                                        <li className='job-segment-selection-ul-li'>
                                    <FileTextFilled style={{ fontSize: '30px', position: 'relative', top: '50%', transform: 'translateY(-50%)' }} />
                                </li>
                                {/* 
                                {
                                    segmentItemList?.map((item)=>(
                                        <li className='job-segment-selection-ul-li'>
                                            <FileTextFilled style={{ fontSize: '30px', position: 'relative', top: '50%', transform: 'translateY(-50%)' }} />
                                        </li>
                                    ))
                                } */}
                                <Tooltip title="Create New Item">
                                    <li className='job-segment-selection-ul-li-create'>
                                        <PlusCircleFilled style={{ fontSize: '30px', position: 'relative', top: '50%', transform: 'translateY(-50%)' }} />
                                    </li>
                                </Tooltip>

                            </ul>
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