import { Col, Divider, Dropdown, List, Menu, Row, Select, Space, Statistic, Tooltip } from 'antd';
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

    const selectOptions = [
        {
          label: 'China',
          value: 'china',
          emoji: '🇨🇳',
          desc: 'China (中国)',
        },
        {
          label: 'USA',
          value: 'usa',
          emoji: '🇺🇸',
          desc: 'USA (美国)',
        },
        {
          label: 'Japan',
          value: 'japan',
          emoji: '🇯🇵',
          desc: 'Japan (日本)',
        },
        {
          label: 'Korea',
          value: 'korea',
          emoji: '🇰🇷',
          desc: 'Korea (韩国)',
        },
      ];

      const handleChange = (value) => {
        console.log(`selected ${value}`);
      };



    function onClickDataSource(value) {

    }

    return <div className="jobs-page">
        <Row className='jobs-all-page' justify={"space-between"} style={{ display: !allJobsView ? 'none' : 'flex' }}>
            <Col span={5} style={{ width: "30%" }}>
                <div className='jobs-all-stat-overview'>
                    <h2 style={{ margin: '0px' }}>Overview</h2>
                    <Divider />
                    <Row justify={"space-between"}>
                        <Col span={8}>
                            <Statistic
                                title="Running"
                                value={"11"}
                                valueStyle={{ color: 'orange',fontSize:'30px' }}
                                prefix={<FireFilled />}
                                suffix=""
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="Completed"
                                value={"26"}
                                valueStyle={{ color: '#3f8600',fontSize:'30px' }}
                                prefix={<CheckCircleOutlined />}
                                suffix=""
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="Total"
                                value={"Σ 37"}
                                valueStyle={{ color: '#000',fontSize:'30px' }}
                                suffix=""
                            />
                        </Col>

                    </Row>
                </div>
                <div className='jobs-all-recent-jobs'>
                    <h2 style={{ margin: '0px' }}>Recent Jobs</h2>
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
            <Col span={19} style={{ width: "70%", position: 'relative' }}>
                <Row className='jobs-util-segment'>
                    <Col span={24}>
                        <ul className='jobs-util-segment-ul'>
                            <li className='jobs-util-segment-li'>
                                <Select
                                    mode="single"
                                    style={{ width: '100%',height:'90px' }}
                                    placeholder="select one country"
                                    defaultValue={['china']}
                                    onChange={handleChange}
                                    options={selectOptions}
                                    optionRender={(option) => (
                                        <Space>
                                            <span role="img" aria-label={option.data.label}>
                                                {option.data.emoji}
                                            </span>
                                            {option.data.desc}
                                        </Space>
                                    )}
                                />
                            </li>
                            <li className='jobs-util-segment-li'>
                            <Select
                                    mode="single"
                                    style={{ width: '100%',height:'90px' }}
                                    placeholder="select one country"
                                    defaultValue={['china']}
                                    onChange={handleChange}
                                    options={selectOptions}
                                    optionRender={(option) => (
                                        <Space>
                                            <span role="img" aria-label={option.data.label}>
                                                {option.data.emoji}
                                            </span>
                                            {option.data.desc}
                                        </Space>
                                    )}
                                />
                            </li>
                            <li className='jobs-util-segment-li-create'>
                                <PlusCircleFilled style={{ fontSize: '30px', position: 'relative', top: '50%', transform: 'translateY(-50%)' }} />
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className='jobs-content-segment'>
                    <Col span={24}>
                    <h2 style={{textAlign:'left',margin:'10px'}}>All Jobs</h2>
                        <Divider />
                        <List>
                            
                               {
                                recentJobs?.map((item) => (
                                    <List.Item className='jobs-recent-all-jobs-item'>
                                        {item}
                                    </List.Item>
                                ))
                            } 
                            
                        </List>
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