import { Col, Input, Row } from 'antd';
import './login.css';


export function Login(){
    return <div className="login-main">
        <div className='login-container'>
            <h2>Login</h2>
            <Row style={{left:'50%',position:'absolute',transform:'translate(-50%)'}}>
                <Col span={24}>
                    <Input type='email' />
                </Col>
                <Col span={24}>
                    <Input type='password' />
                </Col>

            </Row>
        </div>
    </div>
}