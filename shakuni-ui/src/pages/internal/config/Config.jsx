import { Col, Row } from "antd";

export default function Config(params = {params}){

    
    return <Row className="config-page-content">
            <Col span={6} className="config-page-selection">
                <h3>selection</h3>
            </Col>
            <Col span={18} className="config-page-content">
                <h3>content</h3>
            </Col>
        </Row>
}