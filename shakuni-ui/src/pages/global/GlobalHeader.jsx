import { LogoutOutlined, NotificationFilled, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Dropdown, notification, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate } from "react-router-dom";
import { logout } from "./globalService";
import { setStoreSelectedDataSourceType, setStoreSelectedAddEditDataSourceType } from "../internal/config/data-sources/DataSourceSlice";
import { setStoreJobUpdateObj } from "../internal/jobs/JobSlice";
import { WS_BASE_URL, WS_CUSTOM_NOTIFICATION, WS_GLOBAL_NOTIFICATION, WS_JOB_UPDATE } from "../../util/Constants";
import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
export default function GlobalHeader() {

    const headerList = [{ name: 'Dashboard', url: "/dashboard" }, { name: 'Jobs', url: "/jobs" }, { name: 'Config', url: "/config" }, { name: 'Management', url: "/management" }];
    const email = useSelector((state) => state.loginStore.userName);
    const emailFromLocalStorage = localStorage.getItem("userName");
    const jobObjList = useSelector((state) => state.jobStore.jobUpdateObj);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let client = new Client();

    function notify(receivedObject,logout){
        if (receivedObject.type === "WARNING") {
            notification.warning({
                message: receivedObject.title,
                description: receivedObject.message,
                style: { width: '250px' }
            })
            if (receivedObject.title === 'Session Expired' && logout) {
                navigate("/")
            }
        } else if (receivedObject.type === "SUCCESS") {
            notification.success({
                message: receivedObject.title,
                duration: 3,
                description: receivedObject.message,
                style: { width: '250px' }
            })
        } else if (receivedObject.type === "ERROR") {
            notification.error({
                message: receivedObject.title,
                description: receivedObject.message,
                style: { width: '250px' }
            })
        } 
    }

    function updateJob(receivedObject){
        dispatch(setStoreJobUpdateObj(receivedObject))
    }

    useEffect(() => {
        try {

            client.configure({
                brokerURL: WS_BASE_URL,
                onConnect: () => {
                    client && client.subscribe(WS_GLOBAL_NOTIFICATION, (message) => {
                        notify(JSON.parse(message.body),false);
                    });

                    client && client.subscribe(`${WS_CUSTOM_NOTIFICATION}/${fetchEmail()}`, (message) => {
                        notify(JSON.parse(message.body),true);
                    });

                    client && client.subscribe(`${WS_JOB_UPDATE}`, (message) => {
                        updateJob(JSON.parse(message.body));
                    });
                },
            });

            client.activate();
            return () => {
                client && client.deactivate();
            };
        } catch (e) {
            console.log(e)
        }

    }, [fetchEmail()]);

    const onClick = ({ key }) => {
        if (key === '3') {
            //logout for key 3
            logout().then((response) => {
                if (response.status === 200) {
                    notification.success({
                        message: "Success",
                        duration: 1,
                        description: 'Logged Out',
                        style: { width: '200px' }
                    })
                    navigate("/");
                    dispatch(setStoreSelectedDataSourceType(0))
                    dispatch(setStoreSelectedAddEditDataSourceType(0));

                }
            }).catch(() => {
                notification.error({
                    message: "Couldn't Log Out",
                    duration: 1,
                })
            });
        } else if (key === '2') {
            navigate("/profile");
        }
    };

    const items = [
        {
            key: '1',
            label: fetchEmail(),
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: 'Profile',
            icon: <UserOutlined />
        },

        {
            key: '3',
            label: 'Log Out',
            danger: true,
            icon: <LogoutOutlined />,
        },
    ];




    //Fetch Email for Display in Avatar
    function fetchEmail() {

        if (email !== undefined && email !== '') {
            return email;
        }
        else if (emailFromLocalStorage !== undefined) {
            return emailFromLocalStorage;
        } else {
            return "User";
        }

    }

    function fetchUserAvatarImage() {
    }

    function navbarClick(item) {
        navigate(item.url)
    }


    function userAvatarClick() {
    }

    function logoClick() {
        navigate("/about")
    }



    return (
        <div className="global-header" style={{ display: useLocation().pathname === "/" ? 'none' : 'block' }}>

            <ul className="header-list">
                <li className="header-list-item-logo">
                    <div className="header-logo" onClick={() => logoClick()} />
                </li>
                <li className="header-list-item">
                    <ul className="header-list">
                        {
                            headerList.map((item) => (
                                <li style={{ paddingRight: '5px', paddingLeft: '5px' }} className="header-list-item" onClick={() => navbarClick(item)}>
                                    <h3>{item.name}</h3>
                                </li>
                            ))
                        }
                    </ul>
                </li>
                <Row className="header-user-logo" justify={'space-between'}>
                    <Col span={12}>
                        <div className="global-notification">
                            <NotificationFilled style={{ fontSize: '25px' }} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <Dropdown menu={{ items, onClick }} >
                            <Avatar className="header-user-logo-avatar" src={{ fetchUserAvatarImage }} size={35} style={{ backgroundColor: 'purple' }} onClick={userAvatarClick()}>{fetchEmail()?.toUpperCase()[0]}</Avatar>
                        </Dropdown>
                    </Col>
                </Row>
            </ul>

        </div>
    );

}

