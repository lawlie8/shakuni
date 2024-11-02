import { Button, Checkbox, Col, Form, Input, notification, Row } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './login-service';
import store from '../../util/store';
import { useDispatch, useSelector } from 'react-redux';
import { setUserCurrentUser } from './LoginSlice';

export function Login() {
        const navigate = useNavigate();
        const dispatch = useDispatch();
    function AuthenticateUser(values) {

        dispatch(setUserCurrentUser(values.email));
        
        login(values).then((response) => {
            if (response.status === 200) {
                navigate("/dashboard");
                //Notify User of Login Sucess
                notification.success({
                    message: "Sucess",
                    duration: 1,
                    description: "Logged In",
                    style: { width: '250px' }
                })
            }
        



        }).catch(() => {
            //Notify User of Login Failure
            notification.error({
                message: "Error",
                duration: 1,
                description: "Login Failed",
                style: { width: '250px' }
            })
        })
    }


    return <div className="login-main">
        <div className='login-container'>
            <div className='logo'>

            </div>
            <div className='login-container-header'>
                <h2>Shakuni</h2>
            </div>
            <div className='login-container-form'>
                <Form name="normal-login" initialValues={{ remember: true }} onFinish={AuthenticateUser}>
                    <Form.Item style={{ paddingTop: "10px", fontSize: '15px' }} name="email" rules={[{ required: true, message: 'Email Required!' }]} >
                        <div>
                            <UserOutlined className="site-form-item-icon" />
                            <input placeholder='Email' className='login-user-input' />
                        </div>
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Password Required!' }]}>
                        <div>
                            <LockOutlined className="site-form-item-icon" />
                            <input className='login-user-input' placeholder='Password' type="password" />
                        </div>
                    </Form.Item>

                    <Form.Item name="remember_me" valuePropName="checked">
                        <Checkbox className='login-form-check-box' defaultChecked={false}>Remember Me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <button type="primary" className="login-form-button" >Log in</button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
}