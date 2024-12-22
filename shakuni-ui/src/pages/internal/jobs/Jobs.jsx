import { Avatar, Button, Col, Divider, Empty, Form, List, Menu, notification, Pagination, Popconfirm, Progress, Row, Select, Statistic, Tag, Tooltip } from 'antd';
import './jobs.css';
import { useEffect, useState } from 'react';
import { ArrowLeftOutlined, BarsOutlined, CaretLeftFilled, CaretRightFilled, CheckCircleFilled, CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, ConsoleSqlOutlined, DeleteFilled, EditFilled, ExclamationCircleOutlined, FileTextFilled, FireFilled, MoreOutlined, PlayCircleFilled, PlayCircleOutlined, PlusCircleFilled, QuestionCircleOutlined, RollbackOutlined, SyncOutlined } from '@ant-design/icons';
import Editor from './editor/Editor';
import { fetchConfiguredDataSourcesById, fetchDataSourceTypes } from '../config/data-sources/datasource-service';
import NewJobs from './new-job/NewJob';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen, setStoreSelectedConfiguredDataSourceId, setStoreSelectedDataSourceId, setStoreSlectedJobItem } from './JobSlice';
import { fetchAllJobsPagable, fetchAllJobsCount, fetchRecentJobs, deleteJobById, runJobById } from './jobs-service';
import TaskViewDetails from './task/TaskViewDetails';

