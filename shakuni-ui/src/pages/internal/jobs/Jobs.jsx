import { Col, Divider, Dropdown, Empty, Form, List, Menu, Modal, notification, Pagination, Row, Select, Space, Statistic, Tooltip } from 'antd';
import './jobs.css';
import { useEffect, useState } from 'react';
import { ArrowUpOutlined, CheckCircleFilled, CheckCircleOutlined, CheckOutlined, CodeFilled, ConsoleSqlOutlined, DatabaseOutlined, FileTextFilled, FireFilled, FireOutlined, FunctionOutlined, HourglassOutlined, MergeOutlined, PlusCircleFilled, SendOutlined, UserOutlined } from '@ant-design/icons';
import Editor from './editor/Editor';
import { useHorizontalScroll } from '../../../util/scroll';
import { fetchConfiguredDataSourcesById, fetchDataSourceTypes } from '../config/data-sources/datasource-service';
import NewJobs from './new-job/NewJob';
import { useDispatch } from 'react-redux';
import { setIsModalOpen } from './JobSlice';
import { fetchAllJobsPagable, fetchAllJobsCount } from './jobs-service';

export default function Jobs(params = { params }) {

    const [segmentItemList, setSegmentItemList] = useState([1, 2]);
    const [allJobsView, setAllJobsView] = useState(true);
    const [recentJobs, setRecentJobs] = useState([])
    const [jobsPagable, setJobsPagable] = useState([])

    const [datasourceType, setDataSourceType] = useState([]);
    const [configuredDatasource, setConfiguredDatasource] = useState([]);

    const [selectedDataSourceTypeId, setSelectedDataSourceTypeId] = useState(0);
    const [jobCount, setJobCount] = useState(0);
    const [jobPageSize, setJobPageSize] = useState(10);
    const [jobCurrentPage, setJobCurrentPage] = useState(1);


    const [selectedDataSourceTypeName, setSelectedDataSourceTypeName] = useState("");
    const [selectedConfiguredDataSourceName, setSelectedConfiguredDataSourceName] = useState("");

    const [selectedDataSourceTypeImageUrl, setSelectedDataSourceTypeImageUrl] = useState("");
    const [selectedConfiguredDataSourceId, setSelectedConfiguredDataSourceId] = useState(0);

    const dispatch = useDispatch();

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

    useEffect(() => {
        fetchDataSourceTypes().then((response) => {
            setDataSourceType(response?.data)
            datasourceType?.map((item) => {
                item.value = item.dataSourceLabel
            })
        })

        fetchAllJobsCount().then((response) => {
            setJobCount(response?.data);
        })


    }, [])

    useEffect(() => {
        console.log("fetching", jobCurrentPage, jobPageSize);

        fetchAllJobsPagable(jobCurrentPage, jobPageSize)
            .then((response) => {
                setJobsPagable(response.data)
            })

    }, [jobCurrentPage, jobPageSize])

    const setDataSourceTypeIdFunction = (value) => {
        if (value.attributes.dataSourceName.nodeValue !== selectedDataSourceTypeName) {
            setSelectedConfiguredDataSourceName("");
        }
        setSelectedDataSourceTypeImageUrl(String(value.attributes.url.nodeValue));
        setSelectedDataSourceTypeName(String(value.attributes.dataSourceName.nodeValue));
        setSelectedDataSourceTypeId(Number(value.attributes.id.nodeValue));
        fetchConfiguredDataSourcesById(Number(value.attributes.id.nodeValue)).then((response) => {
            setConfiguredDatasource(response.data);
        })

    };

    const setConfiguredDataSourceNameFunction = (value) => {
        setSelectedConfiguredDataSourceName(value.innerText)
        setSelectedConfiguredDataSourceId(Number(value.id));
    };




    function onClickDataSource(value) {

    }

    function handleCreateNewModal(value) {
        value.selectedDataSourceTypeId = Number(selectedDataSourceTypeId);
        value.selectedConfiguredDataSourceId = selectedConfiguredDataSourceId;
        if (value.selectedDataSourceTypeId === 0 || value.selectedConfiguredDataSourceId === 0) {
            notification.warning({
                message: "Attributes Missing",
                description: "Some Attributes Required To Create Jobs Are Missing",
                duration: 1,
                style: { width: '250px' }
            })
        } else {
            //Generate Modal Here and Let User Create The Job
            console.log("Generating Modal");
            dispatch(setIsModalOpen(true));
        }

    }

    const onPaginationChange = (current, pageSize) => {
        setJobPageSize(pageSize);
    };



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
                                valueStyle={{ color: 'orange', fontSize: '30px' }}
                                prefix={<FireFilled />}
                                suffix=""
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="Completed"
                                value={"26"}
                                valueStyle={{ color: '#3f8600', fontSize: '30px' }}
                                prefix={<CheckCircleFilled />}
                                suffix=""
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="Total"
                                value={"Σ "+jobCount}
                                valueStyle={{ color: '#000', fontSize: '30px' }}
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
                            recentJobs.length === 0 ? 
                            <Empty />
                            :
                            recentJobs?.map((item) => (
                                <List.Item className='jobs-recent-all-jobs-item'>
                                    {item + "."}
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
                            <Form onFinish={handleCreateNewModal} style={{ display: 'flex', width: '100%' }}>
                                <li className='jobs-util-segment-li'>
                                    <div style={{ position: 'absolute', zIndex: '1', display: selectedDataSourceTypeImageUrl === "" ? "none" : "block", backgroundColor: 'white', width: 'calc(100% - 10px)', pointerEvents: 'none', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                                        <ul style={{ listStyle: 'none', display: 'inline-flex' }}>
                                            <li style={{ margin: '0px 5px 0px 5px' }}>
                                                <img height="25px" width="25px" src={selectedDataSourceTypeImageUrl} alt="" />
                                            </li>
                                            <li>
                                                <b>{selectedDataSourceTypeName}</b>
                                            </li>
                                        </ul>
                                    </div>
                                    <Form.Item name="selectedDataSourceTypeId">
                                        <Select
                                            mode="single"
                                            style={{ width: '100%', height: '90px' }}
                                            placeholder="Select Data-Source Type"
                                            defaultValue={[]}
                                            value={selectedDataSourceTypeId}
                                            onChange={(value) => { setDataSourceTypeIdFunction(value) }}
                                            options={datasourceType}
                                            optionRender={(option) => (
                                                <div id={option.data.id} url={option.data.dataSourceImageUrl} dataSourceName={option.data.dataSourceLabel} onClick={(value) => setDataSourceTypeIdFunction(value.target)} style={{ display: 'flex' }} >
                                                    <span style={{ margin: '5px', pointerEvents: 'none' }}>
                                                        <img height="25px" width="25px" src={option.data.dataSourceImageUrl} alt="" />
                                                    </span>
                                                    <h4 style={{ margin: '0px 0px 0px 10px', paddingTop: '10px', pointerEvents: 'none' }}>{option.data.dataSourceLabel}</h4>
                                                </div>
                                            )}
                                        />
                                    </Form.Item>
                                </li>
                                <li className='jobs-util-segment-li'>
                                    <div style={{ position: 'absolute', zIndex: '1', backgroundColor: 'white', width: 'calc(100% - 10px)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
                                        {selectedConfiguredDataSourceName}
                                    </div>
                                    <Form.Item name="selectedConfiguredDataSourceId" required={true}>
                                        <Select
                                            mode="single"
                                            style={{ width: '100%', height: '90px' }}
                                            placeholder="Select Configured Data-Source"
                                            defaultValue={[]}
                                            onChange={(value) => { console.log(value) }}
                                            options={configuredDatasource}
                                            optionRender={(option) => (
                                                <div id={option.data.id} onClick={(value) => setConfiguredDataSourceNameFunction(value.target)}>
                                                    <span role="img" aria-label={option.data.label}>
                                                    </span>
                                                    {option.data.datasourceName}
                                                </div>
                                            )}
                                        />
                                    </Form.Item>

                                </li>
                                <Form.Item>
                                    <button className='jobs-util-segment-li-create' type='submit'>
                                        <CheckOutlined style={{ fontSize: '30px', position: 'relative', top: '25%', transform: 'translateY(-50%)' }} />
                                    </button>
                                </Form.Item>

                            </Form>

                        </ul>
                    </Col>
                </Row>
                <Row className='jobs-content-segment'>
                    <Col span={24}>
                        <h2 style={{ textAlign: 'left', margin: '10px' }}>All Jobs</h2>
                        <Divider />
                        <List>
                            {

                                jobsPagable.length === 0 ?
                                    <>
                                        <Empty description={<>
                                            <p>No Data</p>
                                            <p>Create New Job By Selecting Options At Top ⬆️</p>
                                        </>} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,50%)' }} />
                                    </>
                                    :
                                    <>
                                        {
                                            jobsPagable?.map((item) => (
                                                <List.Item className='jobs-recent-all-jobs-item'>
                                                    {item + "."}
                                                </List.Item>
                                            ))
                                        }
                                    </>
                            }

                        </List>
                        <Pagination
                            showSizeChanger
                            onChange={onPaginationChange}
                            defaultCurrent={1}
                            defaultPageSize={jobPageSize}
                            total={jobCount}
                            align='center'
                            style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', marginBottom: '10px' }}
                        />
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
                                    <ConsoleSqlOutlined style={{ fontSize: '30px', position: 'relative', top: '50%', transform: 'translateY(-50%)' }} />
                                </li>                                        <li className='job-segment-selection-ul-li'>
                                    <FileTextFilled style={{ fontSize: '30px', position: 'relative', top: '50%', transform: 'translateY(-50%)' }} />
                                </li>

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


        <div className='create-job-modal'>
            <NewJobs />
        </div>
    </div>
}