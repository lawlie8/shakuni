import { UserOutlined } from "@ant-design/icons";
import './user-setting.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "./user-setting-service";
import { setStoreSelectedUserSetting } from "./UserSettingSlice";
export default function UserSetting(params = {params}){

    const allUserInfo = useSelector(state=>state.userSetting.userSettingInfo);
    const dispatch = useDispatch();
    useEffect(()=>{
        getAllUsers().then((response)=>{
            dispatch(setStoreSelectedUserSetting(response.data))
        })
    },[])

    return <div className="user-main">
        <h2 className='user-headline'><UserOutlined /> User Settings</h2>
        <div className='user-type-segment'>
            {
                allUserInfo?.map((item,index)=>(
                    <div key={item.id} className="user-individual">

                    </div>
                ))
            }
        </div>
    </div>
}