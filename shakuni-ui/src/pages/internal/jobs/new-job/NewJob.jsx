import { Button, Col, Form, Input, Modal, notification, Row, Select, Switch, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen } from "../JobSlice";
import { useState } from "react";
import { createNewJob } from "../jobs-service";

export default function NewJobs({ params }) {
    const isModalOpen = useSelector(state => state.jobStore.isModalOpen);
    const [executionFormatLabel, setExecutionFormatLabel] = useState("Un-Planned");
    const selectedConfiguredDataSourceId = useSelector(state => state.jobStore.selectedConfiguredDataSourceId);
    const minuteOption = [{
        value: 0,
        label: "0"
    },
    {
        value: 1,
        label: "1"
    },
    {
        value: 2,
        label: "2"
    },
    {
        value: 3,
        label: "3"
    },
    {
        value: 4,
        label: "4"
    },
    {
        value: 5,
        label: "5"
    },
    {
        value: 6,
        label: "6"
    },
    {
        value: 7,
        label: "7"
    },
    {
        value: 8,
        label: "8"
    },
    {
        value: 9,
        label: "9"
    },
    {
        value: 10,
        label: "10"
    },
    {
        value: 11,
        label: "11"
    },
    {
        value: 12,
        label: "12"
    },
    {
        value: 13,
        label: "13"
    },
    {
        value: 14,
        label: "14"
    },
    {
        value: 15,
        label: "15"
    },
    {
        value: 16,
        label: "16"
    },
    {
        value: 17,
        label: "17"
    },
    {
        value: 18,
        label: "18"
    },
    {
        value: 19,
        label: "19"
    },
    {
        value: 20,
        label: "20"
    },
    {
        value: 21,
        label: "21"
    },
    {
        value: 22,
        label: "22"
    },
    {
        value: 23,
        label: "23"
    },
    {
        value: 24,
        label: "24"
    },
    {
        value: 25,
        label: "25"
    },
    {
        value: 26,
        label: "26"
    },
    {
        value: 27,
        label: "27"
    },
    {
        value: 28,
        label: "28"
    },
    {
        value: 29,
        label: "29"
    },
    {
        value: 30,
        label: "30"
    },
    {
        value: 31,
        label: "31"
    },
    {
        value: 32,
        label: "32"
    },
    {
        value: 33,
        label: "33"
    },
    {
        value: 34,
        label: "34"
    },
    {
        value: 35,
        label: "35"
    },
    {
        value: 36,
        label: "36"
    },
    {
        value: 37,
        label: "37"
    },
    {
        value: 38,
        label: "38"
    },
    {
        value: 39,
        label: "39"
    },
    {
        value: 40,
        label: "40"
    },
    {
        value: 41,
        label: "41"
    },
    {
        value: 42,
        label: "42"
    },
    {
        value: 43,
        label: "43"
    },
    {
        value: 44,
        label: "44"
    },
    {
        value: 45,
        label: "45"
    },
    {
        value: 46,
        label: "46"
    },
    {
        value: 47,
        label: "47"
    },
    {
        value: 48,
        label: "48"
    },
    {
        value: 49,
        label: "49"
    },
    {
        value: 50,
        label: "50"
    },
    {
        value: 51,
        label: "51"
    },
    {
        value: 52,
        label: "52"
    },
    {
        value: 53,
        label: "53"
    },
    {
        value: 54,
        label: "54"
    },
    {
        value: 55,
        label: "55"
    },
    {
        value: 56,
        label: "56"
    },
    {
        value: 57,
        label: "57"
    },
    {
        value: 58,
        label: "58"
    },
    {
        value: 59,
        label: "59"
    }
    ];

    const hourOption = [{
        value: 0,
        label: "0"
    },
    {
        value: 1,
        label: "1"
    },
    {
        value: 2,
        label: "2"
    },
    {
        value: 3,
        label: "3"
    },
    {
        value: 4,
        label: "4"
    },
    {
        value: 5,
        label: "5"
    },
    {
        value: 6,
        label: "6"
    },
    {
        value: 7,
        label: "7"
    },
    {
        value: 8,
        label: "8"
    },
    {
        value: 9,
        label: "9"
    },
    {
        value: 10,
        label: "10"
    },
    {
        value: 11,
        label: "11"
    },
    {
        value: 12,
        label: "12"
    },
    {
        value: 13,
        label: "13"
    },
    {
        value: 14,
        label: "14"
    },
    {
        value: 15,
        label: "15"
    },
    {
        value: 16,
        label: "16"
    },
    {
        value: 17,
        label: "17"
    },
    {
        value: 18,
        label: "18"
    },
    {
        value: 19,
        label: "19"
    },
    {
        value: 20,
        label: "20"
    },
    {
        value: 21,
        label: "21"
    },
    {
        value: 22,
        label: "22"
    },
    {
        value: 23,
        label: "23"
    }];

    const dayOption = [{
        value: 0,
        label: "0"
    },
    {
        value: 1,
        label: "1"
    },
    {
        value: 2,
        label: "2"
    },
    {
        value: 3,
        label: "3"
    },
    {
        value: 4,
        label: "4"
    },
    {
        value: 5,
        label: "5"
    },
    {
        value: 6,
        label: "6"
    },
    {
        value: 7,
        label: "7"
    },
    {
        value: 8,
        label: "8"
    },
    {
        value: 9,
        label: "9"
    },
    {
        value: 10,
        label: "10"
    },
    {
        value: 11,
        label: "11"
    },
    {
        value: 12,
        label: "12"
    },
    {
        value: 13,
        label: "13"
    },
    {
        value: 14,
        label: "14"
    },
    {
        value: 15,
        label: "15"
    },
    {
        value: 16,
        label: "16"
    },
    {
        value: 17,
        label: "17"
    },
    {
        value: 18,
        label: "18"
    },
    {
        value: 19,
        label: "19"
    },
    {
        value: 20,
        label: "20"
    },
    {
        value: 21,
        label: "21"
    },
    {
        value: 22,
        label: "22"
    },
    {
        value: 23,
        label: "23"
    },
    {
        value: 24,
        label: "24"
    },
    {
        value: 25,
        label: "25"
    },
    {
        value: 26,
        label: "26"
    },
    {
        value: 27,
        label: "27"
    },
    {
        value: 28,
        label: "28"
    },
    {
        value: 29,
        label: "29"
    },
    {
        value: 30,
        label: "30"
    },
    {
        value: 31,
        label: "31"
    }]

    const monthOption = [{
        value: 0,
        label: " "
      },{
        value: 1,
        label: "Jan"
      },
      {
        value: 2,
        label: "Feb"
      },
      {
        value: 3,
        label: "Mar"
      },
      {
        value: 4,
        label: "Apr"
      },
      {
        value: 5,
        label: "May"
      },
      {
        value: 6,
        label: "Jun"
      },
      {
        value: 7,
        label: "Jul"
      },
      {
        value: 8,
        label: "Aug"
      },
      {
        value: 9,
        label: "Sep"
      },
      {
        value: 10,
        label: "Oct"
      },
      {
        value: 11,
        label: "Nov"
      },
      {
        value: 12,
        label: "Dec"
      }]

      const weeklyOption = [{
        value: 0,
        label: "Sunday"
      },
      {
        value: 1,
        label: "Monday"
      },
      {
        value: 2,
        label: "Tuesday"
      },
      {
        value: 3,
        label: "Wednesday"
      },
      {
        value: 4,
        label: "Thursday"
      },
      {
        value: 5,
        label: "Friday"
      },
      {
        value: 6,
        label: "Saturday"
      }]

    const selectOptions = [{
        value: "NORMAL",
        label: "Normal"
    }, {
        value: "SEQUENTIAL",
        label: "Sequential"
    }
    ]
    const dispatch = useDispatch();


    const handleOk = () => {
        dispatch(setIsModalOpen(false));
    };

    const handleCancel = () => {
        dispatch(setIsModalOpen(false));
    };

    const newJob = (value) => {
        value.selectedConfiguredDataSourceId = selectedConfiguredDataSourceId;
        createNewJob(value).then((response)=>{
            if(response.status === 200 && response.data === true){
                notification.success({
                    description : "Job Created Sucessfully",
                    message : "Job Created",
                    duration : 1,
                    style: { width: '250px' }
                })
            }
        })
    }

    const changeExecutionFormatLabel = (value) => {
        if (executionFormatLabel === "Un-Planned") {
            setExecutionFormatLabel("Planned")
        } else {
            setExecutionFormatLabel("Un-Planned")

        }
    }

    return <div className="new-job-modal">
        <Modal title="Create New Job" open={isModalOpen} footer={<></>} onCancel={handleCancel}>
            <Form name="form" layout="vertical" onFinish={newJob}>
                <Form.Item label="Name" rules={[{ required: true, message: 'Please Enter Job Name' }]} name="jobName" >
                    <Input type="text" placeholder="Job Name" />
                </Form.Item>
                <Form.Item label="Execution Type" name="executionType" initialValue={"NORMAL"}>
                    <Select defaultValue={[{ value: "NORMAL", label: "Normal" }]} style={{ width: '100%' }} options={selectOptions} />
                </Form.Item>
                <Form.Item label="Execution Format" name="executionFormat">
                    <Switch style={{backgroundColor:'black'}} onChange={changeExecutionFormatLabel} /> <span style={{marginLeft:'10px'}}>{executionFormatLabel}</span>
                </Form.Item>
                {
                    executionFormatLabel === "Planned" ?
                        <div>
                            <Row gutter={4}>
                                <Col span={4}>
                                    <Form.Item label="Minute" name="minute">
                                        <Select options={minuteOption} />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Hour" name="hour">
                                        <Select options={hourOption} />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Day" name="day">
                                        <Select options={dayOption} />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="Month" name="month">
                                        <Select options={monthOption} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Weekly at 12:AM" name="weekly">
                                        <Select maxTagCount="responsive" mode="multiple" options={weeklyOption} />
                                    </Form.Item>
                                </Col>
                            </Row>

                        </div>

                        : <div style={{ display: 'none', height: '0px', width: '0px' }}></div>
                }

                <Form.Item>
                    <button type="primary">
                        Submit
                    </button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}