import { UserOutlined } from "@ant-design/icons";
import './user-setting.css';
export default function UserSetting(params = {params}){
    return <div className="user-main">
        <h2 className='user-headline'><UserOutlined /> User Settings</h2>
        <div className='user-type-segment'>

        </div>
    </div>
}