export default function Jobs(params = { params }) {

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

    const [runningCount, setRunningCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);

    const jobObjList = useSelector((state) => state.jobStore.jobUpdateObj);
    const selectedJobId = useSelector((state) => state.jobStore.selectedJobId);
    const dispatch = useDispatch();
    
    const [menuItems, setMenuItems] = useState([
        {
            key: "1",
            label: <button className='task-back-button' onClick={()=>{setAllJobsView(true)}} style={{}}><RollbackOutlined style={{margin:'0px',padding:'0px'}} /><span style={{paddingLeft:'5px',margin:'0px'}}>Back</span></button>,
            style:{padding:'0px',margin:'none',backgroundColor:'white'}
        },{
            key: "2",
            label: <TaskViewDetails />,
            style:{position:'relative',top:"10px",height:"auto",padding:'0px',backgroundColor:'white'}
        }])

    let timeout;
    function pollRecentJobs() {
        timeout = setTimeout(() => {
            if (window.location.pathname === "/jobs") {
                fetchAllJobsCount().then((response) => {
                    setCompletedCount(response?.data.completed);
                    setJobCount(response?.data.all);
                    pollRecentJobs();
                });
            } else {
                clearTimeout(timeout); // Clear timeout if not on the /jobs page
            }
        }, 10000);
    }

    useEffect(() => {
        //pollRecentJobs();
        fetchAllJobsCount().then((response) => {
            setCompletedCount(response?.data.completed);
            setJobCount(response?.data.all);
        });

        fetchDataSourceTypes().then((response) => {
            setDataSourceType(response?.data)
            datasourceType?.map((item) => {
                item.value = item.dataSourceLabel
            })
        })


        fetchRecentJobs().then((response) => {
            setRecentJobs(response?.data)
        })

    }, [])


    useEffect(() => {
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
        dispatch(setStoreSelectedDataSourceId(Number(value.attributes.id.nodeValue)))
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
        if (value.selectedDataSourceTypeId === 0 || selectedConfiguredDataSourceName === "") {
            notification.warning({
                message: "Attributes Missing",
                description: "Some Attributes Required To Create Jobs Are Missing",
                duration: 1,
                style: { width: '250px' }
            })
        } else {
            //Generate Modal Here and Let User Create The Job
            dispatch(setIsModalOpen(true));
            dispatch(setStoreSelectedConfiguredDataSourceId(value.selectedConfiguredDataSourceId));
        }

    }

    const onPaginationChange = (current, pageSize) => {
        setJobPageSize(pageSize);
        setJobCurrentPage(current);
    };

    function handleJobDelete(id) {
        deleteJobById(id).then((response) => {
            if (response.status === 200 && response.data === true) {
                notification.success({
                    message: 'Success',
                    description: 'Job Deleted SucessFully',
                    duration: 1,
                    style: { width: '250px' }
                })
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Job Deletion Failed',
                    duration: 1,
                    style: { width: '250px' }
                })
            }
        })
    }

    function executeJobById(id) {
        runJobById(id).then((response) => {
            if (response.status === 200 && response.data === true) {
                notification.success({
                    message: 'Success',
                    description: 'Execution Started',
                    duration: 1,
                    style: { width: '250px' }
                })
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Job Failed',
                    duration: 1,
                    style: { width: '250px' }
                })
            }
        })
    }

    useEffect(() => {
        jobObjList.map((item) => {
            const index = jobsPagable.findIndex(job => job.id === item.jobId);
            if (index !== -1) {
                jobsPagable[index].statusEnum = item.status;
                if (item.status === "COMPLETED") {
                    jobsPagable[index].completionPercentage = 0.0;
                } else if (item.status === "RUNNING") {
                    jobsPagable[index].completionPercentage = item.completionPercentage;
                }
            }

        })
        setRunningCount(jobObjList.filter(job => job.status === "RUNNING").length)

        setJobsPagable([...jobsPagable])
    }, [jobObjList])

    function handleJobSelect(value) {       
        dispatch(setStoreSlectedJobItem(value));
        setAllJobsView(false);
        
        //TODO add fetch all tasks for job here send to store

    }

    function getUrl(id) {
        const item = datasourceType.find(data => data.id === id);
        return item ? item.dataSourceImageUrl : null; // Return the imageUrl if found, otherwise return null
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
                                value={runningCount}
                                valueStyle={{ color: 'orange', fontSize: '30px' }}
                                prefix={<FireFilled />}
                                suffix=""
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="Completed"
                                value={completedCount}
                                valueStyle={{ color: '#3f8600', fontSize: '30px' }}
                                prefix={<CheckCircleFilled />}
                                suffix=""
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="Total"
                                value={"Σ " + jobCount}
                                valueStyle={{ color: '#000', fontSize: '30px' }}
                                suffix=""
                            />
                        </Col>

                    </Row>
                </div>
                <div className='jobs-all-recent-jobs'>
                    <h2 style={{ textAlign: 'left', margin: '10px' }}>Recent Jobs</h2>
                    <Divider />
                    <List style={{ margin: '0px', padding: '0px' }}>
                        {
                            recentJobs.length === 0 ?
                                <Empty />
                                :
                                recentJobs?.map((item) => (
                                    <List.Item style={{ height: "60px", borderRadius: '10px', border: '1px solid #dfdfdf', padding: '0px' }} className='jobs-recent-all-jobs-item'>
                                        <img style={{ marginLeft: '10px' }} src={getUrl(item.datasourceId)} height="35px" width="35px" alt="" />
                                        <List.Item.Meta
                                            style={{ textAlign: 'start', marginLeft: '20px' }}
                                            title={<span style={{ fontWeight: '600' }}>{item.jobName}</span>}
                                        />
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
                                            onChange={(value) => { }}
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
                                    <button className='jobs-util-segment-li-create' type='submit' style={{ filter: selectedDataSourceTypeId === 0 || selectedConfiguredDataSourceName === "" ? 'grayscale(1)' : 'none' }}>
                                        <CheckOutlined style={{ fontSize: '30px', position: 'relative', top: '25%', transform: 'translateY(-50%)' }} />
                                    </button>
                                </Form.Item>

                            </Form>

                        </ul>
                    </Col>
                </Row>
                {/* backgroundImage:`linear-gradient(90deg, rgb(17, 150, 45) ${item.datasourceId * 8}%, rgba(255,255,255,1)${item.datasourceId * 8}%)` */}
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
                                                <List.Item  style={{ height: "60px", backgroundImage: `linear-gradient(90deg, rgba(73,212,94,0.7)  ${item.completionPercentage / 2}%, rgba(41,125,54,1) ${item.completionPercentage}%, rgba(255,255,255,1) ${item.completionPercentage}%)`, backgroundSize: item.statusEnum === 'RUNNING' ? '90% 10%' : '100% 0%' , transition: 'background 0.5s ease', backgroundRepeat: 'no-repeat', boxShadow: '0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);', border: '1px solid #dfdfdf', padding: '0px' }} className='jobs-all-jobs-item'>
                                                    {/* <Progress trailColor='rgba(1,1,1,0)' strokeLinecap="" showInfo={false} style={{position:'absolute',marginTop:"-61px",paddingLeft:'5px',borderRadius:'10px',width:"calc(100% - 172px)",padding:'0px'}} size={['100%',5]} percent={55} strokeColor={{'0%': '#108ee9','100%': '#87d068',}} /> */}

                                                    <img style={{ marginLeft: '10px' }} src={getUrl(item.datasourceId)} height="35px" width="35px" alt="" />
                                                    <List.Item.Meta
                                                        style={{ textAlign: 'start', marginLeft: '20px' }}
                                                        title={<span style={{ fontWeight: '600' }}>{item.jobName}</span>}
                                                        description={item.description !== null ? item.description : ''}
                                                    />
                                                    <div style={{ left: '50%', position: 'absolute' }}>
                                                        {
                                                            {
                                                                'UNTRIGGERED': <><Tag icon={<QuestionCircleOutlined />} color='gray' style={{ width: '120px', textAlign: 'center' }}>
                                                                    UNTRIGGERED
                                                                </Tag></>,
                                                                'RUNNING': <><Tag icon={<SyncOutlined spin />} color='green' style={{ width: '120px', textAlign: 'center' }}>
                                                                    RUNNING {item.completionPercentage}%
                                                                </Tag>
                                                                </>,
                                                                'ERROR': <><Tag icon={<ExclamationCircleOutlined />} color='red' style={{ width: '120px', textAlign: 'center' }}>
                                                                    ERROR
                                                                </Tag>
                                                                </>,
                                                                'COMPLETED': <><Tag icon={<CheckCircleOutlined />} color='darkgreen' style={{ width: '120px', textAlign: 'center' }}>
                                                                    COMPLETED
                                                                </Tag>
                                                                </>,
                                                                'TERMINATED': <><Tag icon={<CloseCircleOutlined />} color='red' style={{ width: '120px', textAlign: 'center' }}>
                                                                    TERMINATED
                                                                </Tag>
                                                                </>
                                                            }[item.statusEnum]
                                                        }


                                                    </div>
                                                    <ul style={{ listStyle: 'none', display: 'flex', paddingLeft: '5px' }}>
                                                        <li style={{ display: 'flex' }}>
                                                            <Tag style={{ width: '85px', textAlign: 'center' }} color={item.executionType === 'NORMAL' ? 'purple' : 'blue'}>{item.executionType}</Tag>
                                                        </li>
                                                    </ul>
                                                    <Tooltip title="View Tasks">
                                                        <div className='job-interactive-button-edit' onClick={() => handleJobSelect(item)}>
                                                            <BarsOutlined style={{ position: 'relative', fontSize: '25px', left: '0%', top: '50%', transform: 'translate(-0%,-50%)' }} />
                                                        </div>
                                                    </Tooltip>
                                                    <Tooltip title="Delete Job">
                                                        <Popconfirm
                                                            placement="leftTop"
                                                            title="Delete Confirmation"
                                                            description="Are you sure you want to delete this Job?"
                                                            okText="Yes"
                                                            cancelText="No"
                                                            onConfirm={() => handleJobDelete(item.id)}>
                                                            <div className='job-interactive-button-delete' >
                                                                <DeleteFilled style={{ position: 'relative', fontSize: '25px', left: '0%', top: '50%', transform: 'translate(-0%,-50%)' }} />
                                                            </div>
                                                        </Popconfirm>
                                                        
                                                    </Tooltip>
                                                    <Tooltip title="Edit Job">
                                                        <div className='job-interactive-button-edit' >
                                                            <EditFilled style={{ position: 'relative', fontSize: '25px', left: '0%', top: '50%', transform: 'translate(-0%,-50%)' }} />
                                                        </div>
                                                    </Tooltip>
                                                    <Tooltip title="Execute Job">
                                                        <div className='job-interactive-button-run' onClick={() => executeJobById(item.id)}>
                                                            <CaretRightFilled style={{ position: 'relative', fontSize: '25px', left: '0%', top: '50%', transform: 'translate(-0%,-50%)' }} />
                                                        </div>
                                                    </Tooltip>

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
                            style={{ position: 'relative', bottom: '10px', left: '50%', transform: 'translateX(-50%)', marginBottom: '10px', marginTop: '20px' }}
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