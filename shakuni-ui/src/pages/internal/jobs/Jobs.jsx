import { Col, Divider, List, Menu, Row, Statistic, Tooltip } from 'antd';
import './jobs.css';
import { useState } from 'react';
import { ArrowUpOutlined, CheckCircleOutlined, CheckOutlined, CodeFilled, DatabaseOutlined, FileTextFilled, FireFilled, FireOutlined, FunctionOutlined, HourglassOutlined, MergeOutlined, PlusCircleFilled, UserOutlined } from '@ant-design/icons';
import Editor from './editor/Editor';
import { useHorizontalScroll } from '../../../util/scroll';

export default function Jobs(params = { params }) {

    const [segmentItemList, setSegmentItemList] = useState([1, 2]);
    const [allJobsView, setAllJobsView] = useState(true);
    const [recentJobs, setRecentJobs] = useState([1, 2, 3, 4])
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
        <Row className='jobs-all-page' justify={"space-between"} style={{ display: !allJobsView ? 'none' : 'flex' }}>
            <Col span={4} style={{width:"30%",position:'relative' ,top: '-10px' }}>
                <div className='jobs-all-stat-overview'>
                    <h2>Overview</h2>
                    <Divider />
                    <Row justify={"space-between"}>
                        <Col span={8}>
                            <Statistic
                                title="Running"
                                value={"11"}
                                valueStyle={{ color: 'orange' }}
                                prefix={<FireFilled />}
                                suffix=""
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="Completed"
                                value={"26"}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<CheckCircleOutlined />}
                                suffix=""
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="Total"
                                value={"Σ 37"}
                                valueStyle={{ color: '#000' }}
                                suffix=""
                            />
                        </Col>

                    </Row>
                </div>
                <div className='jobs-all-recent-jobs'>
                    <h2>Recent Jobs</h2>
                    <Divider />
                    <List style={{ margin: '0px', padding: '0px' }}>
                        {
                            recentJobs?.map((item) => (
                                <List.Item className='jobs-recent-all-jobs-item'>
                                    {item}
                                </List.Item>
                            ))
                        }

                    </List>
                </div>
            </Col>
            <Col span={20} style={{width:"70%",position:'relative',top: '-10px' }}>
                <Row className='jobs-util-segment'>
                    <Col span={24}>
                    
                    </Col>
                </Row>
                <Row className='jobs-content-segment'>
                    <Col span={24}>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row className="jobs-page-main" style={{ display: allJobsView ? 'none' : 'flex' }}>
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