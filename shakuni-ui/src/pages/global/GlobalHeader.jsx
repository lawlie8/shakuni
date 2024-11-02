import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, message, notification } from "antd";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "./globalService";

export default function GlobalHeader(){

    const headerList = ['Jobs','Config',"Mangement"];
    const email = useSelector((state)=>state.login.userName);
    const navigate = useNavigate();
    const onClick = ({ key }) => {
       if(key === '3'){
        //logout for key 3
            logout().then((response)=>{
                if(response.status === 200){
                    notification.success({
                        message:"Logged Out",
                        duration:1,
                    })
                    navigate("/");
                }
            }).catch(()=>{
                notification.error({
                    message:"Couldn't Log Out",
                    duration:1,
                })
            });
       }
    };
      
    const items = [
        {
          key: '1',
          label: email,
          disabled: true,
        },
        {
          type: 'divider',
        },
        {
          key: '2',
          label: 'Profile',
        },
        
        {
          key: '3',
          label: 'Log Out',
          danger:true,
          icon: <LogoutOutlined />,
        },
      ];    
      function fetchUserAvatarImage(){
        
        }

    function navbarClick(item){
        
    }

    
    function userAvatarClick(){

    }



    return (
     <div className="global-header" style={{display: useLocation().pathname === "/" ? 'none' : 'block' }}>
        
        <ul className="header-list">
            <li className="header-list-item-logo">
                <div className="header-logo" />
            </li>
            <li className="header-list-item">
                <ul className="header-list">
                    {
                        headerList.map((item)=>(
                            <li style={{paddingRight:'5px',paddingLeft:'5px'}} className="header-list-item" onClick={navbarClick(item)}>
                                <h3>{item}</h3>
                            </li>
                        ))
                    }
                </ul>
            </li>
            <li className="header-user-logo">
            <Dropdown menu={{items,onClick}} >
                <Avatar className="header-user-logo-avatar" src={{fetchUserAvatarImage}} size={35} style={{backgroundColor:'purple'}} onClick={userAvatarClick()}>{email.toUpperCase()[0]}</Avatar>
            </Dropdown>
            </li>
        </ul>

    </div>
     );

}