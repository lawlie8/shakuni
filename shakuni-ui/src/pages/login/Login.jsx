import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import './login.css';

const AuthenticateUser = {

}


export function Login(){
    return <div className="login-main">
        <div className='login-container'>
            <div className='login-container-header'>
                <h2>Shakuni</h2>
            </div>
            <div className='login-container-form'>
            <Form name="normal-login"  initialValues={{ remember: true }} onFinish={AuthenticateUser}>
                    <Form.Item style={{ paddingTop: "10px",fontSize:'15px' }} name="username" rules={[{ required: true, message: 'Email Required!' }]} >
                    <UserOutlined className="site-form-item-icon" /><input placeholder='Email' className='login-user-input' />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Password Required!' }]}>
                    <LockOutlined className="site-form-item-icon" /> <input className='login-user-input' placeholder='Password' type="password" />
                    </Form.Item>
                    <Form.Item name="remember_me">
                    <Checkbox className='login-form-check-box'>Remember Me</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <button type="primary" htmlType="submit" className="login-form-button" >Log in</button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
}