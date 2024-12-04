import { LogoutOutlined, ProfileOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, message, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "./globalService";
import { setStoreSelectedDataSourceType,setStoreSelectedAddEditDataSourceType } from "../internal/config/data-sources/DataSourceSlice";

export default function GlobalHeader() {

    const headerList = [{name:'Dashboard',url:"/dashboard"},{name:'Jobs',url:"/jobs"}, {name:'Config',url:"/config"}, {name:'Management',url:"/management"}];
    const email = useSelector((state) => state.loginStore.userName);
    const emailFromLocalStorage = localStorage.getItem("userName");
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onClick = ({ key }) => {
        if (key === '3') {
            //logout for key 3
            logout().then((response) => {
                if (response.status === 200) {
                    notification.success({
                        message: "Success",
                        duration: 1,
                        description:'Logged Out',
                        style:{width:'200px'}
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
    
    if (email !== undefined && email !=='') {
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

function logoClick(){
    navigate("/about")
}



return (
    <div className="global-header" style={{ display: useLocation().pathname === "/" ? 'none' : 'block' }}>

        <ul className="header-list">
            <li className="header-list-item-logo">
                <div className="header-logo" onClick={()=>logoClick()} />
            </li>
            <li className="header-list-item">
                <ul className="header-list">
                    {
                        headerList.map((item) => (
                            <li style={{ paddingRight: '5px', paddingLeft: '5px' }} className="header-list-item" onClick={()=>navbarClick(item)}>
                                <h3>{item.name}</h3>
                            </li>
                        ))
                    }
                </ul>
            </li>
            <li className="header-user-logo">
                <Dropdown menu={{ items, onClick }} >
                    <Avatar className="header-user-logo-avatar" src={{ fetchUserAvatarImage }} size={35} style={{ backgroundColor: 'purple' }} onClick={userAvatarClick()}>{fetchEmail()?.toUpperCase()[0]}</Avatar>
                </Dropdown>
            </li>
        </ul>

    </div>
);

}

