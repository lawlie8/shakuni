import { Col, Menu, Row } from "antd";
import { DatabaseOutlined,UserOutlined} from '@ant-design/icons';
import './config.css';
import { useState } from "react";
import DataSources from "./data-sources/DataSources";
import UserSetting from "./user-settings/UserSetting";
export default function Config(params = {params}){
    
    const [current, setCurrent] = useState('1');
    const [innerContent,setInnerContent] = useState(<DataSources />);

    const items = [{
        key:"1",
        icon:<DatabaseOutlined />,
        label:"Data Sources",
    },
    {
        key:"2",
        icon:<UserOutlined />,
        label:"User Settings",
    },]

    //Function after Selecting menu Item
    const menuClickFunction = (e) => {
        setCurrent(e.key);
        //If Key is 1 fetch Data Sources Menu
        if(e.key === "1"){
            setInnerContent(<DataSources />)
        }
        //if Key is 2 fetch User Settings Menu
        else if(e.key === "2"){
            setInnerContent(<UserSetting />)
        }
      };
    
    return <div className="config-page">
    <Row className="config-page-main">
            <Col span={4} className="config-page-selection">
                <Menu
                className="config-page-selection-menu"
                mode="inline"
                items={items}
                onClick={menuClickFunction}
                defaultSelectedKeys={['1']}
                selectedKeys={[current]}
                />
            </Col>
            <Col span={20} className="config-page-content">
                {innerContent}
            </Col>
        </Row>

    </div>
    
}