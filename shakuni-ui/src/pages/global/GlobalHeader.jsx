import { Avatar } from "antd";
import { useLocation } from "react-router-dom";

export default function GlobalHeader(){

    function fetchUserAvatarImage(){
        
    }


    return (
     <div className="global-header" style={{display: useLocation().pathname === "/" ? 'none' : 'block' }}>
        <ul className="header-list">
            <li className="header-list-item-logo">
                <div className="header-logo" />
            </li>
            <li className="header-list-item">
                <ul className="header-list">
                    <li className="header-list-item">
                        <h3>Jobs</h3>
                    </li>
                    <li className="header-list-item">
                        <h3>Config</h3>
                    </li>
                </ul>
            </li>
            <li className="header-user-logo">
                <Avatar src={{fetchUserAvatarImage}} size={40} style={{backgroundColor:'#dfdfdf'}}></Avatar>
            </li>
        </ul>

    </div>
     );

}